export interface RenderTree {
  parentId?: string;
  id: number;
  name: string;
  isFolder: boolean;
  content?: string;
  children?: readonly RenderTree[];
}

export interface FolderStructureProps {
  renderTree: (nodes: RenderTree) => JSX.Element;
  message: string;
}

export interface TreeItemLabelProps {
  nodes: RenderTree;
  displayControls: boolean;
  currentTarget: number;
  handleFolderDialogOpen: () => void;
  handleFileDialogOpen: () => void;
  removeNode(node: any, nodeId: any): any;
}

export interface CodeMirrorProps {
  selectedNode: RenderTree;
  onChange: (value: string) => void;
}

export interface RenderTreeItemProps {
  // nodes: RenderTree;
  handleSelectNode: (node: RenderTree) => void;
  setCurrentTarget: (value: React.SetStateAction<number>) => void;
  setDisplayControls: (value: React.SetStateAction<boolean>) => void;
  currentTarget: number;
  displayControls: boolean;
  handleFolderDialogOpen: () => void;
  handleFileDialogOpen: () => void;
  removeNode(node: any, nodeId: any): any;
}
