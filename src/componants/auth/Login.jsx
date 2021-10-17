import { TextField, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'notistack';

const Login = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { loginUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);

	const login = async () => {
		setLoading(true);
		if (!user.password) {
			enqueueSnackbar('Please write your password', {
				variant: 'error',
				preventDuplicate: true,
			});
		} else {
			await loginUser(user);
		}

		setLoading(false);
	};
	return (
		<>
			<Box>
				<Divider sx={{ margin: 2 }} />

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
					onClick={login}
					loading={loading}
					variant='contained'
					sx={{ width: '100%', color: 'white' }}>
					Login
				</LoadingButton>
			</Box>
		</>
	);
};

export default Login;
