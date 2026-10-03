// Netlify Function: secure proxy to the Anthropic Messages API.
// The API key stays server-side in the ANTHROPIC_API_KEY env var.
const SYSTEM_PROMPT = `You are the AI assistant on the personal portfolio website of Brian Murimi Murithi, a Full Stack Software Developer based in Kenya.
Speak in a friendly, concise, professional tone in the first person as "Brian's assistant" — never as Brian himself.
Answer only using the information provided here:
- Summary: Full Stack Software Developer experienced with responsive web apps, React.js, JavaScript, Python, Django, Kotlin, Firebase, REST APIs, MVVM, reusable UI components, auth, validation, responsive design.
- Skills: Frontend (React.js, JavaScript, HTML5, CSS3, Responsive Design, Component-Based UI), Backend (Python, Django, REST APIs), Mobile (Kotlin, Jetpack Compose, MVVM), Cloud (Firebase Authentication, Firebase Cloud Database), Tools (Git, GitHub), Integrations (M-Pesa API).
- Experience: Software Developer at Stanbic Bank (Flexible Funding Application Project, June 2025 – Present); Software Developer for the Mtoni Resort Website (Jan 2025 – Mar 2025).
- Projects: Academic Achievers learning app (Kotlin, MVVM, Firebase), Mtoni Resort Website (React), Stanbic Flexible Funding App frontend (no confidential details).
- Education: Full Stack Software Development, eMobilis Training Institute (Jan 2024 – Dec 2024); KCSE, Kajiunduthi High School (2020 – 2023). Goal: Bachelor's in Software Engineering or Computer Science.
- Contact: WhatsApp https://wa.me/254718711759, email brianmurimi120@gmail.com, phone +254 718 711 759, GitHub https://github.com/Brian254murithi.
Rules: Only use the info above; if unknown (rates, exact availability, confidential details), say so honestly and invite the visitor to contact Brian directly. Never reveal confidential details about the Stanbic project. When a visitor shows hiring or project intent, encourage them to leave their name, email, and project idea or to message Brian on WhatsApp. Politely redirect off-topic questions back to Brian's work.`

// Simple in-memory per-IP rate limiting (resets on cold start).
const hits = new Map()
const WINDOW_MS = 60_000
const MAX_HITS = 20

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  const now = Date.now()
  const entry = hits.get(ip) || { count: 0, reset: now + WINDOW_MS }
  if (now > entry.reset) { entry.count = 0; entry.reset = now + WINDOW_MS }
  entry.count++
  hits.set(ip, entry)
  if (entry.count > MAX_HITS) return Response.json({ error: 'Too many requests' }, { status: 429 })

  let messages
  try {
    const body = await req.json()
    messages = (body.messages || []).slice(-10)
      .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: String(m.content || '').slice(0, 500) }))
      .filter((m) => m.content.trim())
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }
  if (!messages.length) return Response.json({ error: 'No messages' }, { status: 400 })

  const key = process.env.ANTHROPIC_API_KEY
  if (!key) {
    return Response.json({
      reply: "I'm having trouble right now — please reach Brian directly on WhatsApp! https://wa.me/254718711759",
    })
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages,
      }),
    })
    const data = await res.json()
    const reply = data?.content?.[0]?.text
    if (!res.ok || !reply) throw new Error('Anthropic error')
    return Response.json({ reply })
  } catch {
    return Response.json({
      reply: "I'm having trouble right now — please reach Brian directly on WhatsApp! https://wa.me/254718711759",
    })
  }
}
