import { createContext } from "react";

type ExtensionsContextType = {
  extension: {
    id: string;
    name: string;
    content: string;
  };
  setExtension: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
      content: string;
    }>
  >;
};

export const ExtensionsContext = createContext<ExtensionsContextType>({
  extension: {
    id: "1",
    name: "extension",
    content: `console.log("My First Extension");`,
  },
  setExtension: () => {},
});
