import { atom } from "recoil";

export const colorAtom = atom({
  key: "colorState",
  default: {
    colour: "black",
    backgroundColour: "white",
    toggleTheme: "day",
  },
});
