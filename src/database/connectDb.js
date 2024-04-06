const mongoose = require('mongoose');

async function connectDb(url) {
  await mongoose.connect(url).then(() => {
    console.log('Connected to DB!')
  }).catch(err) {
    console.error('Error logging into DB\n\n' + err)
  }
}

module.exports = {
  connectDb
}