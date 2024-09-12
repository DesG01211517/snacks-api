//Import Supabase
const supabase = require("../supabaseInstance");

const addSnack = async (request, response, next) => {
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
    const res = await supabase.post("/snacks", newSnack);

    response.status(201).json(newSnack);
  } catch (error) {
    next(error);
  }
};

module.exports = addSnack;
