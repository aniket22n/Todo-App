const { Todo } = require('../db/database');

async function getTodos(req, res) {
  const todos = await Todo.find({});
  res.status(200).json(todos);
}

async function addTodo(req, res) {
  const newTodo = req.body;
  if(newTodo.task == "") {
    res.json({message: "You can not add empty task.."});
  }
  else {
    const todo = new Todo(newTodo);
    const resTodo = await todo.save();
    res.status(200).json(resTodo);  
  }
}

async function updateTodo(req, res) {
  const todoId = req.params.id;
  const newTodo = req.body;
  await Todo.updateOne({_id: todoId}, newTodo);
  const todos = await Todo.find({})
  res.status(200).json(todos);
}

async function deleteTodo(req, res) {
  const todoId = req.params.id;
  await Todo.deleteOne({_id: todoId});
  res.status(200).json({Message: "todo deleted successfully"});
}

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
}