import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todosAtom } from "./todosAtom";
import { Button, Card, Typography } from "@mui/material";

function PrintTodos() {
  const todos = useRecoilValue(todosAtom);
  return (
    <div>
      {todos.map((todo) => (
        <PrintTodo task={todo.task} id={todo._id} key={todo._id} />
      ))}
    </div>
  );
}

function PrintTodo({ task, id }) {
  const setTodos = useSetRecoilState(todosAtom);

  function deleteTodo(id) {
    axios.delete("http://localhost:3000/deleteTodo/" + id).then((res) => {
      setTodos((todos) => todos.filter((todo) => todo._id != id));
    });
  }
  return (
    <div>
      <Typography>{task}</Typography>
      <Button onClick={() => deleteTodo(id)}>Remove</Button>
    </div>
  );
}

export default PrintTodos;
