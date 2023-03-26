require('dotenv').config();

const express = require('express');
const { connectDatabase } = require('./database');
const { generateMetadata } = require('./generateMetadata.js'); // Assuming you've exported the generateMetadata function from your metadata file

const app = express();
const port = process.env.PORT;

// Connect to the MongoDB database
connectDatabase().then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error.message);
});

// Route handler for metadata
app.get('/:requested_uri', async (req, res) => {
  const { token_id, custom_name } = parseUri(req.params.requested_uri); // Assuming you've implemented the parseUri function
  const metadata = await generateMetadata(token_id, custom_name);

  if (metadata) {
    res.json(metadata);
  } else {
    res.status(404).send('Metadata not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Metadata server listening at http://localhost:${port}`);
});

// Implement the parseUri function (or any other helper functions) here as needed
function parseUri(requested_uri) {
    const [token_id, custom_name] = requested_uri.split('_');
    return { token_id, custom_name };
  }
