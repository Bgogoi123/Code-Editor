import { useState } from "react";
import "./App.css";
import { ExtensionListContext } from "./context/ExtensionListContext";
import HomePage from "./pages/HomePage";

function App() {
  const [extensionArray, setExtensionArray] = useState<
    {
      id: string;
      name: string;
      content: string;
    }[]
  >([]);
  return (
    <ExtensionListContext.Provider
      value={{ extensionArray, setExtensionArray }}
    >
      <HomePage />
    </ExtensionListContext.Provider>
  );
}

export default App;
