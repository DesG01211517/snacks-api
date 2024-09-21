//Import Supabase
const supabase = require("../supabaseInstance");

const getAll = async (request, response, next) => {
  try {
    //response.json(SNACKS);
    const res = await supabase.get("/snacks");
    console.log(res);
    response.json(res.data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
