import { createContext } from "react";
import { RenderTree } from "../interfaces";

type defaultContent = {
  data: RenderTree;
  setData: React.Dispatch<React.SetStateAction<RenderTree>>;
};

export const DirectoryContext = createContext<defaultContent>({
  data: {
    id: 1,
    name: "home",
    isFolder: true,
    children: [],
  },
  setData: () => {},
});
