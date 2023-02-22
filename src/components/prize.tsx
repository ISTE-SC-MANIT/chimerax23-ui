import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import { makeStyles, createStyles } from '@mui/styles'
import { Theme } from '@mui/material/styles'


const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        root: {
            minHeight: '100vh',
            backgroundColor: theme.palette.mode === 'light' ? '#ECF0F6' : '#0A1929',
            padding: theme.spacing(3),
        },
        card: {
            padding: '40px',
            backgroundColor: theme.palette.mode === 'light' ? 'white' : '#0A1929',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: theme.spacing(3),
        },
        money: {
            marginRight: '10px',
            marginTop: '20px',
            fontWeight: 'bold'
        },
        cardContainer: {
            width: '90%',
        }
    })
));
const Prize = () => {
    const classes = useStyles();
    const [spread1, setSpread1] = React.useState(4);
    const [spread2, setSpread2] = React.useState(4);
    const [spread3, setSpread3] = React.useState(4);
    return (
        <>
            <Grid className={classes.root} container alignItems='center' justifyContent='center'>
                <Typography variant="h3">PRIZES</Typography>
                <Grid container justifyContent="space-around" className={classes.cardContainer}>
                    <Paper elevation={spread1} onMouseOver={() => setSpread1(spread1 + 9)}
                        onMouseOut={() => setSpread1(spread1 - 9)}
                        className={classes.card}>
                        <Image
                            src='/first prize.svg'
                            alt='logo'
                            width='200px'
                            height='200px'
                        />
                        <Typography variant="h4" className={classes.money}>₹ 15000</Typography>
                    </Paper>
                    <Paper elevation={spread2} className={classes.card}
                        onMouseOver={() => setSpread2(spread2 + 9)}
                        onMouseOut={() => setSpread2(spread2 - 9)}>
                        <Image
                            src='/second prize.svg'
                            alt='logo'
                            width='200px'
                            height='200px'
                        />
                        <Typography variant="h4" className={classes.money}>₹ 10000</Typography>
                    </Paper>
                    <Paper className={classes.card}
                        elevation={spread3}
                        onMouseOver={() => setSpread3(spread3 + 9)}
                        onMouseOut={() => setSpread3(spread3 - 9)}>
                        <Image
                            src='/third prize.svg'
                            alt='logo'
                            width='200px'
                            height='200px'
                        />
                        <Typography variant="h4" className={classes.money}>₹ 5000</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default Prize;