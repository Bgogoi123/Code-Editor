import { createContext } from "react";

type ExtensionListType = {
  extensionArray: any[];
  setExtensionArray: (any: any) => any;
};

export const ExtensionListContext = createContext<ExtensionListType>({
  extensionArray: [],
  setExtensionArray: () => {},
});
