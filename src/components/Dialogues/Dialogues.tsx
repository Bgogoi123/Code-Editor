import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { DialoguesProps } from "../../interfaces";

const Dialogues = ({
  open,
  handleCloseDialogue,
  handleChangeDialogue,
  handleCreateNode,
}: DialoguesProps) => {
  return (
    <Dialog open={open} onClose={handleCloseDialogue}>
      <DialogContent>
        <DialogContentText>Enter directory name</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChangeDialogue}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialogue}>Cancel</Button>
        <Button onClick={handleCreateNode}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Dialogues;
