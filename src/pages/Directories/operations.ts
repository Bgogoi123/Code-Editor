export const appendChildToNode = (node: any, nodeId: any, data: any) => {
  // If the node is empty, just return it as is.
  if (node === undefined) {
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
};
