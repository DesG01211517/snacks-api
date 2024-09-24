//Import Dotenv
require("dotenv").config();

const request = require("supertest");
const app = require("../index.js");

describe("GET /snacks", () => {
  //test to get all
  it("should return a list of snacks", async () => {
    const response = await request(app)
      .get("/snacks")
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
//test to get a single snack by id
describe("GET /snacks/:id", () => {
  it("should return a single snack by id", async () => {
    const snackId = 8; //snacks(id) must ne adjusted
    const response = await request(app)
      .get(`/snacks/${snackId}`)
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", snackId);
  });
});

describe("POST /snacks", () => {
  it("should add a new snack", async () => {
    const newSnack = {
      name: "Chips",
      description: "Salty and crunchy",
      price: 1.99,
      category: "Snacks",
      inStock: true,
    };

    const response = await request(app)
      .post("/snacks")
      .set("api-key", process.env.ADMIN_API_KEY)
      .send(newSnack);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newSnack);
  });
});

describe("PUT /snacks/:id", () => {
  it("should update an existing snack", async () => {
    const updatedSnack = {
      name: "Chips",
      description: "Extra salty",
      price: 2.49,
      category: "Snacks",
      inStock: true,
    };

    const response = await request(app)
      .put("/snacks/1")
      .set("api-key", process.env.ADMIN_API_KEY)
      .send(updatedSnack);
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE /snacks/:id", () => {
  it("should delete a snack", async () => {
    const response = await request(app)
      .delete("/snacks/1")
      .set("api-key", process.env.ADMIN_API_KEY);
    expect(response.statusCode).toBe(204);
  });
});
