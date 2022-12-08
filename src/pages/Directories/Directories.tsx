import TreeItem from "@mui/lab/TreeItem";
import uuid from "react-uuid";
import { RenderTree } from "../../interfaces/index";
import FolderStructure from "../../components/FolderStructure";
import TreeItemLabel from "../../components/TreeItemLabel";
import { useContext, useEffect, useState } from "react";
import { SelectedNodeContext } from "../../context/SelectedNodeContext";
import { appendChildToNode, checkFileType } from "./operations";
import { DirectoryContext } from "../../context/DirectoryContext";
import Dialogues from "../../components/Dialogues";
import PopOver from "../../components/PopOver";

const Directories = () => {
  const [displayControls, setDisplayControls] = useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = useState<number>(0);
  const [directoryName, setDirectoryName] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [warningOpen, setWarningOpen] = useState<boolean>(false);
  const [fileDialogOpen, setFileDialogOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { setSelectedNode } = useContext(SelectedNodeContext);
  const { data, setData } = useContext(DirectoryContext);

  useEffect(() => {
    const folderStructureData: any =
      window.localStorage.getItem("folderStructure");

    if (folderStructureData !== null) {
      setData(JSON.parse(folderStructureData));
    } else {
      setData({
        id: 1,
        name: "home",
        isFolder: true,
        children: [],
      });
    }
  }, []);

  useEffect(() => {
    if (data.children?.length === 0) return;
    window.localStorage.setItem("folderStructure", JSON.stringify(data));
  }, [data]);

  const handleCloseWarning = () => {
    setWarningOpen(false);
  };

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
    const checkType: boolean = checkFileType(
      fileName,
      setErrorMessage,
      setWarningOpen
    );

    if (fileName !== "" && checkType) {
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
    <>
      <TreeItem
        onClick={() => handleSelectNode(nodes)}
        onMouseOver={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
          setCurrentTarget(nodes?.id);
          setDisplayControls(true);
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
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
    </>
  );

  return (
    <div>
      <Dialogues
        open={open}
        handleChangeDialogue={handleDirectoryFieldChange}
        handleCloseDialogue={handleCloseDirectoryModal}
        handleCreateNode={handleCreateDirectory}
      />

      <Dialogues
        open={fileDialogOpen}
        handleChangeDialogue={handleFileFieldChange}
        handleCloseDialogue={handleFileDialogClose}
        handleCreateNode={handleFileCreate}
      />

      <PopOver
        open={warningOpen}
        message={errorMessage}
        handleClose={handleCloseWarning}
      />

      <FolderStructure renderTree={renderTree} />
    </div>
  );
};

export default Directories;
