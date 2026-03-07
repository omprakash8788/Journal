import config from "./config/config.js";
import app from "./express.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${config.port}`);
});