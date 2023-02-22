import React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Link, Typography } from '@mui/material';

import Button from '@mui/material/Button';

import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    body: {
        fontFamily: 'Nunito',
        height: '80vh',
        textAlign: 'justify',
    },

    title: {
        fontFamily: 'Nunito',
        fontWeight: 600,
        textAlign: 'center',
        marginTop: theme.spacing(2),
    },
    link: {
        cursor: 'pointer',
    },
}));

interface Props {
    openDialog: boolean;
    onClose: () => void;
}
const RefundDialog: React.FC<Props> = ({ openDialog, onClose }) => {
    const classes = useStyles();
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setScroll(scrollType);
    };

    const handleClose = () => {
        onClose();
    };


    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText className={classes.body}>
                        <Typography variant='h6' className={classes.title}>
                            <b>Refund Policy</b>
                        </Typography>
                        <Typography className={classes.title} variant='h6'></Typography>
                        <br /> We deal in online workshops and digital services. Please make
                        sure that you want to learn the skill offered before you purchase
                        the workshop. No refund will be entertained during the workshop.
                        Workshop once commenced will be considered consumed. <br />{' '}
                        <Typography className={classes.title} variant='h6'>
                            Refunds (if applicable)
                        </Typography>
                        <br /> Refund requests will be entertained only if you contact us
                        with a proper reason atleast before 72 hours of workshop.
                        <br />{' '}
                        <Typography className={classes.title} variant='h6'>
                            Exchanges (if applicable)
                        </Typography>
                        <br /> We believe that every workshop of ours is unique and special
                        and thereby exchange of them is discouraged and will only be
                        accepted is you reach out to us before 72 hours of workshop.
                        <br />{' '}
                        <Typography className={classes.title} variant='h6'>
                            Double Purchase
                        </Typography>
                        <br />
                        If in case you have purchased a particular workshop twice, due to
                        any reason, you&apos;ll get 100% refund. You can reach out to us at
                        istescmanit@gmail.com <br /> We keep our pricing very transparent
                        and honest.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default RefundDialog;