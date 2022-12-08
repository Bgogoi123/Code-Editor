import { Popover, Typography } from "@mui/material";
import { PopOverProps } from "../../interfaces";

const PopOver = ({ open, message, handleClose }: PopOverProps) => {
  return (
    <Popover
      id={"popover"}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Typography sx={{ p: 2, backgroundColor: "#bd022d", color: "#fff" }}>
        {message}
      </Typography>
    </Popover>
  );
};

export default PopOver;
