//Import Dotenv
require("dotenv").config();

//Import express
const express = require("express");

//cors
const cors = require("cors");

//Import Axios
const axios = require("axios");

//Import Supabase instance
const supabase = require("./supabaseInstance");

//Import route functions
const getAll = require("./routes/getAll");
const getById = require("./routes/getById");
const deleteSnack = require("./routes/deleteSnack");
const updateSnack = require("./routes/updateSnack");
const addSnack = require("./routes/addSnack");

//Express application
const app = express();

// define port
const PORT = 4000;

const corsOptions = {
  origin: "https://example.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//Using CORS
app.use(cors(corsOptions));

//Using JSON middleware to parse bodies
app.use(express.json());

//middleware for API security
app.use((request, response, next) => {
  const apiKey = request.headers["api-key"];
  console.log(apiKey);
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return response
      .status(403)
      .json({ message: "Access Denied! API key required" });
  }
  next();
});

//defining routes

//Home Route

app.get("/", (request, response, next) => {
  response.json(SNACKS);
});

// get all snacks
app.get("/snacks", getAll);

// get single snack by id
app.get("/snacks/:id", getById);

//DELETE by id
app.delete("/snacks/:id", deleteSnack);

//POST/add a snack
app.post("/snacks", addSnack);

//Route to Update a snack by id
app.put("/snacks/:id", updateSnack);

//error handling
//Generic error handling
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).json({
    error: "something broke!",
    errorStack: error.stack,
    errorMessage: error.message,
  });
});

//404 Resource not found
app.use((request, response, next) => {
  response
    .status(404)
    .json({ error: "Resource not found, where are you looking" });
});
//export app for testing
module.exports = app;

//server listening on port
app.listen(PORT, () => {
  console.log(`the server is running on http://localhost:${PORT}`);
});
