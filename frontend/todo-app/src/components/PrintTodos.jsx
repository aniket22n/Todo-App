import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todosAtom } from "../store/todosAtom";
import { deleteTodoAtom } from "../store/deletAtom";
import { Card, Button, Typography, CardContent } from "@mui/material";
import "../style/PrintTodos.css";
import { Scrollbars } from "react-custom-scrollbars";
import { BASE_URL } from "../../config";
import { colorAtom } from "../store/darkTheme";

function PrintTodos() {
  const todos = useRecoilValue(todosAtom);
  const setTodos = useSetRecoilState(todosAtom);
  const setDeleteTodo = useSetRecoilState(deleteTodoAtom);
  const color = useRecoilValue(colorAtom);

  function deleteTodo(id) {
    axios.delete(BASE_URL + "/deleteTodo/" + id).then((res) => {
      setTodos((todos) => todos.filter((todo) => todo._id != id));
    });
  }
  if (todos.length == 0) {
    return (
      <center>
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </center>
    );
  }

  return (
    <Scrollbars autoHeight autoHeightMin={500}>
      <Card
        className="printTodos-Container"
        style={{
          color: color.colour,
          backgroundColor: color.backgroundColour,
        }}
      >
        <Typography id="title">Tasks</Typography>

        {todos.map((todo, index) => {
          return (
            <Card className="todo" id="white">
              <CardContent>
                <Typography variant="overline" id="task">
                  {index + 1 + ". "}
                  {todo.task}
                </Typography>
              </CardContent>

              <div id="buttons">
                <Button
                  id="update-button"
                  onClick={() =>
                    setDeleteTodo({ id: todo._id, position: index + 1 })
                  }
                >
                  📝
                </Button>
                <Button id="remove-button" onClick={() => deleteTodo(todo._id)}>
                  ✔
                </Button>
              </div>
            </Card>
          );
        })}
      </Card>
    </Scrollbars>
  );
}

export default PrintTodos;
