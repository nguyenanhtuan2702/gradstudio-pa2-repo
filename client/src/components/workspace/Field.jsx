/** A labelled input, select or textarea with its help and error messages. */
export default function Field({ id, name, label, form, help, full = false, as: Control = 'input', children, ...props }) {
  const error = form.errors[name]
  const describedBy = [help ? `${id}-help` : null, error ? `${id}-error` : null].filter(Boolean).join(' ')
  const className = Control === 'select' ? 'gs-select' : Control === 'textarea' ? 'gs-textarea' : 'gs-input'

  return (
    <div className={full ? 'field field--full' : 'field'}>
      <label className="gs-label" htmlFor={id}>{label}</label>
      <Control
        className={className}
        id={id}
        name={name}
        value={form.values[name]}
        onChange={(event) => form.setValue(name, event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined}
        {...props}
      >
        {children}
      </Control>
      {help && <p className="gs-help" id={`${id}-help`}>{help}</p>}
      {error && <p className="gs-error-text" id={`${id}-error`}>{error}</p>}
    </div>
  )
}
