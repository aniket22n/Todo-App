import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todosAtom } from "../store/todosAtom";
import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActionArea,
} from "@mui/material";
import "./PrintTodos.css";
import { Scrollbars } from "react-custom-scrollbars";
import { BASE_URL } from "../../config";

function PrintTodos() {
  const todos = useRecoilValue(todosAtom);
  const setTodos = useSetRecoilState(todosAtom);

  function deleteTodo(id) {
    axios.delete(BASE_URL + "/deleteTodo/" + id).then((res) => {
      setTodos((todos) => todos.filter((todo) => todo._id != id));
    });
  }
  if (todos.length == 0) {
    return (
      <center>
        <div class="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </center>
    );
  }
  var count = 1;
  return (
    <Scrollbars id="scrollbar" autoHeight autoHeightMin={500}>
      <Card className="printTodos-Container">
        <Typography id="title">Tasks</Typography>
        {todos.map((todo) => {
          return (
            <Card className="todo">
              <Typography id="count">{count++ + "]"}</Typography>
              <CardContent>
                <Typography variant="overline" id="task">
                  {todo.task}
                </Typography>
              </CardContent>
              <Button id="remove-button" onClick={() => deleteTodo(todo._id)}>
                ✔
              </Button>
            </Card>
          );
        })}
      </Card>
    </Scrollbars>
  );
}

export default PrintTodos;
