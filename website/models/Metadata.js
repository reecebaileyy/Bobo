const mongoose = require('mongoose');

const MetadataSchema = new mongoose.Schema({
  token: { type: Number, required: true, unique: true },
  metadata: { type: Object, required: true },
});

module.exports = mongoose.models.Metadata || mongoose.model('Metadata', MetadataSchema);
