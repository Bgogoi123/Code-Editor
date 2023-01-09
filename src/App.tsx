import HomePage from "./pages/HomePage";
import "./App.css";
import { useState } from "react";
import { ExtensionListContext } from "./context/ExtensionListContext";

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
