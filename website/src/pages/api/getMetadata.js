
export default async function handler(req, res) {
  const { token } = req.query;

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  if (!token) {
    res.status(400).json({ message: 'Missing token' });
    return;
  } else {
    try {

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
