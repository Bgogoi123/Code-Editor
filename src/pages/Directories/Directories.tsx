import TreeItem from "@mui/lab/TreeItem";
import { useContext, useEffect, useState } from "react";
import uuid from "react-uuid";
import { useRecoilValue } from "recoil";
import Dialogues from "../../components/Dialogues";
import FolderStructure from "../../components/FolderStructure";
import PopOver from "../../components/PopOver";
import TreeItemLabel from "../../components/TreeItemLabel";
import { CheckExtensionContext } from "../../context/CheckExtensionContext";
import { DirectoryContext } from "../../context/DirectoryContext";
import { SelectedNodeContext } from "../../context/SelectedNodeContext";
import { RenderTree } from "../../interfaces/index";
import { fileExtensionAtom, languageAtom } from "../../recoil/atom";
import { appendChildToNode, checkFileType } from "./operations";

const Directories = () => {
  const selectedLanguage = useRecoilValue(languageAtom);
  const fileExtensionData = useRecoilValue(fileExtensionAtom);

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
  const { setIsExtension } = useContext(CheckExtensionContext);

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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data.children?.length === 0) return;
    window.localStorage.setItem("folderStructure", JSON.stringify(data));

    // index DB
    // const request = window.indexedDB.open("folderStructure", 3);
    // request.onerror = (event) => {
    //   console.log({ event });
    // };
    // request.onsuccess = (event: any) => {
    //   console.log({ event });
    //   const db = event.target.result;
    //   console.log({ db: db });
    //   const objectStore = db.createObjectStore("folderStructure", {
    //     keyPath: "ssn",
    //   });
    //   const customerObjectStore = db
    //     .transaction("folderStructure", "readwrite")
    //     .objectStore("folderStructure");
    //   Object.values(data).forEach((customer) => {
    //     customerObjectStore.add(customer);
    //   });
    // };
  }, [data]);

  useEffect(() => {}, [selectedLanguage]);

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
      setWarningOpen,
      selectedLanguage,
      fileExtensionData
    );

    if (fileName !== "" && checkType) {
      setData(
        appendChildToNode(data, currentTarget, {
          id: uuid(),
          name: fileName,
          content: "",
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
    setIsExtension(false);
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
        type="Folder"
        open={open}
        handleChangeDialogue={handleDirectoryFieldChange}
        handleCloseDialogue={handleCloseDirectoryModal}
        handleCreateNode={handleCreateDirectory}
      />

      <Dialogues
        type="File"
        open={fileDialogOpen}
        handleChangeDialogue={handleFileFieldChange}
        handleCloseDialogue={handleFileDialogClose}
        handleCreateNode={handleFileCreate}
      />

      <PopOver
        open={warningOpen}
        message={errorMessage}
        handleClose={handleCloseWarning}
        type="error"
        position={{
          vertical: "top",
          horizontal: "left",
        }}
      />

      <FolderStructure renderTree={renderTree} />
    </div>
  );
};

export default Directories;
