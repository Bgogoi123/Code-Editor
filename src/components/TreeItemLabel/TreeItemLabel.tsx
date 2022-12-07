import { useContext } from "react";
import { DirectoryContext } from "../../context/DirectoryContext";
import { TreeItemLabelProps } from "../../interfaces";
import { fileIcon, folderIcon, treeLabelRoot } from "./styles";

const TreeItemLabel = ({
  currentTarget,
  displayControls,
  handleFolderDialogOpen,
  handleFileDialogOpen,
  nodes,
  removeNode,
}: TreeItemLabelProps) => {
  const { data, setData } = useContext(DirectoryContext);

  return (
    <div style={treeLabelRoot}>
      {nodes?.name}
      {displayControls && nodes?.id === currentTarget && (
        <div style={{ display: "flex", alignItems: "center" }}>
          {nodes?.isFolder && (
            <>
              <svg
                style={folderIcon}
                width="17px"
                height="17px"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={(e: any) => {
                  // open folder input
                  handleFolderDialogOpen();
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
                style={fileIcon}
                width="15px"
                height="15px"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={(e: any) => {
                  // open file input
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
          {nodes?.name === "home" ? (
            <></>
          ) : (
            <svg
              style={fileIcon}
              width="15px"
              height="15px"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={(e: any) => {
                //delete a node
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
          )}
        </div>
      )}
    </div>
  );
};

export default TreeItemLabel;
