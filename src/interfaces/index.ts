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
