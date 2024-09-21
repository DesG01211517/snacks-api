//Import Supabase
const supabase = require("../supabaseInstance");

const getById = async (request, response, next) => {
  try {
    const res = await supabase.get(`/snacks?id=eq.${request.params.id}`);

    //Error Handling
    if (!res.data.length) {
      return response.status(404).json({ message: "Snack not available" });
    }

    // sending snack object
    response.json(res.data[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
