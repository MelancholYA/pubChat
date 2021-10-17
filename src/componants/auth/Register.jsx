import { TextField, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useAuth from '../../Hooks/useAuth';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const Register = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { createUser } = useAuth();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	const signUp = async () => {
		setLoading(true);
		if (!user.userName) {
			enqueueSnackbar('Please write your full name', {
				variant: 'error',
				preventDuplicate: true,
			});
		} else if (!user.password) {
			enqueueSnackbar('Please write your password', {
				variant: 'error',
				preventDuplicate: true,
			});
		} else if (user.password.length < 8) {
			enqueueSnackbar('Password must be 8 letters or longer', {
				variant: 'error',
				preventDuplicate: true,
			});
		} else {
			await createUser(user);
		}
		setLoading(false);
	};
	return (
		<>
			<Box>
				<Divider sx={{ margin: 2 }} />

				<TextField
					label='Full name'
					id='outlined-basic'
					variant='outlined'
					type='text'
					onChange={(e) => setUser({ ...user, userName: e.target.value })}
					sx={{ width: '100%', marginBottom: 2 }}
				/>

				<TextField
					label='Email address'
					id='outlined-basic'
					variant='outlined'
					type='email'
					onChange={(e) => setUser({ ...user, email: e.target.value })}
					sx={{ width: '100%', marginBottom: 2 }}
				/>
				<TextField
					label='Password'
					id='outlined-basic'
					type='password'
					variant='outlined'
					onChange={(e) => setUser({ ...user, password: e.target.value })}
					sx={{ width: '100%', marginBottom: 2 }}
				/>
				<LoadingButton
					loading={loading}
					variant='contained'
					sx={{ width: '100%', color: 'white' }}
					onClick={() => signUp()}>
					Register
				</LoadingButton>
			</Box>
		</>
	);
};

export default Register;
