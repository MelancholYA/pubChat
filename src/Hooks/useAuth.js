import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import '../firebase/config';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';

const useAuth = () => {
	const history = useHistory();
	const { enqueueSnackbar } = useSnackbar();
	const googleProvider = new GoogleAuthProvider();
	const facebookProvider = new FacebookAuthProvider();
	const auth = getAuth();

	const loginWithProvider = async (provider) => {
		await signInWithPopup(
			auth,
			provider === 'fb' ? facebookProvider : googleProvider,
		)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				// ...
				console.log({ credential, user, token });
				sessionStorage.setItem('user', JSON.stringify(user));
				history.push('/chat');
				enqueueSnackbar('Welcome ' + user.displayName, {
					variant: 'success',
					preventDuplicate: true,
				});
			})
			.catch((error) => {
				// Handle Errors here.

				enqueueSnackbar(error.message.split('/')[1].replaceAll('-', ' '), {
					variant: 'error',
					preventDuplicate: true,
				});
			});
	};

	const createUser = async (data) => {
		await createUserWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed in

				const user = userCredential.user;
				updateProfile(user, {
					displayName: data.userName,
				})
					.then(() => {
						history.push('/chat');
						enqueueSnackbar('Welcome ' + user.displayName, {
							variant: 'success',
							preventDuplicate: true,
						});
					})
					.catch((error) => {
						enqueueSnackbar(error.message.split('/')[1].replaceAll('-', ' '), {
							variant: 'error',
							preventDuplicate: true,
						});
					});
			})
			.catch((error) => {
				enqueueSnackbar(error.message.split('/')[1].replaceAll('-', ' '), {
					variant: 'error',
					preventDuplicate: true,
				});
			});
	};
	const loginUser = async (data) => {
		await signInWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				history.push('/chat');
				enqueueSnackbar('Welcome back ' + user.displayName, {
					variant: 'success',
					preventDuplicate: true,
				});
				// ...
			})
			.catch((error) => {
				enqueueSnackbar(error.message.split('/')[1].replaceAll('-', ' '), {
					variant: 'error',
					preventDuplicate: true,
				});
			});
	};

	const currUser = () => {
		const authUser = auth.currentUser;
		const sessionUser = sessionStorage.getItem('user');
		if (auth || sessionUser) return authUser || JSON.parse(sessionUser);
		return null;
	};

	return { currUser, loginWithProvider, createUser, loginUser };
};

export default useAuth;
