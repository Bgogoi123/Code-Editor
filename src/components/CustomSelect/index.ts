import styled from "@emotion/styled";
import { Select } from "@mui/material";

export const CustomSelect = styled(Select)(() => ({
  width: 150,
  "&.MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
}));
