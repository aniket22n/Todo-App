import { atom } from "recoil";

export const deleteTodoAtom = atom({
  key: "deleteTodoState",
  default: {
    id: null,
    position: 0,
  },
});
