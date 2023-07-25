import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { Card, TextField, Button } from "@mui/material";
import { todosAtom } from "../store/todosAtom";
import "./CreateTodo.css";
import { BASE_URL } from "../../config";

function CreateTodo() {
  const setTodos = useSetRecoilState(todosAtom);
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

  return (
    <Card className="createTodo-Container">
      <TextField id="input" label="NEW TODO" onChange={onChange} />
      <Button id="button" variant="contained" onClick={() => addTodo()}>
        Add Todo
      </Button>
    </Card>
  );
}

export default CreateTodo;
