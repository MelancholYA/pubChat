import {
	Avatar,
	Modal,
	Stack,
	Grid,
	AppBar,
	Toolbar,
	IconButton,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import useStorage from '../../Hooks/useStorage';
import CancelIcon from '@mui/icons-material/Cancel';

const Users = ({ show, toggle }) => {
	const { readData, DBdata } = useStorage();

	useEffect(() => {
		readData('users'); // eslint-disable-next-line
	}, []);
	console.log(DBdata);
	return (
		<Modal
			open={show}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'>
			<Box
				sx={{
					all: 'unset',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					background: 'white',
					border: '0px solid',
					padding: '10px',
					borderRadius: '6px',
					height: '90%',
					width: '90%',
					overflow: 'auto',
				}}>
				<AppBar sx={{ padding: '5px 12px' }}>
					<Stack
						direction='row'
						alignItems='center'
						justifyContent='space-between'>
						<h1 style={{ color: 'white' }}>Users</h1>
						<IconButton onClick={() => toggle(false)}>
							<CancelIcon />
						</IconButton>
					</Stack>
				</AppBar>
				<Toolbar sx={{ height: 50 }} />
				<Grid container spacing={2}>
					{DBdata &&
						Object.values(DBdata).map((user) => (
							<Grid item xs={12} md={6}>
								<Stack
									direction='row'
									alignItems='center'
									sx={{
										background: '#0000001a',
										position: 'relative',

										borderRadius: '5px',
										padding: '15px 10px',
									}}>
									<Avatar
										loading={true}
										sx={{ background: '#00000055' }}
										alt={user?.displayName}
										src={user.photoURL}>
										{user?.displayName?.slice(0, 1)?.toUpperCase()}
									</Avatar>

									<div>
										<h4 style={{ marginLeft: 12, textTransform: 'capitalize' }}>
											{user?.displayName}
										</h4>
										<h6 style={{ marginLeft: 12, color: '#0000008f' }}>
											{user?.email}
										</h6>
									</div>
								</Stack>
							</Grid>
						))}
				</Grid>
			</Box>
		</Modal>
	);
};

export default Users;
