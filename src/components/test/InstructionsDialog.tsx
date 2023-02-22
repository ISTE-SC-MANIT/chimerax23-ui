import React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ComponentProps } from '../../pages/_app';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Instructions from './instructions';

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    height: '100vh',
    textAlign: 'justify',
  },

  title: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  link: {
    cursor: 'pointer',
  },
}));
interface Props extends ComponentProps {
  openDialog: boolean;
  onClose: () => void;
}
const InstructionsDialog: React.FC<Props> = ({ viewer, setSuccessMessage, setErrorMessage, refetch, openDialog, onClose }) => {
  const classes = useStyles();
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setScroll(scrollType);
  };

  const handleClose = () => {
    onClose();
  };

  //const descriptionElementRef = React.useRef<HTMLElement>(null);

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Instructions</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText className={classes.body}>
            <Instructions
              page="dialog"
              viewer={viewer}
              setSuccessMessage={setSuccessMessage}
              refetch={refetch}
              setErrorMessage={setErrorMessage}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default InstructionsDialog;
