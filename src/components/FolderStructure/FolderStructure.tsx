import TreeView from "@mui/lab/TreeView";
import { FolderStructureProps } from "../../interfaces";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { treeView } from "./styles";
import { DirectoryContext } from "../../context/DirectoryContext";
import { useContext } from "react";

const FolderStructure: React.FC<FolderStructureProps> = ({
  renderTree,
}) => {
  const { data } = useContext(DirectoryContext);

  return (
    <div>
      <TreeView
        style={{ overflowX: "hidden" }}
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={treeView}
      >
        {renderTree(data)}
      </TreeView>
    </div>
  );
};

export default FolderStructure;
