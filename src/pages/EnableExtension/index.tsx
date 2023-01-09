import {
  FormControl,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { useContext, useState } from "react";
import uuid from "react-uuid";
import { CustomSelect } from "../../components/CustomSelect";
import Dialogues from "../../components/Dialogues";
import { CheckExtensionContext } from "../../context/CheckExtensionContext";
import { ExtensionListContext } from "../../context/ExtensionListContext";

const EnableExtension = () => {
  const { extensionArray, setExtensionArray } =
    useContext(ExtensionListContext);

  const [extensionName, setExtensionName] = useState<string>("");

  const [openDialogue, setOpenDialogue] = useState<boolean>(false);
  const handleOnclick = () => {
    setOpenDialogue(true);
  };

  const handleChangeDialogue = (e: any) => {
    setExtensionName(e.target.value);
  };

  const handleCreateExtension = () => {
    const tempArray = extensionArray;
    tempArray.push({
      id: uuid(),
      name: extensionName,
      content: "",
    });
    console.log({ tempArray });
    setExtensionArray(tempArray);
    window.localStorage.setItem("extensions", JSON.stringify(extensionArray));
    setOpenDialogue(false);
  };

  return (
    <>
      <FormControl sx={{ margin: "0.5em", width: "150px" }}>
        <CustomSelect
          displayEmpty
          variant="standard"
          input={<OutlinedInput />}
          sx={{ height: "25px", color: "#fff" }}
        >
          <MenuItem value={"true"} onClick={() => handleOnclick()}>
            Create Extension
          </MenuItem>
        </CustomSelect>
      </FormControl>
      <Dialogues
        type={"Extension"}
        open={openDialogue}
        handleCloseDialogue={() => setOpenDialogue(false)}
        handleChangeDialogue={handleChangeDialogue}
        handleCreateNode={handleCreateExtension}
      />
    </>
  );
};

export default EnableExtension;
