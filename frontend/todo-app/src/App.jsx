import { RecoilRoot } from "recoil";
import CreateTodo from "./components/CreateTodo";
import PrintTodos from "./components/PrintTodos";

function App() {
  return (
    <div id="App">
      <RecoilRoot>
        <CreateTodo />
        <PrintTodos />
      </RecoilRoot>
    </div>
  );
}

export default App;
