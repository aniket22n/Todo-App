import CreateTodo from "./components/CreateTodo";
import PrintTodos from "./components/PrintTodos";
import Navbar from "./components/Navbar";
import "./style/App.css";

function App() {
  return (
    <div id="App">
      <Navbar />
      <div id="todo-components">
        <CreateTodo />
        <PrintTodos />
      </div>
    </div>
  );
}

export default App;
