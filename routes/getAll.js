//Import Supabase
const supabase = require("../supabaseInstance");

const cache = {};

const getAll = async (request, response, next) => {
  try {
    if (cache["snacks"]) {
      return response.json(cache["snacks"]);
    }
    const res = await supabase.get("/snacks");
    cache["snacks"] = res.data;
    response.json(res.data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
