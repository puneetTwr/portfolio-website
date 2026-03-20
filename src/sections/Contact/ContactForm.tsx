import { useState, useCallback } from 'react'
import { CONTACT_CONFIG } from '../../data/portfolio'
import { useFormSubmit } from '../../hooks'

interface Fields {
  name: string
  email: string
  message: string
}

const PINK = 'var(--color-neon-pink)'
const CYAN = 'var(--color-neon-cyan)'

function validate(field: string, value: string): string {
  switch (field) {
    case 'name':
      return value.trim().length < 2 ? 'Name must be at least 2 characters' : ''
    case 'email':
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? 'Please enter a valid email address'
        : ''
    case 'message':
      return value.trim().length < 10 ? 'Message must be at least 10 characters' : ''
    default:
      return ''
  }
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%',
    background: 'rgba(0, 255, 255, 0.03)',
    border: `0.5px solid ${hasError ? PINK : 'rgba(0, 255, 255, 0.2)'}`,
    borderRadius: '2px',
    padding: '12px 16px',
    fontFamily: 'var(--font-mono)',
    fontSize: '16px',
    color: 'var(--color-text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s ease, background 0.2s ease',
    boxSizing: 'border-box',
  }
}

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  marginBottom: '8px',
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  color: 'var(--color-text-secondary)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}

const ERROR_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  color: PINK,
  marginTop: '4px',
  display: 'block',
}

export function ContactForm() {
  const [values, setValues] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Fields>({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })

  const { isLoading, isSuccess, isError, errorMessage, handleSubmit, reset } =
    useFormSubmit(CONTACT_CONFIG.formEndpoint)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setValues((prev) => ({ ...prev, [name]: value }))
      if (touched[name as keyof typeof touched]) {
        setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
      }
    },
    [touched]
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setTouched((prev) => ({ ...prev, [name]: true }))
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
    },
    []
  )

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setTouched({ name: true, email: true, message: true })
      const newErrors = {
        name: validate('name', values.name),
        email: validate('email', values.email),
        message: validate('message', values.message),
      }
      setErrors(newErrors)
      if (Object.values(newErrors).some((err) => err !== '')) return
      await handleSubmit(values)
    },
    [values, handleSubmit]
  )

  // ── Success state ───────────────────────────────────────
  if (isSuccess) {
    return (
      <div
        style={{
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: `1.5px solid ${CYAN}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '24px', color: CYAN }}>✓</span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '18px',
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          Message sent.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Thanks for reaching out.
          <br />
          I&apos;ll get back to you soon.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: '8px',
            padding: '10px 20px',
            background: 'transparent',
            border: `0.5px solid ${CYAN}`,
            borderRadius: '2px',
            color: CYAN,
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          Send another →
        </button>
      </div>
    )
  }

  // ── Form state ──────────────────────────────────────────
  return (
    <form onSubmit={handleFormSubmit} noValidate>
      {/* Name */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="name" style={LABEL_STYLE}>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your name"
          className="contact-input"
          style={inputStyle(!!errors.name)}
          disabled={isLoading}
          autoComplete="name"
        />
        {errors.name && <span style={ERROR_TEXT_STYLE}>{errors.name}</span>}
      </div>

      {/* Email */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={LABEL_STYLE}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="your@email.com"
          className="contact-input"
          style={inputStyle(!!errors.email)}
          disabled={isLoading}
          autoComplete="email"
        />
        {errors.email && <span style={ERROR_TEXT_STYLE}>{errors.email}</span>}
      </div>

      {/* Message */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="message" style={LABEL_STYLE}>Message</label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="What would you like to discuss?"
          className="contact-input"
          style={{ ...inputStyle(!!errors.message), minHeight: '140px', resize: 'vertical', lineHeight: '1.6' }}
          disabled={isLoading}
        />
        {errors.message && <span style={ERROR_TEXT_STYLE}>{errors.message}</span>}
      </div>

      {/* Error banner */}
      {isError && (
        <div
          style={{
            background: 'rgba(255, 0, 127, 0.08)',
            border: `0.5px solid ${PINK}`,
            borderRadius: '2px',
            padding: '12px 16px',
            marginBottom: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: PINK,
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '14px 24px',
          background: isLoading ? 'rgba(0, 255, 255, 0.05)' : 'transparent',
          border: `0.5px solid ${CYAN}`,
          borderRadius: '2px',
          color: CYAN,
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        {isLoading ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  )
}
