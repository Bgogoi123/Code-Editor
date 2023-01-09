import { List, ListItem, ListItemText } from "@mui/material";
import { useContext, useEffect } from "react";
import { CheckExtensionContext } from "../../context/CheckExtensionContext";
import { ExtensionListContext } from "../../context/ExtensionListContext";

const ExtensionList = () => {
  const { setIsExtension, setExtensionId } = useContext(CheckExtensionContext);
  const extensionData = window.localStorage.getItem("extensions");
  console.log({ extensionData });

  const { extensionArray, setExtensionArray } =
    useContext(ExtensionListContext);

  const setCurrentExtension = (id: string) => {
    setIsExtension(true);
    setExtensionId(id);
  };

  useEffect(() => {
    if (extensionData !== null) {
      setExtensionArray(JSON.parse(extensionData));
    }
  }, []);

  useEffect(() => {
    console.log(" extensionArray use effett");
    if (extensionArray.length < 1) return;
    window.sessionStorage.setItem("extensions", JSON.stringify(extensionArray));
  }, [extensionArray]);

  return (
    <div>
      <List dense={true}>
        {extensionArray.map((extension, index) => (
          <ListItem
            onClick={() => setCurrentExtension(extension.id)}
            sx={{
              cursor: "pointer",
              padding: 0,
              "&:hover": { backgroundColor: "#6a707d" },
            }}
          >
            <ListItemText primary={extension.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ExtensionList;
