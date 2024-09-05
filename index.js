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

const SNACKS = [
  {
    id: 1,
    name: "Chips",
    description: "Crunchy and salty potato chips.",
    price: 2.99,
    category: "Salty Snacks",
    inStock: true,
  },
  {
    id: 2,
    name: "Chocolate Bar",
    description: "Rich and creamy milk chocolate bar.",
    price: 1.49,
    category: "Sweet Snacks",
    inStock: true,
  },
  {
    id: 3,
    name: "Popcorn",
    description: "Buttery and fluffy popcorn.",
    price: 3.49,
    category: "Salty Snacks",
    inStock: false,
  },
  {
    id: 4,
    name: "Gummy Bears",
    description: "Colorful and chewy gummy bears.",
    price: 2.19,
    category: "Sweet Snacks",
    inStock: true,
  },
  {
    id: 5,
    name: "Pretzels",
    description: "Crispy and twisted pretzels.",
    price: 2.79,
    category: "Salty Snacks",
    inStock: true,
  },
  {
    id: 6,
    name: "Granola Bar",
    description: "Healthy and crunchy granola bar.",
    price: 1.99,
    category: "Healthy Snacks",
    inStock: true,
  },
  {
    id: 7,
    name: "Fruit Snacks",
    description: "Sweet and fruity gummy snacks.",
    price: 2.49,
    category: "Sweet Snacks",
    inStock: false,
  },
  {
    id: 8,
    name: "Nuts Mix",
    description: "A mix of roasted and salted nuts.",
    price: 4.99,
    category: "Healthy Snacks",
    inStock: true,
  },
  {
    id: 9,
    name: "Energy Bar",
    description: "High-protein energy bar.",
    price: 2.59,
    category: "Healthy Snacks",
    inStock: true,
  },
  {
    id: 10,
    name: "Rice Crackers",
    description: "Light and crispy rice crackers.",
    price: 3.19,
    category: "Healthy Snacks",
    inStock: false,
  },
];

//Using CORS
app.use(cors());

//Using JSON middleware to parse bodies

app.use(express.json());

//snack data

//defining routes

//Home Route

app.get("/", (request, response, next) => {
  response.json(SNACKS);
});

//get all snacks
// app.get("/snacks", async (request, response, next) => {
//   try {
//     //response.json(SNACKS);
//     const res = await supabase.get("/snacks");
//     response.json(res.data);
//   } catch (error) {
//     next(error);
//   }
// });
//POST
app.post("/snacks", async (request, response, next) => {
  try {
    const newSnack = request.body;
    const res = await supabase.post("/snacks", newSnack);
    response.status(201).json(res.data);
  } catch (error) {
    next(error);
  }
});
//PUT
app.put("/snacks/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const updatedSnack = request.body;
    const res = await supabase.put(`/snacks/${id}`, updatedSnack);
    response.json(res.data);
  } catch (error) {
    next(error);
  }
});
//DELETE
app.delete("/snacks/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const res = await supabase.delete(`/snacks/${id}`);
    response.json({ message: "Snack deleted successfully", data: res.data });
  } catch (error) {
    next(error);
  }
});

//error handling
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).json("something broke!");
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
