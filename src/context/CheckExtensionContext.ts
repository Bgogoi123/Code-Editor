import { createContext } from "react";

type defaultCheck = {
  isExtension: boolean;
  setIsExtension: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CheckExtensionContext = createContext<defaultCheck>({
  isExtension: false,
  setIsExtension: () => {},
});
