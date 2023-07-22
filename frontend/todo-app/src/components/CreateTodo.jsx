import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { Card, TextField, Button } from "@mui/material";
import { todosAtom } from "./todosAtom";

function CreateTodo() {
  const setTodos = useSetRecoilState(todosAtom);
  const [input, setInput] = useState("");

  function onChange(event) {
    setInput(event.target.value);
  }

  async function addTodo() {
    if (input == "") alert("Hey, your todo is empty!");
    else {
      const url = "http://localhost:3000/addTodo";
      const res = await axios.post(url, { task: input });
      setTodos((old) => [...old, res.data]);
    }
    setInput("");
    document.getElementById("input").value = "";
  }

  return (
    <div>
      <TextField id="input" label="NEW TODO" onChange={onChange} />
      <Button variant="contained" onClick={() => addTodo()}>
        Add Todo
      </Button>
    </div>
  );
}

export default CreateTodo;
