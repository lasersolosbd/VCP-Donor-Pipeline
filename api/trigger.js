export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const n8nResponse = await fetch(
      'https://solobusinessdude.app.n8n.cloud/webhook/vcp-donor-discovery',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      }
    );

    const text = await n8nResponse.text();
    let data;
    try { data = JSON.parse(text); }
    catch { data = { message: text }; }

    return res.status(n8nResponse.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: 'Failed to reach n8n',
      detail: err.message
    });
  }
}
