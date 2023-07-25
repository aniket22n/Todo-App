import { atom } from "recoil";
import axios from "axios";
import { BASE_URL } from "../../config";

export const todosAtom = atom({
  key: "getTodoState",
  default: axios.get(BASE_URL + "/todos").then((res) => {
    return res.data;
  }),
});
