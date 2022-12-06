import { createContext } from "react";
import { RenderTree } from "../interfaces";

type defaultSelectedContent = {
  selectedNode: RenderTree;
  setSelectedNode: React.Dispatch<React.SetStateAction<RenderTree>>;
};

export const SelectedNodeContext = createContext<defaultSelectedContent>({
  selectedNode: {
    id: 1,
    name: "home",
    isFolder: true,
    children: [],
  },
  setSelectedNode: () => {},
});
