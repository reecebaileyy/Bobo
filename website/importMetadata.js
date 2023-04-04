require('dotenv').config();
const fs = require('fs');
const path = require('path');
const dbConnect = require('./lib/dbConnect').default;
const Metadata = require('./models/Metadata');

const metadataDirectory = path.join(process.cwd(), 'public', 'metadata');

(async () => {
  try {
    await dbConnect();

    const files = fs.readdirSync(metadataDirectory);

    for (const file of files) {
      const token = parseInt(file.replace('.json', ''), 10);
      const metadataPath = path.join(metadataDirectory, file);
      const metadataJSON = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

      const existingMetadata = await Metadata.findOne({ token });

      if (!existingMetadata) {
        const newMetadata = new Metadata({ token, metadata: metadataJSON });
        await newMetadata.save();
        console.log(`Imported token ${token}`);
      } else {
        console.log(`Token ${token} already exists in the database`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
