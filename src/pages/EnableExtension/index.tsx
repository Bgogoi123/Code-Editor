import {
  FormControl,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { useContext } from "react";
import { CustomSelect } from "../../components/CustomSelect";
import { CheckExtensionContext } from "../../context/CheckExtensionContext";

const EnableExtension = () => {
  const { setIsExtension } = useContext(CheckExtensionContext);

  return (
    <FormControl sx={{ margin: "0.5em", width: "150px" }}>
      <CustomSelect
        displayEmpty
        variant="standard"
        input={<OutlinedInput />}
        sx={{ height: "25px", color: "#fff" }}
      >
        <MenuItem value={"true"} onClick={() => setIsExtension(true)}>
          Create Extension
        </MenuItem>
      </CustomSelect>
    </FormControl>
  );
};

export default EnableExtension;
