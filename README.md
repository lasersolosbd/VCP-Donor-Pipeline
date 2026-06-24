# RapportRadar — VCP Donor Discovery Console

Internal web interface for triggering and monitoring VCP prospect discovery runs.

## Setup

### 1. Set your Airtable PAT
In the `index.html` file, find this line near the top of the `<script>` block:
```js
const AIRTABLE_PAT = window.AIRTABLE_PAT || 'YOUR_AIRTABLE_PAT_HERE';
```

**For Vercel deployment**, add an environment variable in Vercel dashboard:
- Key: `AIRTABLE_PAT`
- Value: your Airtable Personal Access Token

Then update the script to read it (or inject it at build time — see below).

**For quick local testing**, replace `'YOUR_AIRTABLE_PAT_HERE'` directly in the file.

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set env var
vercel env add AIRTABLE_PAT
```

### 3. Webhook URL
The n8n webhook is already set in the config:
```
https://solobusinessdude.app.n8n.cloud/webhook/vcp-donor-discovery
```
If you switch to production webhook vs test webhook, update `WEBHOOK_URL` in `index.html`.

## Airtable PAT Scopes Required
- `data.records:read` on base `app3P0M65GLJgIe7q`
- `data.records:write` (not needed — writing is done by n8n)

## Files
- `index.html` — complete single-file app
- `vercel.json` — Vercel static deployment config
- `README.md` — this file

## Important Note on the Airtable PAT
This frontend reads the Pipeline Runs table and the Donor Prospects table directly from
the browser. This means the PAT is visible in the browser environment. For a public-facing
site this would be a problem — but since this is an internal ops tool accessed only by
authorized KLG/VCP staff, it is acceptable. When you scale to multiple clients, move the
Airtable reads to a serverless API route so the PAT stays server-side.
