// /api/instagram.js
import instagramGetUrl from 'instagram-url-direct';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'Missing URL' });
  }

  try {
    const result = await instagramGetUrl(url);
    if (result?.url_list?.length > 0) {
      return res.status(200).json({ videoUrl: result.url_list[0] });
    }
    res.status(404).json({ message: 'Video not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
