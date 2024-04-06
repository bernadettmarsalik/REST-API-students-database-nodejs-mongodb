const mongoose = require("mongoose");

const DB_URI =
  "mongodb+srv://myusername:12345@cluster0.6cbf8l3.mongodb.net/mynodejsdb?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Error while connecting " + error.message);
  }
};

module.exports = connectDB;
