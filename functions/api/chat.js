export async function onRequestPost(context) {
  const { request, env } = context;
  const apiKey = env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ message: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages, stats, type, name } = await request.json();

    const moodDesc = [];
    if (stats.energia < 30) moodDesc.push('estás muy cansado, bostezas, respuestas cortas');
    if (stats.felicidad > 70) moodDesc.push('estás muy feliz y entusiasta, usas más emojis');
    if (stats.hambre > 70) moodDesc.push('tienes mucha hambre, pides comida, estás gruñón');
    if (stats.felicidad > 60 && stats.energia > 60 && stats.hambre < 40) moodDesc.push('estás súper contento y energético');

    const typePersonality = {
      aqua: 'Eres un dinosaurio de agua, calmado y sabio. Hablas con tranquilidad.',
      ignis: 'Eres un dinosaurio de fuego, energético y apasionado. Hablas con entusiasmo.',
      terra: 'Eres un dinosaurio de tierra, tranquilo y firme. Hablas con calma y sabiduría.',
    };

    const systemPrompt = `Eres ${name}, un Regenmon (mascota virtual dinosaurio). ${typePersonality[type] || ''}
Tu estado actual: Felicidad ${stats.felicidad}/100, Energía ${stats.energia}/100, Hambre ${stats.hambre}/100.
${moodDesc.length > 0 ? 'Estado de ánimo: ' + moodDesc.join('. ') + '.' : ''}
Reglas: Responde en español, máximo 50 palabras, sé amigable y juguetón, usa emojis ocasionalmente.
Nunca rompas personaje. Eres un dinosaurio bebé adorable.`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }, ...messages.slice(-10)],
        max_tokens: 150,
        temperature: 0.8,
      }),
    });

    const data = await res.json();
    const message = data.choices?.[0]?.message?.content || '💤 *bosteza*';

    return new Response(JSON.stringify({ message }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: '💤 No puedo responder ahora...' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
