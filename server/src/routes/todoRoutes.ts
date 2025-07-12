import express from "express";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo
} from "../controllers/todoController";

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", addTodo);
router.delete("/todos/:id", deleteTodo);
router.patch("/todos/:id", updateTodo);

export default router;
