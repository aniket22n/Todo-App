import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  Typography,
  CardActions,
  CardContent,
  Alert,
} from "@mui/material";
import axios from "axios";
import { atom, useRecoilValue, useSetRecoilState, RecoilRoot } from "recoil";

const todosAtom = atom({
  key: "todoState",
  default: axios.get("http://localhost:3000/todos").then((res) => {
    return res.data;
  }),
});

function App() {
  const [count, setCount] = useState(0);
  return (
    <div id="App">
      <RecoilRoot>
        <CreateTodo />
        <ShowTodos />
      </RecoilRoot>
    </div>
  );
}

function CreateTodo() {
  const setTodos = useSetRecoilState(todosAtom);
  const [input, setInput] = useState("");
  function onChange(event) {
    setInput(event.target.value);
  }
  function addTodo() {
    if (input == "") {
      alert("Hey, your todo is empty!");
    } else {
      axios
        .post("http://localhost:3000/addTodo", { task: input })
        .then((res) => {
          setTodos((old) => [...old, res.data]);
        });
    }
    setInput("");
    document.getElementById("input").value = "";
  }
  return (
    <div style={{ width: "520px" }}>
      <Card>
        <RecoilRoot></RecoilRoot>
        <CardActions>
          <TextField
            id="input"
            label="NEW TODO"
            variant="outlined"
            onChange={onChange}
            style={{ width: "400px" }}
          />
          <Button
            variant="contained"
            style={{ marginLeft: "5px", height: "55px" }}
            onClick={() => addTodo()}
          >
            Add Todo
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

function ShowTodos() {
  const todos = useRecoilValue(todosAtom);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "20px",
      }}
    >
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
    <div id={id}>
      <Card
        sx={{ maxWidth: 515 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="body2" fontSize={"20px"}>
            {task}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => deleteTodo(id)}
          >
            Delete
          </Button>
          <Button variant="outlined">Update</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default App;
