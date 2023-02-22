import { Box, ButtonBase, Card, CardContent, CardMedia, Grid, Paper, Typography, Button, Link } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { Theme } from '@mui/material/styles'
import Image from 'next/image';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '20vh',
            justifyContent: 'center',
            backgroundColor: theme.palette.mode === 'light' ? '#ECF0F6' : '#0A1929',
        },
        heading: {
            marginBottom: '50px',
            fontWeight: "200",
            fontSize: '48px',
            [theme.breakpoints.down('md')]: {
                marginBottom: '30px',
                marginTop: '50px',
                fontSize: '40px'
            }
        },
        cardGroup: {
            width: '70%',
        },
        card: {
            height: '130px',
            width: '160px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '30px',
        },

        Transform: {
            transform: `Scale(1.1)`
        }
    })
)


const sponsorDetails = [
    {
        imageUrl: '/UnschoolLogo.png',
        url: 'https://www.unschool.in/',
        width: '200px',
        height: '120px',
    },
    {
        imageUrl: '/ELearnmarket Logo (2).png',
        url: 'http://elearnmarkets.com/',
        width: '140px',
        height: '50px',
    },
    {
        imageUrl: '/MentorX.png',
        url: 'https://thementorx.com/',
        width: '150px',
        height: '130px',
    },
    {
        imageUrl: '/hoverRobotix.png',
        url: 'https://hoverrobotix.com/',
        width: '150px',
        height: '130px',
    }
    ,
    {
        imageUrl: '/bull.svg',
        url: 'http://sponsorbull.com/',
        width: '160px',
        height: '130px',
    },
    {
        imageUrl: '/teacoin_1.png',
        url: '',
        width: '150px',
        height: '150px',
    },
    {
        imageUrl: '/tp-nb.png',
        url: 'https://www.enavabharat.com/',
        width: '160px',
        height: '40px',
    }

]


const Sponsors = () => {
    const classes = useStyles();
    const [keyIndex, setKey] = useState<number>(100);
    return (
        <>
            <Box className={classes.root}>
                <Typography variant="h3" className={classes.heading}>SPONSORS</Typography>
                <Grid container justifyContent='space-around' alignItems='center' className={classes.cardGroup}>
                    {
                        sponsorDetails.map((sponsor, key) => (
                            <Grid item key={key} className={classes.card}
                                onMouseOver={() => setKey(key)}
                                onMouseOut={() => setKey(100)}>
                                <Link href={sponsor.url} className={key === keyIndex ? classes.Transform : ''}
                                    target='_blank'>
                                    <Image
                                        src={sponsor.imageUrl}
                                        width={sponsor.width}
                                        height={sponsor.height}
                                        alt='logo'
                                    />
                                </Link>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </>
    )
}

export default Sponsors;
