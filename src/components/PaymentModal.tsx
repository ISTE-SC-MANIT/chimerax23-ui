import React from 'react';
import Image from 'next/image';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modalroot: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '30%',
            height: '70vh',
            zIndex: '1000',
            position: 'fixed',
            top: '50%',
            left: '20%',
            backgroundColor: 'white'
        },
        payementQR: {
            width: '100px',
            height: '100px',
        },

        spanText: {
            textAlign: 'center',
        }
    })
);

interface Props {
    onClick: () => void,
}

const PaymentModal: React.FC<Props> = ({ onClick }) => {
    const classes = useStyles();
    return <>
        <Box className={classes.modalroot}>
            <Box>
                <Image
                    src='/NewUI/paymentQR.jpeg'
                    alt='logo'
                    width="200px"
                    height="200px"
                />
            </Box>
            <span className={classes.spanText}>
                Please scan the QR and pay. We will approve your payment and reach out soon.
                Enter you email and team name in remarks
            </span>
            <button onClick={()=>{
                console.log('hi');
            }}>Close</button>
        </Box>
    </>
}

export default PaymentModal;