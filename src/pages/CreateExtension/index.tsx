import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Tooltip } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { useContext, useEffect, useState } from "react";
import PopOver from "../../components/PopOver";
import { functionRegex } from "../../constants/regex";
import { CheckExtensionContext } from "../../context/CheckExtensionContext";
import { ExtensionListContext } from "../../context/ExtensionListContext";

const CreateExtension = () => {
  const { extensionId } = useContext(CheckExtensionContext);
  const { extensionArray, setExtensionArray } =
    useContext(ExtensionListContext);

  const [scriptContent, setScriptContent] = useState<string>("");
  const [popOverState, setPopOverState] = useState<{
    open: boolean;
    message: string;
    type: string;
  }>({
    open: false,
    message: "",
    type: "",
  });

  const extensionIndex = extensionArray.findIndex((extensionData) => {
    return extensionData.id === extensionId;
  });

  useEffect(() => {
    if (extensionArray.length > 0) {
      setScriptContent(extensionArray[extensionIndex].content);
    }
    // eslint-disable-next-line
  }, [extensionId]);

  const placeholder = `/* Configure your Extension here [doesn't accept Arrow Functions] */`;

  const handleChange = (event: string) => {
    setScriptContent(event);
  };

  const handleClosePopOver = () => {
    setPopOverState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const execute = () => {
    if (scriptContent !== "" && functionRegex.test(scriptContent)) {
      eval(scriptContent);
    } else {
      setPopOverState({
        open: true,
        message: "Please enter javascript functions only!",
        type: "error",
      });
      setTimeout(() => {
        setPopOverState((prev) => ({
          ...prev,
          open: false,
        }));
      }, 2000);
    }
  };

  const saveExtension = () => {
    // save extension:
    if (scriptContent !== "" && extensionId !== "") {
      const tempArray = extensionArray;
      tempArray[extensionIndex].content = scriptContent;
      setExtensionArray(tempArray);
      window.localStorage.setItem("extensions", JSON.stringify(extensionArray));
    }

    function toUpperExtension(text: string) {
      text.toUpperCase();
    }

    function trimExtension(text: string) {
      text.trim();
    }

    function evaluateExtension(content: string) {
      // eslint-disable-next-line no-eval
      eval(content);
    }

    const myExtensions = [toUpperExtension, trimExtension, evaluateExtension];
    const input: string = ` console.log("TEST: Running the extension..");    `;

    myExtensions.forEach((fn) => fn(input));
  };

  return (
    <div>
      <PopOver
        open={popOverState.open}
        message={popOverState.message}
        handleClose={handleClosePopOver}
        type={popOverState.type}
        position={{
          vertical: "top",
          horizontal: "right",
        }}
      />

      <Tooltip title="Save Extension">
        <SaveRoundedIcon
          onClick={saveExtension}
          fontSize="small"
          sx={{ color: "#fff", cursor: "pointer" }}
        />
      </Tooltip>
      <Tooltip title="Run Extension">
        <PlayCircleIcon
          onClick={execute}
          fontSize="small"
          sx={{ color: "#fff", cursor: "pointer" }}
        />
      </Tooltip>

      <CodeMirror
        height="550px"
        theme="dark"
        placeholder={placeholder}
        value={scriptContent}
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
};

export default CreateExtension;
