const docs = {
  name: "Snacks API",
  version: "1.0.0",
  description: "API for managing snacks in the database.",
  routes: {
    addSnack: {
      method: "POST",
      path: "/snacks",
      description: "Adds a new snack to the database.",
      request_body: {
        name: "string (required)",
        description: "string (required)",
        price: "number (required)",
        category: "string (required)",
        inStock: "boolean (required)",
      },
      response: {
        201: "Snack added successfully",
        400: "Missing required fields",
      },
    },
    deleteSnack: {
      method: "DELETE",
      path: "/snacks/:id",
      description: "Deletes a snack from the database by ID.",
      parameters: {
        id: "number (required)",
      },
      response: {
        204: "Snack deleted successfully",
        404: "Snack not found",
      },
    },
    getAll: {
      method: "GET",
      path: "/snacks",
      description: "Retrieves all snacks from the database.",
      response: {
        200: "Returns an array of snacks",
      },
    },
    getById: {
      method: "GET",
      path: "/snacks/:id",
      description: "Retrieves a snack by its ID.",
      parameters: {
        id: "number (required)",
      },
      response: {
        200: "Returns the snack with the specified ID",
        404: "Snack not found",
      },
    },
    updateSnack: {
      method: "PATCH",
      path: "/snacks/:id",
      description: "Updates an existing snack by its ID.",
      request_body: {
        name: "string (required)",
        description: "string (required)",
        price: "number (required)",
        category: "string (required)",
        inStock: "boolean (required)",
      },
      parameters: {
        id: "number (required)",
      },
      response: {
        200: "Snack updated successfully",
        400: "Missing required fields",
        404: "Snack not found",
      },
    },
  },
};

module.exports = docs;
