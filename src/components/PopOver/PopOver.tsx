import { Popover, Typography } from "@mui/material";
import { PopOverProps } from "../../interfaces";
import { error, success, warning } from "./styles";

const PopOver = ({
  open,
  message,
  handleClose,
  type,
  position,
}: PopOverProps) => {
  const checkMessageType = () => {
    if (type === "warning") {
      return warning;
    } else if (type === "error") {
      return error;
    } else {
      return success;
    }
  };

  return (
    <Popover
      id={"popover"}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: position.vertical,
        horizontal: position.horizontal,
      }}
    >
      <Typography sx={() => checkMessageType()}>{message}</Typography>
    </Popover>
  );
};

export default PopOver;
