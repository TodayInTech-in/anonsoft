// Vercel serverless function: server-side AEO check (no CORS issues)
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') return res.status(200).end();

    let { domain } = req.query;
    if (!domain) return res.status(400).json({ error: 'domain parameter required' });

    domain = domain.replace(/^https?:\/\//i, '').replace(/\/+$/, '').split('/')[0].toLowerCase();

    const results = {
        domain,
        llmsTxt: false,
        llmsFull: false,
        llmsTxtContent: '',
        hasAiBotAccess: true
    };

    const fetchWithTimeout = async (url, ms = 7000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), ms);
        try {
            const r = await fetch(url, {
                signal: controller.signal,
                headers: { 'User-Agent': 'TodayInTech-AEO-Checker/1.0' }
            });
            clearTimeout(id);
            return r;
        } catch (e) {
            clearTimeout(id);
            throw e;
        }
    };

    // Check /llms.txt
    try {
        const r = await fetchWithTimeout(`https://${domain}/llms.txt`);
        if (r.ok) {
            const txt = await r.text();
            if (txt && !txt.includes('<!DOCTYPE html>') && txt.length > 20) {
                results.llmsTxt = true;
                results.llmsTxtContent = txt.slice(0, 2000);
            }
        }
    } catch (_) {}

    // Check /llms-full.txt (independent of llms.txt result)
    try {
        const r = await fetchWithTimeout(`https://${domain}/llms-full.txt`);
        if (r.ok) {
            const txt = await r.text();
            if (txt && !txt.includes('<!DOCTYPE html>') && txt.length > 20) {
                results.llmsFull = true;
            }
        }
    } catch (_) {}

    // Check robots.txt for AI bot access
    try {
        const r = await fetchWithTimeout(`https://${domain}/robots.txt`);
        if (r.ok) {
            const robotsTxt = await r.text();
            const lines = robotsTxt.split('\n').map(l => l.trim().toLowerCase());
            const aiBots = ['gptbot', 'claudebot', 'perplexitybot', 'google-extended', 'applebot'];
            let currentAgent = null;
            const blocked = new Set();
            const explicitlyAllowed = new Set();
            let globalBlocked = false;

            for (const line of lines) {
                if (line.startsWith('user-agent:')) {
                    currentAgent = line.replace('user-agent:', '').trim();
                } else if (line.startsWith('disallow:') && currentAgent) {
                    const path = line.replace('disallow:', '').trim();
                    if (path === '/') {
                        if (currentAgent === '*') globalBlocked = true;
                        else blocked.add(currentAgent);
                    }
                } else if (line.startsWith('allow:') && currentAgent) {
                    const path = line.replace('allow:', '').trim();
                    if (path === '/') explicitlyAllowed.add(currentAgent);
                }
            }

            // AI bots are accessible if they're not explicitly blocked
            const anyBlocked = aiBots.some(bot =>
                blocked.has(bot) || (globalBlocked && !explicitlyAllowed.has(bot))
            );
            results.hasAiBotAccess = !anyBlocked;
        }
        // If no robots.txt (404), bots are freely accessible
    } catch (_) {}

    return res.status(200).json(results);
}
