import { atom } from "recoil";
import axios from "axios";

export const todosAtom = atom({
  key: "todoState",
  default: axios.get("http://localhost:3000/todos").then((res) => {
    return res.data;
  }),
});