/**
 * src/config/database.js
 *
 * handles the connection to MongoDB
 * @param {String} mongoose
 */

 module.exports = (mongoose) => {
    try {
      mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log('MongoDB connection success');
    } catch (error) {
      console.error('MongoDB connection error:');
    }
  };
  