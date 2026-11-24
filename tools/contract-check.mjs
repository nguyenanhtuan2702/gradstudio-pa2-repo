#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const option = (name, fallback) => {
  const index = args.indexOf(name)
  return index >= 0 && args[index + 1] !== undefined ? args[index + 1] : fallback
}

const base = option('--base', 'http://localhost:3001').replace(/\/+$/, '')
const repo = path.resolve(option('--repo', '.'))
const docs = path.join(repo, 'docs', 'api')
const only = option('--only', null)
const strict = args.includes('--strict-values')

if (!fs.existsSync(docs)) {
  console.error('FAIL no docs/api directory')
  process.exit(2)
}

const demoAccounts = (() => {
  const file = path.join(repo, 'FRONTEND.md')
  if (!fs.existsSync(file)) return {}
  const text = fs.readFileSync(file, 'utf8')
  const section = text.match(/##\s*3\.\s*Demo accounts([\s\S]*?)(?=\n##\s)/i)
  if (!section) return {}
  const accounts = {}
  for (const line of section[1].split('\n')) {
    if (!line.trim().startsWith('|') || line.includes('---')) continue
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim().replace(/`/g, ''))
    if (cells.length >= 4) accounts[cells[0]] = { login: cells[2], password: cells[3] }
  }
  return accounts
})()

const fencedBlocks = (text) => {
  const lines = text.split(/\r?\n/)
  const blocks = []
  for (let i = 0; i < lines.length; i++) {
    const start = lines[i].match(/^(\s*)(`{3,}|~{3,})\s*([\w+-]*)/)
    if (!start) continue
    const fence = start[2]
    const lang = (start[3] || '').toLowerCase()
    const body = []
    i++
    while (i < lines.length) {
      const end = lines[i].match(/^(\s*)(`{3,}|~{3,})\s*$/)
      if (end && end[2][0] === fence[0] && end[2].length >= fence.length) break
      body.push(lines[i])
      i++
    }
    blocks.push({ lang, body, line: i - body.length })
  }
  return blocks
}

const looseJson = (source) => {
  if (!source) return null
  let text = source
  text = text.replace(/"…"/g, '"\\u0000any"').replace(/:\s*…/g, ': "\\u0000any"')
  text = text.replace(/:\s*\[\.\.\.\]/g, ': []').replace(/\{\s*…\s*\}/g, '{}')
  text = text.replace(/,\s*…\s*([}\]])/g, '$1')
  return JSON.parse(text)
}

const compare = (expected, actual, at = '$', failures = [], notes = []) => {
  if (expected === null || expected === '…' || expected === '\\u0000any') return
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual)) {
      failures.push(`${at}: expected a list`)
      return
    }
    expected.forEach((item, index) => {
      if (actual[index] !== undefined) compare(item, actual[index], `${at}[${index}]`, failures, notes)
    })
  } else if (typeof expected === 'object' && expected !== null) {
    if (!actual || typeof actual !== 'object' || Array.isArray(actual)) {
      failures.push(`${at}: expected an object`)
      return
    }
    for (const key of Object.keys(expected)) {
      if (!(key in actual)) failures.push(`${at}.${key}: in the example, missing from the answer`)
      else compare(expected[key], actual[key], `${at}.${key}`, failures, notes)
    }
  } else if (expected !== actual) {
    const message = `${at}: example ${JSON.stringify(expected)}, answer ${JSON.stringify(actual)}`
    notes.push(message)
  }
  return { failures, notes }
}

const parseRequest = (lines) => {
  let index = 0
  while (index < lines.length && !lines[index].trim()) index++
  const [method, target] = lines[index].trim().split(/\s+/)
  const headers = {}
  index++
  for (; index < lines.length && lines[index].trim(); index++) {
    const match = lines[index].match(/^([\w-]+)\s*:\s*(.*)$/)
    if (match) headers[match[1]] = match[2].trim()
  }
  return { method: (method || 'GET').toUpperCase(), target: target || '/', headers, body: lines.slice(index + 1).join('\n').trim() || null }
}

const parseAnswer = (lines) => {
  let index = 0
  while (index < lines.length && !lines[index].trim()) index++
  const status = Number(lines[index].trim().split(/\s+/)[1])
  index++
  for (; index < lines.length && lines[index].trim(); index++) {}
  return { status, body: lines.slice(index + 1).join('\n').trim() || null }
}

let failures = 0
const tokens = {}
let loginRequest = null
let loginAnswer = null

const signIn = async (name) => {
  if (tokens[name]) return tokens[name]
  const account = demoAccounts[name]
  if (!account) throw new Error(`{{token:${name}}}: "${name}" is not in the Demo accounts table`)
  if (!loginRequest) throw new Error('No sign-in example found')
  let body
  try { body = JSON.parse(loginRequest.body || '{}') } catch { throw new Error('Sign-in request body is not JSON') }
  for (const [key, value] of Object.entries(body)) {
    if (/pass/i.test(key)) body[key] = account.password
    else if (/mail|user|login|account|name/i.test(key)) body[key] = account.login
  }
  const response = await sendRequest({
    method: 'POST',
    target: loginRequest.target,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = response.body ? JSON.parse(response.body) : {}
  const findToken = (value) => {
    if (!value || typeof value !== 'object') return null
    for (const [key, item] of Object.entries(value)) {
      if (/token/i.test(key) && typeof item === 'string') return item
    }
    for (const item of Object.values(value)) {
      const found = findToken(item)
      if (found) return found
    }
    return null
  }
  const token = findToken(data)
  if (response.status >= 300 || !token) throw new Error(`Signing in as ${name} failed: ${response.status} ${response.body}`)
  tokens[name] = token
  return token
}

async function sendRequest(request) {
  let target = request.target
  target = target.replace(/\{\{token:([a-zA-Z0-9_-]+)\}\}/g, 'TOKEN_PLACEHOLDER')
  for (const name of [...target.matchAll(/\{\{token:([^}]+)\}\}/g)].map((match) => match[1])) {
    target = target.replace(`{{token:${name}}}`, await signIn(name))
  }
  const url = new URL(target, 'http://localhost')
  const headers = { ...request.headers }
  for (const [name, value] of Object.entries(headers)) {
    if (value.includes('{{token:')) {
      const match = value.match(/\{\{token:([^}]+)\}\}/)
      if (match) headers[name] = value.replace(match[0], await signIn(match[1]))
    }
  }
  const started = Date.now()
  try {
    const response = await fetch(`${base}${url.pathname}${url.search}`, {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    })
    const text = await response.text()
    return { status: response.status, body: text, ms: Date.now() - started }
  } catch (cause) {
    throw new Error(cause.message)
  }
}

const files = fs.readdirSync(docs).filter((file) => file !== 'README.md' && file.endsWith('.md')).sort()
const ordered = ['README.md', ...(only ? [only] : files)].filter((file, index, list) => list.indexOf(file) === index)

for (const fileName of ordered) {
  if (fileName === 'README.md') continue
  const file = path.join(docs, fileName)
  if (!fs.existsSync(file)) continue
  const blocks = fencedBlocks(fs.readFileSync(file, 'utf8'))
  for (let index = 0; index < blocks.length - 1; index += 2) {
    const requestBlock = blocks[index]
    const answerBlock = blocks[index + 1]
    if (!requestBlock || !answerBlock || requestBlock.lang !== 'http' || answerBlock.lang !== 'http') continue
    const first = requestBlock.body.find((line) => line.trim()) || ''
    if (!/^(GET|POST|PUT|PATCH|DELETE)\s/.test(first)) continue
    const request = parseRequest(requestBlock.body)
    const answer = parseAnswer(answerBlock.body)
    if (!loginRequest && request.method === 'POST' && /\/(login|signin|sessions|tokens)$/.test(request.target)) {
      loginRequest = request
    }
  }
}

for (const fileName of ordered) {
  if (fileName === 'README.md') continue
  const file = path.join(docs, fileName)
  if (!fs.existsSync(file)) continue
  const blocks = fencedBlocks(fs.readFileSync(file, 'utf8'))
  for (let index = 0; index < blocks.length - 1; index++) {
    const requestBlock = blocks[index]
    const answerBlock = blocks[index + 1]
    if (requestBlock.lang !== 'http' || answerBlock.lang !== 'http') continue
    const first = requestBlock.body.find((line) => line.trim()) || ''
    const answerFirst = answerBlock.body.find((line) => line.trim()) || ''
    if (!/^HTTP\//.test(answerFirst) || !/^(GET|POST|PUT|PATCH|DELETE)\s/.test(first)) continue
    const request = parseRequest(requestBlock.body)
    const expected = parseAnswer(answerBlock.body)
    try {
      const actual = await sendRequest(request)
      if (actual.status !== expected.status) {
        failures++
        console.log(`FAIL ${fileName}:${index + 1} ${request.method} ${request.target} → status: example ${expected.status}, answer ${actual.status}`)
        continue
      }
      if (expected.body && actual.body) {
        let expectedJson
        let actualJson
        try {
          expectedJson = looseJson(expected.body)
          actualJson = JSON.parse(actual.body)
        } catch {
          failures++
          console.log(`FAIL ${fileName}:${index + 1} ${request.method} ${request.target} → invalid JSON`)
          continue
        }
        const compared = compare(expectedJson, actualJson)
        if (compared.failures.length) {
          failures += compared.failures.length
          console.log(`FAIL ${fileName}:${index + 1} ${request.method} ${request.target} → ${compared.failures.join('; ')}`)
        } else {
          console.log(`PASS ${fileName}:${index + 1} ${request.method} ${request.target} → ${actual.status} (${actual.ms} ms)`)
          if (compared.notes.length) compared.notes.forEach((note) => console.log(` note ${note}`))
        }
      } else {
        console.log(`PASS ${fileName}:${index + 1} ${request.method} ${request.target} → ${actual.status} (${actual.ms} ms)`)
      }
    } catch (cause) {
      failures++
      console.log(`FAIL ${fileName}:${index + 1} ${request.method} ${request.target} → ${cause.message}`)
    }
  }
}

if (failures) {
  console.log(`FAIL ${failures} failure(s)`)
  process.exit(1)
}
console.log('PASS 100% - 0 FAIL')
