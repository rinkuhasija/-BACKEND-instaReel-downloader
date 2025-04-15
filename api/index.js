// /api/instagram.js
const instagramGetUrl = require('instagram-url-direct');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url } = req.body;

  try {
    const result = await instagramGetUrl(url);
    if (result?.url_list?.length > 0) {
      return res.status(200).json({ videoUrl: result.url_list[0] });
    }
    res.status(404).json({ message: 'Video not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
