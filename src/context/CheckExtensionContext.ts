import { createContext } from "react";

type defaultCheck = {
  isExtension: boolean;
  setIsExtension: React.Dispatch<React.SetStateAction<boolean>>;
  extensionId: string;
  setExtensionId: React.Dispatch<React.SetStateAction<string>>;
};

export const CheckExtensionContext = createContext<defaultCheck>({
  isExtension: false,
  setIsExtension: () => {},
  extensionId: "",
  setExtensionId: () => {},
});
