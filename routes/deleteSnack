//Import Supabase
const supabase = require("../supabaseInstance");

const deleteSnack = async (request, response, next) => {
  try {
    const res = await supabase.delete(`/snacks?id=eq.${request.params.id}`);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = deleteSnack;
