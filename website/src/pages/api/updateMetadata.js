
export default async function handler(req, res) {
  const { token, newName } = req.body;

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  if (!token || !newName) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  } else {
    try {

      res.status(200).json({ message: 'Metadata name updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = { default: handler };
