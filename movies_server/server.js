// Import the express module
import express from "express";

import { createClient } from "redis";
// Create an instance of express
const client = createClient({
  url: "redis://redis:6379",
});

// Error handler
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("Redis client connected"));

// Connect to Redis
await client.connect();
const app = express();

// Define the port
const port = 3000;

app.get("/signup", async (req, res) => {
  const username = req.query.username;

  const userId = Math.floor(Math.random() * 1000000);

  await client.set(userId.toString(), username);

  res.send(`Your user id is ${userId}`);

});

app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  const username = await client.get(userId);

  res.send(`Your username is ${username}`);
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
