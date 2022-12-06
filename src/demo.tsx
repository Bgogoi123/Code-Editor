import * as React from "react";
import TreeItem from "@mui/lab/TreeItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { RenderTree } from "./interfaces";
// import FolderStructure from "./components/FolderStructure";

export default function RichObjectTreeView() {
  const [displayControls, setDisplayControls] = React.useState<boolean>(false);
  const [currentTarget, setCurrentTarget] = React.useState<number>(0);
  const [directoryName, setDirectoryName] = React.useState<string>("");
  const [fileName, setFileName] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [fileDialogOpen, setFileDialogOpen] = React.useState(false);

  const [data, setData] = React.useState<RenderTree>({
    id: 1,
    name: "folder",
    isFolder: true,
    children: [
      // //   {
      // //     id: 3,
      // //     name: "file2",
      // //     isFolder: true,
      // //     children: [
      // //       {
      // //         id: 4,
      // //         name: "file3",
      // //         isFolder: true,
      // //         children: [
      // //           {
      // //             id: 5,
      // //             name: "dir",
      // //             isFolder: true,
      // //             children: [
      // //               {
      // //                 id: 6,
      // //                 name: "testfile",
      // //                 isFolder: false,
      // //                 children: [],
      // //               },
      // //             ],
      // //           },
      // //         ],
      // //       },
      //     ],
      //   },
      //   {
      //     id: 2,
      //     name: "file4",
      //     children: [],
      //   },
    ],
  });

  function appendChildToNode(node: any, nodeId: any, data: any) {
    // If the node is empty, just return it as is.
    if (!node) {
      return node;
    }

    let children;

    if (node.id === nodeId) {
      // If the node has the id we're searching for,
      // append the data to its children.
      children = [...node.children, data];
    } else {
      // Otherwise, apply the function recursively to each of its children
      children = node.children.map((childNode: any) =>
        appendChildToNode(childNode, nodeId, data)
      );
    }

    return { ...node, children };
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(currentTarget);
    setData(
      appendChildToNode(data, currentTarget, {
        id: 10,
        name: directoryName,
        isFolder: true,
        children: [],
      })
    );
    setOpen(false);
  };

  const handleFileDialogOpen = () => {
    setData(
      appendChildToNode(data, currentTarget, {
        id: 10,
        name: fileName,
        isFolder: false,
        children: [],
      })
    );
    setFileDialogOpen(true);
  };

  const handleFileDialogClose = () => {
    setData(
      appendChildToNode(data, currentTarget, {
        id: 10,
        name: directoryName,
        isFolder: true,
        children: [],
      })
    );
    setFileDialogOpen(false);
  };

  const handleDirectoryFieldChange = (e: any) => {
    setDirectoryName(e.target.value);
    console.log("directory name : ", directoryName);
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
    const arr = [data];
    const result = removeById(arr, nodeId);
    console.log("resulting data - ", { result });
    return result[0];
  }

  const renderTree = (nodes: RenderTree) => (
    <TreeItem
      onMouseOver={(e: any) => {
        setCurrentTarget(nodes?.id);
        setDisplayControls(true);
        e.preventDefault();
        e.stopPropagation();
      }}
      onMouseLeave={(e: any) => {
        // setCurrentTarget(0);
        setDisplayControls(false);
        e.preventDefault();
        e.stopPropagation();
      }}
      key={nodes?.id}
      nodeId={`${nodes?.id}`}
      label={
        <div style={{ display: "flex", alignItems: "center" }}>
          {nodes?.name}{" "}
          {displayControls && nodes?.id === currentTarget && (
            <div style={{ display: "flex", alignItems: "center" }}>
              {nodes?.isFolder && (
                <>
                  <svg
                    style={{ paddingLeft: "10px" }}
                    width="17px"
                    height="17px"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    // onClick={(e: any) => {
                    //   console.log("nodes - ", nodes?.parentId, nodes?.id);
                    //   // lookup(data, currentTarget);
                    // setData(
                    //   appendChildToNode(data, nodes?.id, {
                    //     id: 10,
                    //     name: "Parent",
                    //     isFolder: true,
                    //     children: []
                    //   })
                    // );
                    //   e.stopPropagation();
                    // }}
                    onClick={(e: any) => {
                      handleClickOpen();
                      e.stopPropagation();
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>
                  <svg
                    style={{ paddingLeft: "5px" }}
                    width="15px"
                    height="15px"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    // onClick={(e: any) => {
                    //   console.log("nodes - ", nodes?.parentId, nodes?.id);
                    //   // lookup(data, currentTarget);
                    //   setData(
                    //     appendChildToNode(data, nodes?.id, {
                    //       id: 10,
                    //       name: "randomfile",
                    //       isFolder: false,
                    //       children: []
                    //     })
                    //   );
                    //   e.stopPropagation();
                    // }}
                    onClick={(e: any) => {
                      handleFileDialogOpen();
                      e.stopPropagation();
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </>
              )}
              <svg
                style={{ paddingLeft: "5px" }}
                width="15px"
                height="15px"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={(e: any) => {
                  console.log("nodes - ", nodes?.parentId, nodes?.id);
                  // lookup(data, currentTarget);
                  setData(removeNode(data, nodes?.id));
                  e.stopPropagation();
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          )}
        </div>
      }
    >
      {Array.isArray(nodes?.children)
        ? nodes?.children?.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Subscribe</DialogTitle> */}
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={fileDialogOpen} onClose={handleFileDialogClose}>
        {/* <DialogTitle>Subscribe</DialogTitle> */}
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
          <Button onClick={handleFileDialogClose}>Create</Button>
        </DialogActions>
      </Dialog>
      {/* <FolderStructure data={data} renderTree={renderTree} /> */}
    </div>
  );
}
