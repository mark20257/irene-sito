'use client'

import { useRef, useState, type FormEvent } from 'react'
import type { Dictionary } from '@/content'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { SmartLink } from '@/components/ui/SmartLink'

type Form = Dictionary['contact']['form']
type Fields = { name: string; email: string; brand: string; budget: string; message: string; privacy: boolean }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'success' | 'fallback' | 'error'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Form essenziale: 5 campi + consenso.
 * - validazione accessibile (aria-invalid, aria-describedby, focus sul primo errore)
 * - honeypot + tempo minimo anti-bot
 * - se l'invio email non è configurato, propone WhatsApp/email con il messaggio già scritto
 */
export function ContactForm({ form, privacyHref, whatsapp, email }: { form: Form; privacyHref: string; whatsapp: string; email: string }) {
  const [values, setValues] = useState<Fields>({ name: '', email: '', brand: '', budget: '', message: '', privacy: false })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const started = useRef<number | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    if (started.current === null) started.current = Date.now()
    setValues((v) => ({ ...v, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = (v: Fields): Errors => {
    const e: Errors = {}
    if (!v.name.trim()) e.name = form.errors.required
    if (!v.email.trim()) e.email = form.errors.required
    else if (!EMAIL.test(v.email.trim())) e.email = form.errors.email
    if (!v.message.trim()) e.message = form.errors.required
    if (!v.privacy) e.privacy = form.errors.privacy
    return e
  }

  const composed = () =>
    [
      `${form.name} ${values.name}`,
      `${form.email} ${values.email}`,
      values.brand ? `${form.brand}: ${values.brand}` : null,
      values.budget ? `${form.budget}: ${values.budget}` : null,
      '',
      values.message,
    ]
      .filter((l): l is string => l !== null)
      .join('\n')

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('sending')
    const honeypot = (ev.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value ?? ''
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: honeypot, elapsed: started.current ? Date.now() - started.current : 0 }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (res.ok && data.ok) setStatus('success')
      else if (data.error === 'not_configured') setStatus('fallback')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
    requestAnimationFrame(() => resultRef.current?.focus())
  }

  if (status === 'success' || status === 'fallback') {
    const text = composed()
    return (
      <div ref={resultRef} tabIndex={-1} className="outline-none" role="status">
        <p className="t-h2 text-violet">{status === 'success' ? form.success.title : form.fallback.title}</p>
        <p className="t-lead mt-5 max-w-[36ch] text-ink-2">{status === 'success' ? form.success.body : form.fallback.body}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          {status === 'fallback' ? (
            <>
              <Button href={`${whatsapp.split('?')[0]}?text=${encodeURIComponent(text)}`} variant="primary" icon="chat">
                {form.fallback.whatsapp}
              </Button>
              <Button href={`mailto:${email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(text)}`} variant="ghost" icon="up">
                {form.fallback.email}
              </Button>
            </>
          ) : (
            <button
              type="button"
              className="link-u font-semibold text-violet"
              onClick={() => {
                setValues({ name: '', email: '', brand: '', budget: '', message: '', privacy: false })
                started.current = null
                setStatus('idle')
              }}
            >
              {form.success.again}
            </button>
          )}
        </div>
      </div>
    )
  }

  const describe = (key: keyof Fields) => (errors[key] ? `${key}-error` : undefined)

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-7" aria-describedby={status === 'error' ? 'form-error' : undefined}>
      {/* honeypot: invisibile alle persone, irresistibile per i bot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field id="name" label={form.name} required requiredLabel={form.required} error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="field__input"
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describe('name')}
            required
          />
        </Field>
        <Field id="email" label={form.email} required requiredLabel={form.required} error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className="field__input"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describe('email')}
            required
          />
        </Field>
      </div>

      <Field id="brand" label={form.brand}>
        <input id="brand" name="brand" type="text" autoComplete="organization" className="field__input" value={values.brand} onChange={(e) => set('brand', e.target.value)} />
      </Field>

      <fieldset>
        <legend className="mb-3 text-[0.95rem] font-semibold">{form.budget}</legend>
        <div className="flex flex-wrap gap-2">
          {form.budgetOptions.map((opt) => {
            const checked = values.budget === opt
            return (
              <label
                key={opt}
                className={cn(
                  'relative inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-[0.95rem] font-medium transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)]',
                  checked ? 'bg-violet text-white shadow-glow' : 'bg-surface text-ink-2 hover:bg-surface-2',
                )}
              >
                <input type="radio" name="budget" value={opt} checked={checked} onChange={() => set('budget', opt)} className="sr-only" />
                {opt}
              </label>
            )
          })}
        </div>
      </fieldset>

      <Field id="message" label={form.message} required requiredLabel={form.required} error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={form.messagePlaceholder}
          className="field__input resize-y"
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={describe('message')}
          required
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-snug text-ink-2">
          <input
            type="checkbox"
            name="privacy"
            checked={values.privacy}
            onChange={(e) => set('privacy', e.target.checked)}
            aria-invalid={!!errors.privacy}
            aria-describedby={describe('privacy')}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-md shadow-[inset_0_0_0_1.5px_#cfc5f3] checked:bg-violet checked:shadow-none checked:[background-image:url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22><path%20d=%22M3%208.5l3%203%207-7%22%20stroke=%22%23fff%22%20stroke-width=%222%22%20fill=%22none%22/></svg>')]"
          />
          <span>
            {form.privacy.split(form.privacyLink)[0]}
            <SmartLink href={privacyHref} className="link-u font-medium text-violet">
              {form.privacyLink}
            </SmartLink>
            {form.privacy.split(form.privacyLink)[1]}
          </span>
        </label>
        {errors.privacy && (
          <p id="privacy-error" className="field__error mt-2">
            {errors.privacy}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" variant="primary" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? form.sending : form.submit}
        </Button>
        <div ref={resultRef} tabIndex={-1} className="outline-none" aria-live="assertive">
          {status === 'error' && (
            <p id="form-error" className="field__error max-w-[40ch] text-base">
              {form.errors.generic}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  required,
  requiredLabel,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  requiredLabel?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="field">
      <label htmlFor={id} className="flex justify-between gap-4 text-[0.95rem] font-semibold">
        <span>{label}</span>
        {required && <span className="text-sm font-normal text-muted">{requiredLabel}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field__error">
          {error}
        </p>
      )}
    </div>
  )
}
