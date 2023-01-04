// import { acceptedFilesRegex } from "../utils/regex";
import { fileExtensionAtom } from "../../recoil/atom";

// create a new file / folder:
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

// Check the type of file being created:
export const checkFileType = (
  fileName: string,
  setErrorMessage: (value: React.SetStateAction<string>) => void,
  setWarningOpen: React.Dispatch<React.SetStateAction<boolean>>,
  selectedLanguage: string,
  fileExtensionData:
    | {
        c: string;
        cpp: string;
        css: string;
        dart: string;
        html: string;
        java: string;
        javascript: string;
        json: string;
        jsx: string;
        kotlin: string;
        markdown: string;
        python: string;
        sass: string;
        tsx: string;
        typescript: string;
      }
    | any
) => {
  const splitLength = fileName.split(".").length;
  const fileExtension: string = fileName.split(".")[splitLength - 1];
  
  if (fileExtension === fileExtensionData[selectedLanguage]) {
    return true;
  } else {
    setErrorMessage(
      `Only ${fileExtensionData[selectedLanguage]} files are accepted!`
    );
    setWarningOpen(true);
    setTimeout(() => {
      setErrorMessage("");
      setWarningOpen(false);
    }, 2000);
    return false;
  }
};
