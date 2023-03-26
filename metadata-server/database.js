const mongoose = require('mongoose');

async function connectDatabase() {
  await mongoose.connect('mongodb://localhost:27017/nft_metadata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  connectDatabase,
};
