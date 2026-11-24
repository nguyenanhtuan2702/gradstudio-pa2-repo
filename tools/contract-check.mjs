#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const option = (name, fallback) => {
  const index = args.indexOf(name)
  return index >= 0 && args[index + 1] !== undefined ? args[index + 1] : fallback
}

if (args.includes('-h') || args.includes('--help')) {
  console.log('Usage: node tools/contract-check.mjs [--base URL] [--repo PATH] [--only FILE] [--strict-values] [--json FILE]')
  process.exit(0)
}

const base = option('--base', 'http://localhost:3001').replace(/\/+$/, '')
const repo = path.resolve(option('--repo', '.'))
const docsDir = path.join(repo, 'docs', 'api')
const only = option('--only', null)
const strictValues = args.includes('--strict-values')
const jsonOutput = option('--json', null)
const timeoutMs = Number(option('--timeout', '10000'))
const ANY = Symbol('any')
const OPEN = Symbol('open')
const results = []
let failures = 0

if (!fs.existsSync(docsDir)) {
  console.error('FAIL no docs/api directory')
  process.exit(2)
}

const fail = (where, message) => {
  failures++
  results.push({ status: 'FAIL', where, message })
  console.log(`FAIL ${where} ${message}`)
}

const pass = (where, message, notes = []) => {
  results.push({ status: 'PASS', where, message, notes })
  console.log(`PASS ${where} ${message}`)
  for (const note of notes) console.log(`  note ${note}`)
}

function fencedBlocks(text) {
  const lines = text.split(/\r?\n/)
  const blocks = []
  for (let i = 0; i < lines.length; i++) {
    const opening = lines[i].match(/^(\s*)(`{3,}|~{3,})\s*([\w+-]*)/)
    if (!opening) continue
    const fence = opening[2]
    const body = []
    const startLine = i + 1
    for (i++; i < lines.length; i++) {
      const closing = lines[i].match(/^\s*(`{3,}|~{3,})\s*$/)
      if (closing && closing[1][0] === fence[0] && closing[1].length >= fence.length) break
      body.push(lines[i])
    }
    const nonEmpty = body.filter((line) => line.trim())
    const indent = nonEmpty.length
      ? Math.min(...nonEmpty.map((line) => line.match(/^\s*/)[0].length))
      : 0
    blocks.push({
      lang: opening[3].toLowerCase(),
      line: startLine,
      body: body.map((line) => line.slice(Math.min(indent, line.match(/^\s*/)[0].length))),
    })
  }
  return blocks
}

function parseLooseJson(source) {
  let transformed = ''
  const stack = []
  let previous = ''
  for (let i = 0; i < source.length; i++) {
    const char = source[i]
    if (char === '"') {
      let end = i + 1
      for (; end < source.length; end++) {
        if (source[end] === '\\') end++
        else if (source[end] === '"') break
      }
      transformed += source.slice(i, end + 1)
      i = end
      previous = '"'
      continue
    }

    const ellipsis = char === '…' ? 1 : source.startsWith('...', i) ? 3 : 0
    if (ellipsis) {
      const nextStack = stack[stack.length - 1]
      let next = i + ellipsis
      while (/\s/.test(source[next] || '')) next++
      const closesContainer = source[next] === '}' || source[next] === ']'
      if (nextStack === '{' && (previous === '{' || previous === ',')) {
        transformed += '"\\u0000open":true'
      } else if (nextStack === '[' && (previous === '[' || previous === ',') && closesContainer) {
        transformed += '"\\u0000open"'
      } else {
        transformed += '"\\u0000any"'
      }
      i += ellipsis - 1
      previous = 'v'
      continue
    }

    if (char === '{' || char === '[') stack.push(char)
    if (char === '}' || char === ']') stack.pop()
    if (!/\s/.test(char)) previous = char
    transformed += char
  }

  const mark = (value) => {
    if (value === '\u0000any' || value === '…' || value === '...') return ANY
    if (Array.isArray(value)) {
      const marked = value.filter((item) => item !== '\u0000open').map(mark)
      if (marked.length !== value.length) marked[OPEN] = true
      return marked
    }
    if (value && typeof value === 'object') {
      const marked = {}
      for (const [key, item] of Object.entries(value)) {
        if (key === '\u0000open') marked[OPEN] = true
        else marked[key] = mark(item)
      }
      return marked
    }
    return value
  }

  return mark(JSON.parse(transformed))
}

function compareShape(expected, actual, location = '$', problems = [], notes = [], namesOnly = false) {
  if (expected === ANY) return { problems, notes }
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual)) {
      problems.push(`${location}: example expects a list`)
      return { problems, notes }
    }
    if (expected.length === 0) {
      if (actual.length && !expected[OPEN]) notes.push(`${location}: example is [], answer has ${actual.length} item(s)`)
      return { problems, notes }
    }
    if (!expected[OPEN] && actual.length !== expected.length) {
      notes.push(`${location}: example has ${expected.length} item(s), answer has ${actual.length}`)
    }
    actual.forEach((item, index) => {
      const exemplar = expected[Math.min(index, expected.length - 1)]
      compareShape(exemplar, item, `${location}[${index}]`, problems, notes, namesOnly || index >= expected.length)
    })
    return { problems, notes }
  }
  if (expected && typeof expected === 'object') {
    if (!actual || typeof actual !== 'object' || Array.isArray(actual)) {
      problems.push(`${location}: example expects an object`)
      return { problems, notes }
    }
    const expectedKeys = Object.keys(expected)
    const actualKeys = Object.keys(actual)
    for (const key of expectedKeys) {
      if (!(key in actual)) problems.push(`${location}.${key}: missing from answer`)
    }
    if (!expected[OPEN]) {
      for (const key of actualKeys) {
        if (!(key in expected)) problems.push(`${location}.${key}: present in answer but absent from example`)
      }
    }
    for (const key of expectedKeys) {
      if (key in actual) compareShape(expected[key], actual[key], `${location}.${key}`, problems, notes, namesOnly)
    }
    return { problems, notes }
  }
  if (Array.isArray(actual) || (actual && typeof actual === 'object')) {
    problems.push(`${location}: example and answer have different value types`)
    return { problems, notes }
  }
  if (expected !== actual) {
    const message = `${location}: example ${JSON.stringify(expected)}, answer ${JSON.stringify(actual)}`
    if (strictValues && !namesOnly) problems.push(message)
    else notes.push(message)
  }
  return { problems, notes }
}

function parseHttpRequest(block) {
  const lines = block.body
  let index = 0
  while (index < lines.length && !lines[index].trim()) index++
  const [method, target] = (lines[index] || '').trim().split(/\s+/)
  if (!method || !target) return { error: 'request line must contain method and path' }
  const headers = {}
  for (index++; index < lines.length && lines[index].trim(); index++) {
    const header = lines[index].match(/^([\w-]+)\s*:\s*(.*)$/)
    if (header) headers[header[1]] = header[2].trim()
  }
  const body = lines.slice(index + 1).join('\n').trim() || null
  return { method: method.toUpperCase(), target, headers, body, line: block.line }
}

function shellWords(source) {
  const text = source.replace(/\\\r?\n/g, ' ').replace(/^\s*\$\s+/gm, '')
  const words = []
  let current = null
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (char === "'") {
      const end = text.indexOf("'", i + 1)
      current = (current || '') + text.slice(i + 1, end < 0 ? text.length : end)
      i = end < 0 ? text.length : end
    } else if (char === '"') {
      let value = ''
      let end = i + 1
      for (; end < text.length && text[end] !== '"'; end++) {
        if (text[end] === '\\' && end + 1 < text.length) end++
        value += text[end]
      }
      current = (current || '') + value
      i = end
    } else if (/\s/.test(char)) {
      if (current !== null) words.push(current)
      current = null
    } else {
      current = (current || '') + char
    }
  }
  if (current !== null) words.push(current)
  return words
}

function parseCurlRequest(block) {
  const words = shellWords(block.body.join('\n'))
  const curlIndex = words.indexOf('curl')
  if (curlIndex < 0) return { error: 'shell request must contain one curl command' }
  const request = { method: null, target: null, headers: {}, body: null, form: null, line: block.line }
  for (let index = curlIndex + 1; index < words.length; index++) {
    const word = words[index]
    const next = () => words[++index]
    if (word === '-X' || word === '--request') request.method = (next() || '').toUpperCase()
    else if (word === '-H' || word === '--header') {
      const header = (next() || '').match(/^([\w-]+)\s*:\s*(.*)$/)
      if (header) request.headers[header[1]] = header[2].trim()
    } else if (word === '-F' || word === '--form') {
      request.form ||= []
      const part = next() || ''
      const equals = part.indexOf('=')
      if (equals < 0) continue
      const field = part.slice(0, equals)
      const value = part.slice(equals + 1)
      if (value.startsWith('@')) {
        const [fileSpec, ...options] = value.slice(1).split(';')
        request.form.push({
          field,
          file: fileSpec,
          type: (options.find((item) => item.startsWith('type=')) || '').slice(5),
          filename: (options.find((item) => item.startsWith('filename=')) || '').slice(9),
        })
      } else {
        request.form.push({ field, value })
      }
    } else if (['-d', '--data', '--data-raw', '--data-binary', '--json'].includes(word)) {
      request.body = next()
      if (word === '--json') request.headers['Content-Type'] ||= 'application/json'
    } else if (/^https?:\/\//.test(word) || word.startsWith('/')) {
      request.target = word
    }
  }
  if (!request.target) return { error: 'no URL in curl request' }
  request.method ||= request.form || request.body ? 'POST' : 'GET'
  return request
}

function parseAnswer(block) {
  const lines = block.body
  let index = 0
  while (index < lines.length && !lines[index].trim()) index++
  const statusLine = (lines[index] || '').trim()
  const match = statusLine.match(/^HTTP\/\d(?:\.\d)?\s+(\d{3})/)
  if (!match) return { error: 'answer block must start with an HTTP status line' }
  const status = Number(match[1])
  for (index++; index < lines.length && lines[index].trim(); index++) {}
  return { status, body: lines.slice(index + 1).join('\n').trim() || null }
}

function readAccounts() {
  const file = path.join(repo, 'FRONTEND.md')
  if (!fs.existsSync(file)) return {}
  const text = fs.readFileSync(file, 'utf8')
  const section = text.match(/^#{1,6}\s*(?:\d+\.?\s*)?demo accounts.*$([\s\S]*?)(?=^#{1,6}\s|(?![\s\S]))/im)
  if (!section) return {}
  const rows = section[1].split(/\r?\n/)
    .filter((line) => line.trim().startsWith('|'))
    .map((line) => line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim().replace(/^`(.*)`$/, '$1')))
    .filter((cells) => !cells.every((cell) => /^:?-+:?$/.test(cell) || !cell))
  if (!rows.length) return {}
  const headers = rows[0].map((header) => header.toLowerCase())
  const column = (pattern) => headers.findIndex((header) => pattern.test(header))
  const nameCol = column(/name in example|example|^name$|key/)
  const loginCol = column(/e-?mail|user ?name|login/)
  const passCol = column(/pass/)
  if ([nameCol, loginCol, passCol].some((index) => index < 0)) return {}
  const accounts = {}
  for (const row of rows.slice(1)) {
    if (row[nameCol]) accounts[row[nameCol]] = { login: row[loginCol], password: row[passCol] }
  }
  return accounts
}

const accounts = readAccounts()
const tokenCache = new Map()
const requestPairs = []
const loginCandidates = []

const allFiles = fs.readdirSync(docsDir).filter((file) => file.endsWith('.md'))
const files = [
  ...(allFiles.includes('README.md') ? ['README.md'] : []),
  ...allFiles.filter((file) => file !== 'README.md').sort(),
]
const selectedFiles = only ? files.filter((file) => file === only || path.basename(file) === only) : files
if (only && !selectedFiles.length) {
  console.error(`FAIL docs/api/${only} does not exist`)
  process.exit(2)
}

for (const filename of selectedFiles) {
  const blocks = fencedBlocks(fs.readFileSync(path.join(docsDir, filename), 'utf8'))
  const meaningful = blocks.filter((block) => {
    const first = block.body.find((line) => line.trim())?.trim() || ''
    return (block.lang === 'http' && (/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+\S+/.test(first) || /^HTTP\/\d/.test(first)))
      || (['sh', 'bash', 'shell', 'console'].includes(block.lang) && /(^|\s)curl\s/.test(block.body.join(' ')))
  })

  for (let index = 0; index < meaningful.length; index++) {
    const block = meaningful[index]
    const first = block.body.find((line) => line.trim())?.trim() || ''
    const isAnswer = block.lang === 'http' && /^HTTP\/\d/.test(first)
    if (isAnswer) {
      if (!requestPairs.length || requestPairs[requestPairs.length - 1].answer) {
        fail(`${filename}:${block.line}`, 'answer block has no preceding request')
      } else {
        requestPairs[requestPairs.length - 1].answer = parseAnswer(block)
      }
      continue
    }

    const request = block.lang === 'http' ? parseHttpRequest(block) : parseCurlRequest(block)
    if (request.error) {
      fail(`${filename}:${block.line}`, request.error)
      continue
    }
    const pair = { filename, line: block.line, request, answer: null }
    requestPairs.push(pair)
    if (request.method === 'POST' && /\/(login|signin|sessions|tokens)$/.test(new URL(request.target, 'http://local').pathname)) {
      loginCandidates.push(pair)
    }
  }
}

for (const pair of requestPairs) {
  if (!pair.answer) fail(`${pair.filename}:${pair.line}`, 'request has no following HTTP answer block')
  else if (pair.answer.error) fail(`${pair.filename}:${pair.line}`, pair.answer.error)
}

const loginExample = loginCandidates[0]?.request
if (requestPairs.some((pair) => /{{token:[^}]+}}/.test(JSON.stringify(pair.request))) && !loginExample) {
  fail('docs/api', 'token placeholders require a POST sign-in example')
}

function standInFile(name, bytes) {
  const header = /\.pdf$/i.test(name)
    ? Buffer.from('%PDF-1.4\n%contract-check stand-in\n')
    : /\.png$/i.test(name)
      ? Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
      : Buffer.alloc(0)
  const buffer = Buffer.alloc(Math.max(bytes, header.length), 0x20)
  header.copy(buffer)
  return buffer
}

function resolveFile(spec) {
  const generated = spec.match(/^\{\{file:([^:}]+)(?::(\d+(?:\.\d+)?)\s*(B|KB|MB))?\}\}$/i)
  if (generated) {
    const multiplier = { B: 1, KB: 1024, MB: 1024 * 1024 }[(generated[3] || 'KB').toUpperCase()]
    return { name: generated[1], data: standInFile(generated[1], Math.round(Number(generated[2] || 1) * multiplier)) }
  }
  const candidate = path.resolve(repo, spec)
  if (candidate.startsWith(repo + path.sep) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    return { name: path.basename(candidate), data: fs.readFileSync(candidate) }
  }
  return { name: path.basename(spec), data: standInFile(spec, 1024) }
}

function fillTokenMarkers(text, tokenMap) {
  return text.replace(/\{\{token:([^}]+)\}\}/g, (whole, name) => tokenMap.get(name) || whole)
}

function findToken(value) {
  if (!value || typeof value !== 'object') return null
  for (const [key, item] of Object.entries(value)) {
    if (/token/i.test(key) && typeof item === 'string') return item
  }
  for (const item of Object.values(value)) {
    const token = findToken(item)
    if (token) return token
  }
  return null
}

async function requestToken(name, tokenMap) {
  if (tokenCache.has(name)) return tokenCache.get(name)
  const account = accounts[name]
  if (!account) throw new Error(`{{token:${name}}}: account is missing from FRONTEND.md`)
  if (!loginExample) throw new Error('no sign-in request example')
  let body
  try { body = JSON.parse(loginExample.body || '{}') } catch { throw new Error('sign-in request body is not JSON') }
  for (const key of Object.keys(body)) {
    if (/pass/i.test(key)) body[key] = account.password
    else if (/mail|user|login|account|name/i.test(key)) body[key] = account.login
  }
  const response = await performRequest({
    method: 'POST',
    target: loginExample.target,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }, tokenMap, false)
  let responseBody
  try { responseBody = JSON.parse(response.text) } catch { responseBody = null }
  const token = findToken(responseBody)
  if (response.status >= 300 || !token) {
    throw new Error(`signing in as ${name} returned ${response.status}: ${response.text.slice(0, 160)}`)
  }
  tokenCache.set(name, token)
  return token
}

async function resolveTokens(text) {
  const tokens = new Map()
  const names = [...new Set([...text.matchAll(/\{\{token:([^}]+)\}\}/g)].map((match) => match[1].trim()))]
  for (const name of names) tokens.set(name, await requestToken(name, tokens))
  return tokens
}

async function performRequest(request, tokenMap, allowTokenLogin = true) {
  let target = request.target
  let headers = { ...request.headers }
  let body = request.body
  let form = request.form
  const allText = [target, JSON.stringify(headers), body || '', JSON.stringify(form || [])].join('\n')
  const resolvedTokens = allowTokenLogin ? await resolveTokens(allText) : tokenMap
  target = fillTokenMarkers(target, resolvedTokens)
  headers = Object.fromEntries(Object.entries(headers).map(([key, value]) => [key, fillTokenMarkers(value, resolvedTokens)]))
  if (body) body = fillTokenMarkers(body, resolvedTokens)
  if (form) form = form.map((item) => ({ ...item, value: item.value ? fillTokenMarkers(item.value, resolvedTokens) : item.value }))

  const url = new URL(target, 'http://localhost')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    let requestBody = body
    if (form) {
      requestBody = new FormData()
      for (const item of form) {
        if (item.file) {
          const file = resolveFile(item.file)
          requestBody.append(item.field, new Blob([file.data], { type: item.type || 'application/octet-stream' }), item.filename || file.name)
        } else requestBody.append(item.field, item.value || '')
      }
      for (const header of Object.keys(headers)) {
        if (/^content-type$/i.test(header)) delete headers[header]
      }
    }
    const started = Date.now()
    const response = await fetch(`${base}${url.pathname}${url.search}`, {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : requestBody,
      signal: controller.signal,
      redirect: 'manual',
    })
    return { status: response.status, text: await response.text(), ms: Date.now() - started }
  } finally {
    clearTimeout(timeout)
  }
}

function pathMatches(template, target) {
  const templatePath = template.split('?')[0].replace(/\/+$/, '')
  let resolvedTarget = target
  if (/^https?:\/\//i.test(target)) {
    const url = new URL(target)
    resolvedTarget = `${url.pathname}${url.search}`
  }
  const targetPath = resolvedTarget.split('?')[0].replace(/\/+$/, '')
  const parts = templatePath.split('/')
  const source = parts.map((part) => /^(:\w+|\{[^}]+\}|<[^>]+>)$/.test(part)
    ? '[^/]+'
    : part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('/')
  return new RegExp(`^${source}/?$`).test(targetPath)
}

function endpointInventory() {
  const readme = path.join(docsDir, 'README.md')
  if (!fs.existsSync(readme)) return []
  const endpoints = []
  for (const line of fs.readFileSync(readme, 'utf8').split(/\r?\n/)) {
    if (!line.trim().startsWith('|')) continue
    const cells = line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim().replace(/`/g, ''))
    let method = null
    let endpoint = null
    for (const cell of cells) {
      const combined = cell.match(/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+(\/\S*)$/i)
      if (combined) {
        method = combined[1].toUpperCase()
        endpoint = combined[2]
        break
      }
      if (/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)$/i.test(cell)) method = cell.toUpperCase()
      if (/^\/\S*$/.test(cell)) endpoint = cell
    }
    if (method && endpoint) endpoints.push({ method, path: endpoint })
  }
  return endpoints
}

for (const pair of requestPairs) {
  if (!pair.answer) continue
  const location = `${pair.filename}:${pair.line}`
  try {
    const actual = await performRequest(pair.request, new Map())
    if (actual.status !== pair.answer.status) {
      fail(location, `${pair.request.method} ${pair.request.target} → status example ${pair.answer.status}, answer ${actual.status}`)
      continue
    }
    if (pair.answer.body) {
      let expected
      let actualJson
      try {
        expected = parseLooseJson(pair.answer.body)
        actualJson = JSON.parse(actual.text)
      } catch {
        fail(location, `${pair.request.method} ${pair.request.target} → response body is not valid JSON`)
        continue
      }
      const comparison = compareShape(expected, actualJson)
      if (comparison.problems.length) {
        fail(location, `${pair.request.method} ${pair.request.target} → ${comparison.problems.join('; ')}`)
      } else {
        pass(location, `${pair.request.method} ${pair.request.target} → ${actual.status} (${actual.ms} ms)`, comparison.notes)
      }
    } else {
      pass(location, `${pair.request.method} ${pair.request.target} → ${actual.status} (${actual.ms} ms)`)
    }
  } catch (cause) {
    fail(location, `${pair.request.method} ${pair.request.target} → ${cause.name === 'AbortError' ? `no answer within ${timeoutMs / 1000}s` : cause.message}`)
  }
}

const endpoints = endpointInventory()
for (const endpoint of endpoints) {
  const hasExample = requestPairs.some((pair) => pair.request.method === endpoint.method && pathMatches(endpoint.path, pair.request.target))
  if (!hasExample) fail('docs/api/README.md', `endpoint has no example: ${endpoint.method} ${endpoint.path}`)
}
for (const pair of requestPairs) {
  const hasEndpoint = endpoints.some((endpoint) => endpoint.method === pair.request.method && pathMatches(endpoint.path, pair.request.target))
  if (!hasEndpoint) fail(`${pair.filename}:${pair.line}`, `example is missing from endpoint table: ${pair.request.method} ${pair.request.target}`)
}

const summary = failures ? `FAIL ${failures} failure(s)` : `PASS 100% - 0 FAIL (${requestPairs.length} examples, ${endpoints.length} endpoints)`
console.log(summary)
if (jsonOutput) fs.writeFileSync(path.resolve(repo, jsonOutput), JSON.stringify({ summary, failures, results }, null, 2))
process.exitCode = failures ? 1 : 0
