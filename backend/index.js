const express = require('express');
const cors = require('cors');
const { connectDB, Todo } = require('./db/database');
const { getTodos, addTodo, updateTodo, deleteTodo} = require('./routes/routes')
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/todos", getTodos);
app.post("/addTodo", addTodo);
app.put("/updateTodo/:id", updateTodo);
app.delete("/deleteTodo/:id", deleteTodo);

app.get("/",(req, res) => {
  res.sendFile(path.join(__dirname, ));
})

app.listen(3000, () => {
  console.log("listening on port: 3000");
})