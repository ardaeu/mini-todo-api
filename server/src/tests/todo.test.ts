import request from "supertest";
import express from "express";
import todoRoutes from "../routes/todoRoutes";

const app = express();
app.use(express.json());
app.use("/", todoRoutes);

describe("Todo API", () => {
  let createdId: number;

  it("GET /todos should return empty array", async () => {
    const res = await request(app).get("/todos");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /todos should add a new todo", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "Test todo" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Test todo");
    expect(res.body.completed).toBe(false);

    createdId = res.body.id; 
  });

  it("PATCH /todos/:id should update title and completed", async () => {
    const res = await request(app)
      .patch(`/todos/${createdId}`)
      .send({ title: "Updated title", completed: true });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated title");
    expect(res.body.completed).toBe(true);
  });

  it("DELETE /todos/:id should delete the todo", async () => {
    const res = await request(app).delete(`/todos/${createdId}`);
    expect(res.status).toBe(204);

    const getRes = await request(app).get("/todos");
    expect(getRes.body.find((t: any) => t.id === createdId)).toBeUndefined();
  });
});
