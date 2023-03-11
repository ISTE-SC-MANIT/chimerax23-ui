import React from 'react';
import { useMediaQuery } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { withStyles, makeStyles } from '@mui/styles';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
const useStyles = makeStyles((theme: Theme) => ({
	abb: {
		backgroundColor: theme.palette.mode === 'light' ? '#ebf2f2' : '#0e1111',
		// padding: theme.spacing(6),
		paddingLeft: '4rem',
		[theme.breakpoints.down('md')]: {
			paddingLeft: '0rem',
		},
		backgroundImage: 'none',
	},
	root: {
		minHeight: '100vh',
		backgroundColor: theme.palette.mode === 'light' ? '#ebf2f2' : '#0e1111',
		padding: theme.spacing(3),
	},
	container: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		textAlign: 'center',
		backgroundColor: theme.palette.mode === 'light' ? '#ebf2f2' : '#0e1111',
		// width: '93%',
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: theme.spacing(5),
		[theme.breakpoints.down('md')]: {
			width: '96%',
			flexDirection: 'column',
			paddingTop: '0',
		},
		[theme.breakpoints.down('sm')]: {
			padding: '10px',
			margin: '0',
			width: '100%',
		},
	},

	aboutContent: {
		textAlign: 'justify',
		fontSize: '20px',
		fontWeight: '300',
		width: '80%',
		letterSpacing: '1px',
		padding: '0 60px',
		[theme.breakpoints.down('md')]: {
			fontSize: '15px',
			padding: '20px 5px',
			width: '100%',
			letterSpacing: '0.3px',
		},
	},

	heading: {
		fontWeight: '200',
		fontSize: '60px',
		[theme.breakpoints.down('md')]: {
			fontSize: '30px',
		},
	},
}));

export const About = () => {
	const classes = useStyles();
	const AboutImage = () => {
		const theme = useTheme();
		return (
			<Box>
				<Image src='/aboutImage.jpg' alt='logo' width={980} height={500} />
			</Box>
		);
	};

	return (
		<>
			<Paper className={classes.abb}>
				<Grid>
					<Grid container alignItems='center' justifyContent='center'>
						<Box
							display='flex'
							flexDirection='column'
							textAlign='center'
							margin={3}
						>
							<Typography variant='h3'>ABOUT</Typography>
						</Box>
					</Grid>
					<Grid container alignItems='center' justifyContent='center'>
						<Box>
							<Paper className={classes.container} elevation={0}>
								<AboutImage />
								<h4 className={classes.aboutContent}>
									Chimera X is the flagship event under the annual
									students&apos; conclave Chimera, with an exclusive reach in
									over 30 cities that we intend on magnifying further. Due to
									the unparalleled level of the event, it has an established
									legacy of 18 years. It is a national-level quizzing contest
									providing an incredible opportunity to imbibe and showcase
									knowledge. Over 5000 students from all over the nation work
									stringently for 30 days and compete with others in 3 stages of
									the quiz to be the crown-holders. The event had an enormous
									cash prize of 30,000 coupled with exhilarating goodies. The
									zealous participation of students integrated with the
									persistent efforts of the team to leave no stone unturned has
									made the event a grand one.
								</h4>
							</Paper>
						</Box>
					</Grid>
				</Grid>
			</Paper>
		</>
	);
};
