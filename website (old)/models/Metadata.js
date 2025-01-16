const mongoose = require('mongoose');

const metadataSchema = new mongoose.Schema({
  token: { type: Number, required: true },
  metadata: { type: Object, required: true },
});

module.exports = mongoose.model('Metadata', metadataSchema);
