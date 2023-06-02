import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Dialog({ title, onClose, children, onStart, open }) {
  return (
    <MuiDialog onClose={onClose} open={open}>
      <DialogTitle>
        {title}
        {onClose ? (
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onStart}>
          시작
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}

export default Dialog;
