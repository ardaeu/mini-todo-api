import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

const TodoModel = model("Todo", todoSchema);

export default TodoModel;
