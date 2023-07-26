import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";
import { Card, TextField, Button } from "@mui/material";
import { todosAtom } from "../store/todosAtom";
import { deleteTodoAtom } from "../store/deletAtom";
import "../style/CreateTodo.css";
import { BASE_URL } from "../../config";
import { colorAtom } from "../store/darkTheme";

function CreateTodo() {
  const setTodos = useSetRecoilState(todosAtom);
  const deleteTodo = useRecoilValue(deleteTodoAtom);
  const setDeleteTodo = useSetRecoilState(deleteTodoAtom);
  const color = useRecoilValue(colorAtom);
  const [input, setInput] = useState("");

  function onChange(event) {
    setInput(event.target.value);
  }

  async function addTodo() {
    if (input == "") alert("Hey, your todo is empty!");
    else {
      const url = BASE_URL + "/addTodo";
      const res = await axios.post(url, { task: input });
      setTodos((old) => [...old, res.data]);
    }
    setInput("");
    const inputField = document.getElementById("input");
    inputField.value = "";
    inputField.label = "NEW TODO";
  }

  async function updateTodo(id) {
    if (input == "") alert("Hey, your todo is empty!");
    else {
      const url = BASE_URL + "/updateTodo/" + id;
      const todos = await axios.put(url, { task: input });
      setTodos(todos.data);
    }
    const inputField = document.getElementById("edit-input");
    inputField.value = "";
    inputField.label = "NEW TODO";
    setDeleteTodo({ id: null, position: 0 });
  }

  if (deleteTodo.position != 0) {
    const label = "EDIT TODO NO. " + deleteTodo.position;
    return (
      <Card
        className="editTodo-Container"
        style={{
          color: color.colour,
          backgroundColor: color.backgroundColour,
        }}
      >
        <TextField id="edit-input" label={label} onChange={onChange} />
        <Button
          id="edit-button"
          variant="contained"
          onClick={() => updateTodo(deleteTodo.id)}
        >
          Edit Todo
        </Button>
      </Card>
    );
  }

  return (
    <Card
      className="createTodo-Container"
      style={{
        color: color.colour,
        backgroundColor: color.backgroundColour,
      }}
    >
      <TextField id="input" label="NEW TODO" onChange={onChange} />
      <Button id="button" variant="contained" onClick={() => addTodo()}>
        Add Todo
      </Button>
    </Card>
  );
}

export default CreateTodo;
