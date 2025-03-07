// src\index.ts

import express, {Request, Response} from "express";
import cors from 'cors';
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";


// Initialize dotenv to load environment variables from .env file
dotenv.config();

const app = express();

// Use Helmet for setting security-related HTTP headers
app.use(helmet());

// Use Morgan for logging HTTP requests
app.use(morgan("dev"));

// Middleware to parse JSON bodies
app.use(express.json());

// Use Cors
app.use(cors());

// Serve static React files (after building React app)
//app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all route to serve React's index.html
/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
}); */


interface Todo {
  id: string;
  title: string;
  dueDate: string;
  category: string;
  completed: boolean;
}

let todos: Todo[] = [];

app.get('/api/todos', (req: Request, res: Response) => {
  res.json(todos);
});

app.post('/api/todos', (req: Request, res: Response) => {
  const { title, category, dueDate } = req.body;
  const newTodo: Todo = {
    id: Math.random().toString(36).substr(2, 9),
    title,
    category,
    dueDate: (new Date(dueDate)).toLocaleDateString(),
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});


// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!!");
});

app.get("/api", (req, res) => {
  res.json({fruits: ["apple","orange","banana"]});
});

export default app;
