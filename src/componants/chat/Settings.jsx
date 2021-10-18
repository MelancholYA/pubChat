import {
	Backdrop,
	Button,
	CircularProgress,
	Modal,
	Stack,
	TextField,
	IconButton,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import SaveIcon from '@mui/icons-material/Save';

const Settings = ({ open, setOpen, logOut, user }) => {
	const { updateUser, updateUserEmail } = useAuth();
	const [userData, setUserData] = useState({
		displayName: user.displayName,
		email: user.email,
	});
	const [loading, setLoading] = useState(false);

	const updateUserName = async () => {
		setLoading(true);
		await updateUser(userData);
		setLoading(false);
	};
	const updateEmail = async () => {
		setLoading(true);
		await updateUserEmail(userData.email);
		setLoading(false);
	};

	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
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
					padding: '22px',
					borderRadius: '6px',
					maxWidth: '80%',
					width: 500,
					minWidth: '50vw',
				}}>
				<Backdrop
					sx={{
						color: '#000',
						bgcolor: '#04040433',
						zIndex: (theme) => theme.zIndex.drawer + 1,
					}}
					open={loading}>
					<CircularProgress color='inherit' />
				</Backdrop>
				<TextField
					label='Full name'
					id='outlined-basic'
					variant='outlined'
					defaultValue={user.displayName}
					onChange={(e) =>
						setUserData({ ...userData, displayName: e.target.value })
					}
					InputProps={{
						endAdornment: (
							<IconButton
								aria-label='SaveIcon'
								variant='contained'
								onClick={() => updateUserName()}
								sx={{
									color: '#fff',
									background: '#000000',
									borderRadius: '5px',
									'&:hover': {
										color: '#dfd',
										background: '#000000',
									},
								}}>
								<SaveIcon />
							</IconButton>
						),
					}}
					sx={{ width: '100%', marginBottom: 2 }}
				/>
				<Stack direction='row' spacing={1}>
					<TextField
						label='Email address'
						id='outlined-basic'
						variant='outlined'
						defaultValue={user.email}
						onChange={(e) =>
							setUserData({ ...userData, email: e.target.value })
						}
						type='email'
						InputProps={{
							endAdornment: (
								<IconButton
									aria-label='SaveIcon'
									variant='contained'
									onClick={() => updateEmail()}
									sx={{
										color: '#fff',
										background: '#000000',
										borderRadius: '5px',
										'&:hover': {
											color: '#dfd',
											background: '#000000',
										},
									}}>
									<SaveIcon />
								</IconButton>
							),
						}}
						sx={{ width: '100%', marginBottom: 2 }}
					/>
				</Stack>

				<Stack direction='row' spacing={1}>
					{/* <LoadingButton
						loading={loading}
						variant='contained'
						onClick={updateUserData}
						sx={{
							width: '100%',
							background: '#000000dd',
							color: 'white',
							'&:hover': {
								background: '#000000ff',
							},
						}}>
						Save
					</LoadingButton> */}
					<Button
						variant='contained'
						onClick={() => logOut()}
						sx={{
							width: '100%',
							bgcolor: 'error.main',
							color: 'white',
							'&:hover': {
								bgcolor: 'red',
							},
						}}>
						LogOut
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};

export default Settings;
