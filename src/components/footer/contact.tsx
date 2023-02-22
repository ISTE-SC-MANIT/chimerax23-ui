import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope,
    faMapMarked,
    faMobile,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Grid, Box, Container } from '@mui/material';
import ScrollDialog from './terms';
import PrivacyDialog from './privacy';
import RefundDialog from './refund';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme, useTheme } from '@mui/material/styles';


const useStyles = makeStyles((theme: Theme) =>

    createStyles({
         
        footerPrivacyli: {
            margin: '10px 15px 10px 15px',
        },
        footerPrivacyA: {
            cursor: 'pointer',
            textDecoration: 'none',
            linkStyle: 'none',
            color: theme.palette.mode === 'light' ? 'black' : 'white'
        },
        footerPrivacyUl: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                display: 'block',
            }
        },
        footerPrivacy: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                paddingRight: '50px'
            }
        },
        icon: {
            marginRight: '10px'
        },
        footerRightRoot: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        socialIcon: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        socialIconIn: {
            margin: '15px'
        },
        logo: {
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        footerLeft: {
            paddingRight: '150px',
            [theme.breakpoints.down('md')]: {
                paddingRight: '0'
            },
        },
        address: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60%',
        },
        mail: {
            marginLeft: '25px',
        },
        contact: {
            marginLeft: '25px'
        },
        ankerTag: {
            cursor: 'pointer',
            textDecoration: 'none',
            linkStyle: 'none',
            color: theme.palette.mode === 'light' ? 'black' : 'white'
        }
    })

);

const Footer: React.FC = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openPrivacy, setOpenPrivacy] = React.useState(false);
    const [openRefund, setOpenRefund] = React.useState(false);
    const classes = useStyles();
    const theme=useTheme();


    return (
        <footer >
            <ScrollDialog
                openDialog={openDialog}
                onClose={() => setOpenDialog(false)}
            />
            <PrivacyDialog
                openDialog={openPrivacy}
                onClose={() => setOpenPrivacy(false)}
            />
            <RefundDialog
                openDialog={openRefund}
                onClose={() => setOpenRefund(false)}
            />
            <Container maxWidth='lg'>
                <Grid
                    container
                    alignItems='center'
                    justifyContent='center'
                    className='footerSection'
                    spacing={6}
                >
                    <Grid item xs={12} sm={6} md={4} alignItems='center'
                        justifyContent='center' className={classes.footerLeft}>
                        <div className={classes.logo}>
                            <a href='https://istemanit.in/' className={classes.ankerTag}>

                                <Image
                                    src={
                                        theme.palette.mode === 'light'
                                            ? '/iste.svg'
                                            : '/iste-white.svg'
                                    }
                                    width='236px'
                                    height='100%'
                                    alt='logo'
                                />
                            </a>
                        </div>
                        <div className={classes.socialIcon}>
                            <div className={classes.socialIconIn}>
                                <a href='https://www.instagram.com/istemanit' className={classes.ankerTag} >
                                    <FontAwesomeIcon
                                        icon={faInstagram}
                                        className='social-media fa-2x'
                                    />
                                </a>
                            </div>
                            <div className={classes.socialIconIn}>
                                <a href='https://www.facebook.com/ISTESCMANIT' className={classes.ankerTag} >
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        className='social-media fa-2x'
                                    />
                                </a>
                            </div>
                            <div className={classes.socialIconIn}>
                                <a
                                    href='https://www.linkedin.com/company/iste-sc-manit'
                                    className={classes.ankerTag}

                                >
                                    <FontAwesomeIcon
                                        icon={faLinkedin}
                                        className='social-media fa-2x'
                                    />
                                </a>
                            </div>
                            <div className={classes.socialIconIn}>
                                <a href='https://mobile.twitter.com/iste_manit' className={classes.ankerTag}>
                                    <FontAwesomeIcon
                                        icon={faTwitter}
                                        className='social-media fa-2x'
                                    />
                                </a>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} className='footerMiddle' alignItems='center'
                        justifyContent='center'>
                        <div className={classes.address}>
                            <div >
                                <h2 className='footer-heading'>
                                    <span className={classes.icon}>
                                        <i>
                                            <FontAwesomeIcon icon={faMapMarked} />
                                        </i>
                                    </span>
                                    ADDRESS
                                </h2>
                                <p>
                                    <a
                                        href='https://goo.gl/maps/nTNnuX6w5YbGKTic7'
                                        className={classes.ankerTag}
                                    >
                                        Maulana Azad National
                                        <br />
                                        Institute of Technology,
                                        <br /> Bhopal
                                    </a>
                                </p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} className='footerRight' alignItems='center'
                        justifyContent='center'>
                        <div className={classes.footerRightRoot}>
                            <div>
                                <div className={classes.mail} >
                                    <h2 className='footer-heading'>
                                        <span>
                                            <i className={classes.icon}>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </i>
                                        </span>
                                        EMAIL ADDRESS
                                    </h2>
                                    <p>
                                        <a href='mailto:mailto:istescmanit@gmail.com' className={classes.ankerTag}>
                                            istescmanit@gmail.com
                                        </a>
                                    </p>
                                </div>
                                <div className={classes.contact}>
                                    <h2 className='footer-heading'>
                                        <span className={classes.icon}>
                                            <i >
                                                <FontAwesomeIcon icon={faMobile} />
                                            </i>
                                        </span>
                                        CONTACT
                                    </h2>
                                    <p>
                                        <a href='tel://9469470474' className={classes.ankerTag}>
                                            <i aria-hidden='true' className={classes.icon}>
                                                <FontAwesomeIcon icon={faPhone} />
                                            </i>
                                            Tushar Khajuria <br />
                                            +91 9469470474
                                        </a>
                                    </p>
                                    <br />
                                    <p>
                                        <a href='tel://9993654745' className={classes.ankerTag}>
                                            <i aria-hidden='true' className={classes.icon}>
                                                <FontAwesomeIcon icon={faPhone} />
                                            </i>
                                            Ananya Rawat <br />
                                            +91 9993654745
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Box className={classes.footerPrivacy}>
                    <ul className={classes.footerPrivacyUl}>
                        <a onClick={() => setOpenDialog(true)} className={classes.footerPrivacyA}>
                            <li className={classes.footerPrivacyli}>Terms & Conditions</li>
                        </a>
                        <a onClick={() => setOpenRefund(true)} className={classes.footerPrivacyA}>
                            <li className={classes.footerPrivacyli}>Refund Policy</li>
                        </a>
                        <a onClick={() => setOpenPrivacy(true)} className={classes.footerPrivacyA}>
                            <li className={classes.footerPrivacyli}>Privacy Policy</li>
                        </a>
                    </ul>
                </Box>
            </Container>
        </footer>
    );
};
export default Footer;