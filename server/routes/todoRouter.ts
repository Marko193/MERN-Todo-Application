import { Router, Request, Response } from 'express';
import { Types } from 'mongoose';
import { TodoModel } from '../schemas';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const todos = await TodoModel.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { text } = req.body as { text?: string };
    if (!text) return res.status(400).json({ error: 'text required' });
    const todo = new TodoModel({ text });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'invalid id' });
    await TodoModel.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
