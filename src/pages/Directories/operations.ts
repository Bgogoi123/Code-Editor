import { RenderTree } from "../../interfaces";
import { acceptedFilesRegex } from "../utils/regex";

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
  setWarningOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const extension: string = fileName.split(".")[1];

  if (acceptedFilesRegex.test(extension)) {
    return true;
  } else {
    setErrorMessage("Only Javascript (.js or .jsx) files are accepted!");
    setWarningOpen(true);
    setTimeout(() => {
      setErrorMessage("");
      setWarningOpen(false);
    }, 3000);
    return false;
  }
};


// check is a file already exist in the current directory:
// export const checkFileDuplicacy = (
//   currentTarget: number,
//   fileName: string,
//   data: RenderTree,
//   setErrorMessage: (value: React.SetStateAction<string>) => void
// ) => {
//   const errMessage: string = "* File already exist! *";
//   let status: boolean = true;
//   console.log("setting true 1");

//   console.log({ currentTarget });

//   if (data === undefined) {
//     console.log("node is undefined");
//     status = true;
//     console.log("setting true 2");
//   }
//   if (data.id === currentTarget) {
//     console.log("data.id is equal to currentTarget");
//     if (data.name === fileName) {
//       duplicacyMessage(errMessage, setErrorMessage);
//       status = false;
//       console.log("setting false1");
//     } else {


//       // console.log("mapping children /// targetiD: ", currentTarget);
//       // data.children?.forEach((value: RenderTree) => {
//       //   if (value.name === fileName) {
//       //     duplicacyMessage(errMessage, setErrorMessage);
//       //     status = false;
//       //     console.log("setting false 2");
//       //   } else {
//       //     checkFileDuplicacy(value.id, fileName, value, setErrorMessage);
//       //   }
//       // });
//     }
//   } else {
//     data.children?.forEach((value: RenderTree) => {
//       if (value.name === fileName) {
//         duplicacyMessage(errMessage, setErrorMessage);
//         status = false;
//         console.log("setting false else");
//       } else {
//         checkFileDuplicacy(value.id, fileName, value, setErrorMessage);
//       }
//     });
//   }
//   console.log({ status });
//   return status;
// };

// set error message for duplicate file names:
// const duplicacyMessage = (
//   message: string,
//   setErrorMessage: (value: React.SetStateAction<string>) => void
// ) => {
//   setErrorMessage(message);
//   setTimeout(() => {
//     setErrorMessage("");
//   }, 3000);
// };
