const mongoose = require('mongoose');

async function connectDB() {
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/Todo-App');
    console.log("connected to database successfully");
  } catch(err) {
    console.log("Failed to connect database");
  }
}

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true},
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { connectDB, Todo };