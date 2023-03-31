import SaveIcon from "@mui/icons-material/Save";
import { Grid } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import CodeEditor from "../../components/CodeEditor";
import PopOver from "../../components/PopOver";
import { DirectoryContext } from "../../context/DirectoryContext";
import { SelectedNodeContext } from "../../context/SelectedNodeContext";
import { appendChildToNode } from "../Directories/operations";

const Editor = () => {
  const { data, setData } = useContext(DirectoryContext);
  const { selectedNode, setSelectedNode } = useContext(SelectedNodeContext);
  const [content, setContent] = useState<string>("");
  const [openSaveMessage, setOpenSaveMessage] = useState<boolean>(false);

  const onChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handleCloseSaveMessage = () => {
    setOpenSaveMessage(false);
  };

  const saveFile = () => {
    const tempNode = selectedNode;
    tempNode.content = content;
    setSelectedNode(tempNode);
    appendChildToNode(data, selectedNode.id, selectedNode);
    setData(data);
    window.localStorage.setItem("folderStructure", JSON.stringify(data));
    setOpenSaveMessage(true);
    setTimeout(() => {
      setOpenSaveMessage(false);
    }, 1000);
  };

  const handleKeyDown = (event: any) => {
    //event.preventDefault();
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if ((event.ctrlKey || event.metaKey) && charCode === "s") {
      saveFile();
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      {!selectedNode.isFolder && (
        <Grid container direction="column">
          <Grid
            item
            container
            justifyContent="space-between"
            sx={{ padding: "1em", color: "#d6d6d6" }}
          >
            {/* current file name */}
            <u>{selectedNode.name}</u>

            {/* Save */}
            <SaveIcon
              fontSize="small"
              sx={{ color: "#d6d6d6", cursor: "pointer" }}
              onClick={saveFile}
            />

            {/* Success Saved File */}
            <PopOver
              open={openSaveMessage}
              message={"Saved"}
              handleClose={handleCloseSaveMessage}
              type="success"
              position={{
                vertical: "top",
                horizontal: "right",
              }}
            />
          </Grid>
          <Grid
            item
            sx={{
              border: "1px solid grey",
            }}
          >
            <CodeEditor onChange={onChange} selectedNode={selectedNode} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Editor;
