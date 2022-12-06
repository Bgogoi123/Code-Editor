import { useCallback, useContext, useState } from "react";
import { Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { SelectedNodeContext } from "../../context/SelectedNodeContext";
import { appendChildToNode } from "../Directories/operations";
import CodeEditor from "../../components/CodeEditor";
import { DirectoryContext } from "../../context/DirectoryContext";

const Editor = () => {
  const { data } = useContext(DirectoryContext);
  const { selectedNode, setSelectedNode } = useContext(SelectedNodeContext);
  const [content, setContent] = useState<string>("");

  const onChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const saveFile = () => {
    const tempNode: any = selectedNode;
    tempNode.content = content;
    setSelectedNode(tempNode);
    appendChildToNode(data, selectedNode.id, selectedNode);
  };

  return (
    <div>
      {!selectedNode.isFolder && (
        <Grid container direction="column" sx={{ padding: "1em" }}>
          <Grid
            item
            container
            justifyContent="space-between"
            sx={{ padding: "1em", color: "#d6d6d6" }}
          >
            <u>{selectedNode.name}</u>
            <SaveIcon
              fontSize="small"
              sx={{ color: "#d6d6d6", cursor: "pointer" }}
              onClick={saveFile}
            />
          </Grid>
          <Grid item>
            <CodeEditor onChange={onChange} selectedNode={selectedNode} />
            {/* <CodeMirror
              value={selectedNode.content}
              height="200px"
              theme="dark"
              extensions={[javascript({ jsx: true })]}
              onChange={onChange}
            /> */}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Editor;
