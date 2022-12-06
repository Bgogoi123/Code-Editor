import TreeItem from "@mui/lab/TreeItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import uuid from "react-uuid";
import { RenderTree } from "../../interfaces/index";
import FolderStructure from "../../components/FolderStructure";
import TreeItemLabel from "../../components/TreeItemLabel";
import { useContext, useState } from "react";
import { SelectedNodeContext } from "../../context/SelectedNodeContext";
import { appendChildToNode } from "./operations";
import { DirectoryContext } from "../../context/DirectoryContext";

export default function Directories() {
  const [displayControls, setDisplayControls] = useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<number>(0);
  const [directoryName, setDirectoryName] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);

  const { setSelectedNode } = useContext(SelectedNodeContext);
  const { data, setData } = useContext(DirectoryContext);

  const handleFolderDialogOpen = () => {
    setOpen(true);
  };

  const handleCreateDirectory = () => {
    if (directoryName !== "") {
      setData(
        appendChildToNode(data, currentTarget, {
          id: uuid(),
          name: directoryName,
          isFolder: true,
          children: [],
        })
      );
      setDirectoryName("");
    }
    setOpen(false);
  };

  const handleCloseDirectoryModal = () => {
    setOpen(false);
  };

  const handleFileDialogOpen = () => {
    setFileDialogOpen(true);
  };

  const handleFileDialogClose = () => {
    setFileDialogOpen(false);
  };

  const handleFileCreate = () => {
    if (fileName !== "") {
      setData(
        appendChildToNode(data, currentTarget, {
          id: uuid(),
          name: fileName,
          content: "/* type your javascript code here */",
          isFolder: false,
          children: [],
        })
      );
      setFileName("");
    }
    setFileDialogOpen(false);
  };

  const handleDirectoryFieldChange = (e: any) => {
    setDirectoryName(e.target.value);
  };

  const handleFileFieldChange = (e: any) => {
    setFileName(e.target.value);
  };

  const removeById = (arr: any, targetId: any) =>
    arr.reduce(
      (acc: any, obj: any) =>
        obj.id === targetId
          ? acc
          : [
              ...acc,
              {
                ...obj,
                ...(obj.children && {
                  children: removeById(obj.children, targetId),
                }),
              },
            ],
      []
    );

  function removeNode(node: any, nodeId: any) {
    const arr = [node];
    const result = removeById(arr, nodeId);
    return result[0];
  }

  const handleSelectNode = (node: RenderTree) => {
    if (!node.isFolder) {
      setSelectedNode(node);
    }
  };

  const renderTree = (nodes: RenderTree) => (
    <TreeItem
      onClick={() => handleSelectNode(nodes)}
      onMouseOver={(e: any) => {
        setCurrentTarget(nodes?.id);
        setDisplayControls(true);
        e.preventDefault();
        e.stopPropagation();
      }}
      onMouseLeave={(e: any) => {
        setDisplayControls(false);
        e.preventDefault();
        e.stopPropagation();
      }}
      key={nodes?.id}
      nodeId={`${nodes?.id}`}
      label={
        <TreeItemLabel
          currentTarget={currentTarget}
          displayControls={displayControls}
          handleFolderDialogOpen={handleFolderDialogOpen}
          handleFileDialogOpen={handleFileDialogOpen}
          nodes={nodes}
          removeNode={removeNode}
        />
      }
    >
      {Array.isArray(nodes?.children)
        ? nodes?.children?.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <div>
      <Dialog open={open} onClose={handleCloseDirectoryModal}>
        <DialogContent>
          <DialogContentText>Enter directory name</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleDirectoryFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDirectoryModal}>Cancel</Button>
          <Button onClick={handleCreateDirectory}>Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={fileDialogOpen} onClose={handleFileDialogClose}>
        <DialogContent>
          <DialogContentText>Enter file name</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleFileFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFileDialogClose}>Cancel</Button>
          <Button onClick={handleFileCreate}>Create</Button>
        </DialogActions>
      </Dialog>
      <FolderStructure
        // data={data}
        renderTree={renderTree}
      />
    </div>
  );
}
