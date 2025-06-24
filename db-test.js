const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

async function testMongoConnection() {
  console.log("Testing MongoDB connection...");
  console.log(
    `MongoDB URI: ${process.env.MONGO_URI ? "Defined" : "NOT defined"}`
  );

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connection successful!");

    // List all collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("Available collections:");
    collections.forEach((collection) => {
      console.log(`- ${collection.name}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.error("Please check your MongoDB URI in the .env file");
  } finally {
    // Close the connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("Connection closed.");
    }
  }
}

testMongoConnection();
