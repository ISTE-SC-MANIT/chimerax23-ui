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
							<b>PRICE DETAILS</b>
						</Typography>
						<br /> This website is operated by the{' '}
						<b>
							Indian Society for Technical Education Students’ Chapter MANIT
							(ISTE SC MANIT)
						</b>
						<br />
						<b>The Price of each workshop is 500 Rs. per participant.</b>
						<br /> Questions about the Price Details should be sent to us at{' '}
						<Link className={classes.link}>istescmanit@gmail.com</Link>
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
