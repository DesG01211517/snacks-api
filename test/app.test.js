const request = require("supertest");
const app = require("../index.js");

describe("GET /snacks", () => {
  it("should return a list of snacks", async () => {
    const response = await request(app).get("/snacks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("GET /snacks/:id", () => {
  it("should return a single snack by id", async () => {
    const response = await request(app).get("/snacks/33"); //snacks(id) must be adjusted
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("should return 404 if snack not found", async () => {
    const response = await request(app).get("/snacks/999");
    expect(response.statusCode).toBe(404);
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

    const response = await request(app).post("/snacks").send(newSnack);
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

    const response = await request(app).put("/snacks/1").send(updatedSnack);
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE /snacks/:id", () => {
  it("should delete a snack", async () => {
    const response = await request(app).delete("/snacks/1");
    expect(response.statusCode).toBe(204);
  });
});
