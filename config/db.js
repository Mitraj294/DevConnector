const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');  // Assuming you're using a config file

const connectDB = async () => {
  try {
    await mongoose.connect(db);  // No need for useNewUrlParser and useUnifiedTopology
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
