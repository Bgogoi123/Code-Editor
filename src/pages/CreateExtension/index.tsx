import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CodeMirror from "@uiw/react-codemirror";
import { Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { ExtensionsContext } from "../../context/ExtensionsContext";
import uuid from "react-uuid";
import { functionRegex } from "../../constants/regex";
import PopOver from "../../components/PopOver";

const CreateExtension = () => {
  const [scriptContent, setScriptContent] = useState<string>("");
  const { setExtension, extension } = useContext(ExtensionsContext);
  const [popOverState, setPopOverState] = useState<{
    open: boolean;
    message: string;
    type: string;
  }>({
    open: false,
    message: "",
    type: "",
  });

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
    let output;

    function toUpperExtension(text: string) {
      text.toUpperCase();
      console.log("upper case: ", text.toUpperCase());
      output = text.toUpperCase();
    }

    function trimExtension(text: string) {
      text.trim();
      console.log("trimmimg: ", text.trim());
      output = text.trim();
    }

    function evaluateExtension(content: string) {
      eval(content);
    }

    const myExtensions = [toUpperExtension, trimExtension, evaluateExtension];
    const input: string = ` console.log("bello");    `;

    myExtensions.forEach((fn) => fn(input));

    // if (scriptContent !== "") {
    //   setExtension({
    //     id: uuid(),
    //     name: "someName",
    //     content: scriptContent,
    //   });
    //   window.localStorage.setItem("extensions", JSON.stringify(extension));
    // }
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
