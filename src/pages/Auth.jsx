import { useEffect, useState } from 'react';
import Login from '../componants/auth/Login';
import Register from '../componants/auth/Register';
import logo from '../assets/logo.svg';
import { Container, Stack, Grid, Button } from '@mui/material';
import useAuth from '../Hooks/useAuth';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useHistory } from 'react-router';

const Auth = () => {
	const [isNew, setIsNew] = useState(false);
	const { loginWithProvider, currUser } = useAuth();
	const history = useHistory();

	const user = currUser();

	useEffect(() => {
		if (user) {
			history.push('/chat');
		}
	}, [user, history]);

	return (
		<div style={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
			<Container
				className='authContainer'
				maxWidth='sm'
				sx={{
					bgcolor: '#afc1b81c',
					borderRadius: 1,
					boxShadow: 3,
					padding: '25px',
				}}>
				<Stack direction='row' alignItems='center'>
					<img src={logo} alt='' height='50px' />
					<h1 style={{ marginLeft: 25 }}>
						{isNew ? 'Join us !' : 'Welcome Back !'}
					</h1>
				</Stack>
				<p style={{ margin: '15px 0', fontSize: 10, color: '#000000a3' }}>
					{!isNew ? "Don't have an account yet !" : 'Already have an account !'}

					<span
						style={{ color: 'black', cursor: 'pointer', fontWeight: 'bolder' }}
						onClick={() => setIsNew(!isNew)}>
						{!isNew ? ' Register' : ' Login'}
					</span>
				</p>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Button
							startIcon={<GoogleIcon />}
							variant='contained'
							onClick={() => loginWithProvider()}
							sx={{
								padding: '10px',
								width: '100%',
								background: '#D42F2F',
								color: 'white',
								'&:hover': {
									background: '#D42F0F',
								},
							}}>
							{isNew ? ' Register' : ' Login'} via Google
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<Button
							onClick={() => loginWithProvider('fb')}
							startIcon={<FacebookIcon />}
							variant='contained'
							sx={{
								padding: '10px',
								width: '100%',
								background: '#2d88ff',
								color: 'white',
								'&:hover': {
									background: '#2d88ee',
								},
							}}>
							{isNew ? ' Register' : ' Login'} via Facebook
						</Button>
					</Grid>
				</Grid>
				{isNew ? (
					<Register setIsNew={setIsNew} />
				) : (
					<Login setIsNew={setIsNew} />
				)}
			</Container>
		</div>
	);
};

export default Auth;
