import { Request, Response } from "express";
import TodoModel from "../models/todoModel";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await TodoModel.find();
  res.json(todos);
};

export const addTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTodo = await TodoModel.create({ title });
  res.status(201).json(newTodo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  await TodoModel.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });

    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
