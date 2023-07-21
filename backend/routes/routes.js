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
    await todo.save();
    res.status(200).json({Message: "new todo added to the list"});  
  }
}

async function updateTodo(req, res) {
  const todoId = req.params.id;
  const newTodo = req.body;
  await Todo.updateOne({_id: todoId}, newTodo);
  res.status(200).json({Message: "todo updated successfully"});
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