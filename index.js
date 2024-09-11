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
app.use(cors());

//Using JSON middleware to parse bodies
app.use(express.json());

//defining routes

//Home Route

app.get("/", (request, response, next) => {
  response.json(SNACKS);
});

// get all snacks
app.get("/snacks", cors(corsOptions), async (request, response, next) => {
  try {
    //response.json(SNACKS);
    const res = await supabase.get("/snacks");
    response.json(res.data);
  } catch (error) {
    next(error);
  }
});

// get single snack by id
app.get("/snacks/:id", async (request, response, next) => {
  try {
    const res = await supabase.get(`/snacks?id=eq.${request.params.id}`);

    //Error Handling
    if (!res.data) {
      return response.status(404).json({ message: "Snack not available" });
    }

    // sending snack object
    response.json(res.data[0]);
  } catch (error) {
    next(error);
  }
});

//POST/add a snack
app.post("/snacks", (request, response, next) => {
  try {
    const { name, description, price, category, inStock } = request.body;
    //error handling doesn't send all fields necessary
    if (!name || !description || !price || !category || !inStock) {
      return response.status(400).json({ message: "Missing fields!" });
    }
    //create a new object with a new id
    const newSnack = {
      //id: SNACKS.length +1,
      name,
      description,
      price,
      category,
      inStock,
    };

    //send object to our SQL db
    const res = supabase.post("/snacks", newSnack);

    response.status(201).json(newSnack);
  } catch (error) {
    next(error);
  }
});

//Route to Update a snack by id
app.put("/snacks/:id", async (request, response, next) => {
  try {
    //destructure our request.body object so we can store the fields in variables
    const { name, description, price, category, inStock } = request.body;
    //error handling if request doesn't send all required fields in variables
    if (!name || !description || !price || !category || !inStock) {
      return response.status(400).json({ message: "Missing required fields" });
    }
    //create a new object with a new id
    const updatedSnack = {
      //id: SNACKS.length + 1,
      name,
      description,
      price,
      category,
      inStock,
    };
    //send object to our SQL db
    const res = await supabase.patch(
      `/snacks?id=eq.${request.params.id}`,
      updatedSnack
    );

    //send ok response
    response.status(200).send();
  } catch (error) {
    next(error);
  }
});

//DELETE by id
app.delete("/snacks/:id", async (request, response, next) => {
  try {
    const res = await supabase.delete(`/snacks?id=eq.${request.params.id}`);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

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
//server listening on port
app.listen(PORT, () => {
  console.log(`the server is running on http://localhost:${PORT}`);
});
