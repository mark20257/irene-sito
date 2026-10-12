/**
 * POST /api/contact
 * Riceve il form contatti e lo inoltra via email con Resend (https://resend.com).
 * Variabili d'ambiente: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (vedi .env.example).
 * Se non sono impostate risponde 503 { error: 'not_configured' } e il sito
 * propone in automatico WhatsApp o email con il messaggio già compilato.
 */

type Payload = {
  name?: unknown
  email?: unknown
  brand?: unknown
  budget?: unknown
  message?: unknown
  privacy?: unknown
  website?: unknown
  elapsed?: unknown
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)

export async function POST(request: Request) {
  let body: Payload
  try {
    body = (await request.json()) as Payload
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  // anti-spam: honeypot pieno o invio troppo rapido → fingiamo che sia andato tutto bene
  if (str(body.website, 200) || (typeof body.elapsed === 'number' && body.elapsed > 0 && body.elapsed < 2500)) {
    return Response.json({ ok: true })
  }

  const data = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    brand: str(body.brand, 200),
    budget: str(body.budget, 60),
    message: str(body.message, 5000),
  }

  if (!data.name || !EMAIL.test(data.email) || !data.message || body.privacy !== true) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 422 })
  }

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!key || !to) {
    return Response.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  const rows: [string, string][] = [
    ['Nome', data.name],
    ['Email', data.email],
    ['Brand', data.brand || '—'],
    ['Budget', data.budget || '—'],
  ]
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${data.message}`
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#111">
    <table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
      .join('')}</table>
    <p style="white-space:pre-wrap;border-top:1px solid #ddd;padding-top:12px">${escapeHtml(data.message)}</p>
  </div>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Sito <onboarding@resend.dev>',
        to: [to],
        reply_to: data.email,
        subject: `Nuovo contatto: ${data.name}${data.brand ? ` — ${data.brand}` : ''}`,
        text,
        html,
      }),
    })
    if (!res.ok) return Response.json({ ok: false, error: 'send_failed' }, { status: 502 })
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }
}
