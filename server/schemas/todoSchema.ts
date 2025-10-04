import { model, Schema } from 'mongoose';
import { Todo } from '../types';

const TodoSchema = new Schema<Todo>(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default model<Todo>('Todo', TodoSchema);
