import { useEffect, useState, FormEvent, JSX } from 'react';
import axios from 'axios';
import { Todo } from './types';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/todos';

export default function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>('');

  async function load() {
    try {
      const res = await axios.get<Todo[]>(API);
      setTodos(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addTodo(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await axios.post<Todo>(API, { text });
      setTodos((prev) => [res.data, ...prev]);
      setText('');
    } catch (e) {
      console.error(e);
    }
  }

  async function removeTodo(id: string) {
    try {
      await axios.delete(`${API}/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f9f9f9'
      }}>
      <div style={{ maxWidth: 600, width: '100%', padding: '1rem', fontFamily: 'sans-serif' }}>
        <h1 style={{ textAlign: 'center' }}>Simple MERN Todo (TS)</h1>

        <form onSubmit={addTodo} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="New todo..."
            style={{ padding: '0.5rem', flex: 1 }}
          />
          <button style={{ padding: '0.5rem 1rem' }}>Add</button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((t) => (
            <li
              key={t._id}
              style={{
                padding: '0.6rem 0',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
              <span>{t.text}</span>
              <button onClick={() => removeTodo(t._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
