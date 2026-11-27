import { useRef, useState } from 'react'
import { ApiError } from '../../api/apiClient.js'
import { errorMessage } from './format.js'

const hasEntries = (value) => Object.keys(value).length > 0

/**
 * Form state shared by the Admin and Staff forms: validates before sending,
 * keeps typed values after an error, maps API field messages onto fields and
 * ignores a second submit while a request is out.
 */
export default function useSubmitForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [attempted, setAttempted] = useState(false)
  const [serverErrors, setServerErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [notice, setNotice] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const busy = useRef(false)

  const clientErrors = attempted && validate ? validate(values) : {}
  const errors = { ...serverErrors, ...clientErrors }

  function setValue(name, value) {
    setValues((current) => ({ ...current, [name]: value }))
    setServerErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
    setFormError('')
    setNotice('')
  }

  function focusField(form, found) {
    const name = Object.keys(found).find((key) => form.elements.namedItem(key))
    if (name) form.elements.namedItem(name).focus()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (busy.current) return
    const form = event.currentTarget
    setAttempted(true)
    setServerErrors({})
    setFormError('')
    setNotice('')

    const found = validate ? validate(values) : {}
    if (hasEntries(found)) {
      focusField(form, found)
      return
    }

    busy.current = true
    setSubmitting(true)
    try {
      const result = await onSubmit(values)
      if (result?.reset) {
        setValues(result.reset)
        setAttempted(false)
      }
      if (result?.errors) setServerErrors(result.errors)
      if (result?.formError) setFormError(result.formError)
      if (result?.notice) setNotice(result.notice)
    } catch (error) {
      if (error instanceof ApiError && hasEntries(error.fields)) setServerErrors(error.fields)
      setFormError(errorMessage(error))
    } finally {
      busy.current = false
      setSubmitting(false)
    }
  }

  return { values, setValue, errors, formError, notice, submitting, handleSubmit }
}
