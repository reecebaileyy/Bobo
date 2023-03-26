const mongoose = require('mongoose');

const metadataSchema = new mongoose.Schema({
    tokenId: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    attributes: { type: [{ trait_type: String, value: String }], required: true }
  });

const Metadata = mongoose.model('Metadata', metadataSchema);

module.exports = { Metadata };
