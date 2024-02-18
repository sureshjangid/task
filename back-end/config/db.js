const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('DB_url', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('error :', error);
  }
};

module.exports = connectDB;
