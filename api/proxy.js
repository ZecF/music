
// File: api/proxy.js
export default async function handler(req, res) {
    const { url, query } = req.query;
    const API_KEY = "Yes";

    try {
        let targetUrl = '';
        
        if (query) {
            targetUrl = `https://zynfx.eu.org/api/spotifySearch?query=${encodeURIComponent(query)}&apikey=${API_KEY}`;
        } else if (url) {
            targetUrl = `https://zynfx.eu.org/api/spotify?url=${encodeURIComponent(url)}&apikey=${API_KEY}`;
        } else {
            return res.status(400).json({ error: "Parameter query atau url tidak ditemukan" });
        }

        const response = await fetch(targetUrl);
        const data = await response.json();
        
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
