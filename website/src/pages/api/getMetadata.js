const { connectToDatabase } = require('../../../lib/mongodb');

module.exports = async function handler(req, res) {
    console.log('Request:', req.query)
    const { token } = req.query;
    console.log('Requested token:', token);
    const { client, db } = await connectToDatabase();
    
    try {
      const dbName = client.db("test").databaseName;
      const collectionName = db.collection('metadatas').collectionName;
      console.log('Database name:', dbName);
      console.log('Collection name:', collectionName);
  
      const metadata = await db.collection('metadatas').findOne({ token: parseInt(token, 10) });
      console.log('Fetched metadata:', metadata);
      if (!metadata) {
        return res.status(404).json({ message: 'Metadata not found' });
      }
      res.status(200).json(metadata);
    } catch (error) {
        console.error('Error fetching metadata:', error);
      res.status(500).json({ message: `Error fetching metadata: ${error.message}` });
    }
}
