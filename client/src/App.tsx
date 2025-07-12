import { useEffect, useState } from "react";
import api from "./api";

import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  IconButton,
  Typography,
  ListItemText,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});


type Todo = {
  _id: string;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [darkMode, setDarkMode] = useState(true); 


  const fetchTodos = async () => {
    const res = await api.get("/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!newTitle.trim()) return;
    const res = await api.post("/todos", { title: newTitle });
    setTodos([...todos, res.data]);
    setNewTitle("");
  };

  const toggleCompleted = async (id: string, completed: boolean) => {
    const res = await api.patch(`/todos/${id}`, { completed: !completed });
    setTodos(todos.map(t => (t._id === id ? res.data : t)));
  };

  const deleteTodo = async (id: string) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline /> {/* Temanın body ve arka planını otomatik ayarlar */}
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        {/* Toggle Butonu */}
        <Button
          onClick={() => setDarkMode(!darkMode)}
          sx={{ mb: 2 }}
          aria-label={darkMode ? "Açık Moda Geç" : "Gece Moduna Geç"}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </Button>
  
        <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Yapılacaklar Listesi
      </Typography>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <TextField
          fullWidth
          label="Yeni görev ekle"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <Button variant="contained" onClick={addTodo}>
          Ekle
        </Button>
      </div>

      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo._id}
            secondaryAction={
              <IconButton edge="end" onClick={() => deleteTodo(todo._id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleCompleted(todo._id, todo.completed)}
            />
            <ListItemText
              primary={todo.title}
              sx={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;
