import React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Link, Typography } from '@mui/material';

import Button from '@mui/material/Button';

import { Theme, useTheme } from '@mui/material/styles';
import { withStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    body: {
        fontFamily: 'Nunito',
        height: '100vh',
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
const PrivacyDialog: React.FC<Props> = ({ openDialog, onClose }) => {
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
                            <b>PRIVACY POLICY</b>
                        </Typography>
                        Thank you for visiting our website. This privacy policy explains how
                        we utilize personal information gathered on this website. Please
                        read these privacy policies carefully before using the site or
                        providing any personal information. By using the site, you agree to
                        the policies mentioned in this privacy statement.
                        <br />{' '}
                        <Typography className={classes.title} variant='h6'>
                            Information Collection
                        </Typography>
                        <br /> We gather personally identifiable information, such as names,
                        phone numbers, email addresses, and so on, when visitors voluntarily
                        submit it to us. <br />
                        Information about your visits to the website and the services you
                        use. <br />{' '}
                        <Typography className={classes.title} variant='h6'>
                            Usage of Information
                        </Typography>
                        <br /> If you are a registered user of (website link) and have
                        supplied your email address, we will collect your email address and
                        the contents of your message. We will use your email address and the
                        information included in your message <br />
                        (1) To respond to you. <br />
                        (2) To solicit your feedback. <br />
                        (3) To optimize the users&apos; experience by customizing our web page.
                        <br />
                        (4) To notify you about updates, services, special events, or
                        activities conducted by ISTE SC NIT BHOPAL
                        <br />{' '}
                        <Typography className={classes.title} variant='h6'>
                            Information Dissemination
                        </Typography>
                        <br /> ISTE exposes personally identifiable information only to
                        those of its members and associated organizations that require that
                        information to process on ISTE&apos;s behalf or to provide services
                        accessible on ChimeraX&apos;s website.
                        <br />{' '}
                        <Typography className={classes.title} variant='h6'>
                            External sites can access the following information
                        </Typography>
                        <br />
                        Our website contains connections to third-party websites, such as
                        payment gateways, as well as links to our various sponsors&apos;
                        websites. While we have no control over their practices, we only
                        collaborate with firms that follow a comparable privacy policy.
                        <br />{' '}
                        <Typography className={classes.title} variant='h6'>
                            Changes to This Privacy Policy
                        </Typography>
                        <br /> Although most modifications are likely to be minor, ISTE
                        reserves the right to alter its Privacy Policy at any time and at
                        its sole discretion. ISTE urges visitors to review this page often
                        for changes to its Privacy Policy. Your continued use of this site
                        following any changes to this Privacy Policy constitutes your
                        acceptance of such changes.
                        <br />{' '}
                        <Typography className={classes.title} variant='h6'>
                            Security
                        </Typography>
                        <br />
                        We value your trust in providing us your Personal Information, but
                        remember that no method of transmission over the Internet, or method
                        of electronic storage is 100% secure. While we strive to use
                        commercially acceptable means to protect your Personal Information,
                        we cannot guarantee its absolute security. <br />{' '}
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
export default PrivacyDialog;