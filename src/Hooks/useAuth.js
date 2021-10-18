import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import '../firebase/config';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import useStorage from './useStorage';

const useAuth = () => {
	const history = useHistory();
	const { enqueueSnackbar } = useSnackbar();
	const googleProvider = new GoogleAuthProvider();
	const facebookProvider = new FacebookAuthProvider();
	const auth = getAuth();
	const { writeData, readData } = useStorage();

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
				localStorage.setItem('user', JSON.stringify(user));
				history.push('/chat');

				enqueueSnackbar('Welcome ' + user.displayName, {
					variant: 'success',
					preventDuplicate: true,
				});
				const data = readData('users/' + user.uid);
				!data &&
					writeData('users/' + user.uid, {
						name: user.displayName,
						email: user.email,
						photoURL: user.photoURL,
						uid: user.uid,
					});
			})
			.catch((error) => {
				// Handle Errors here.

				enqueueSnackbar(error?.message.split('/')[1].replaceAll('-', ' '), {
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
						writeData('users/' + user.uid, {
							name: user.displayName,
							email: user.email,
							photoURL: user.photoURL,
							uid: user.uid,
						});
						localStorage.setItem('user', JSON.stringify(user));
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
				localStorage.setItem('user', JSON.stringify(user));
				history.push('/chat');
				enqueueSnackbar('Welcome back ' + user.displayName, {
					variant: 'success',
					preventDuplicate: true,
				});
				// ...
			})
			.catch((error) => {
				enqueueSnackbar(error?.message.split('/')[1].replaceAll('-', ' '), {
					variant: 'error',
					preventDuplicate: true,
				});
			});
	};
	const logOutUser = async () => {
		await signOut(auth)
			.then(() => {
				localStorage.removeItem('user');
				history.push('/');
				enqueueSnackbar('See you soon !', {
					variant: 'info',
					preventDuplicate: true,
				});
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
		const localUser = localStorage.getItem('user');
		if (authUser || localUser) return authUser || JSON.parse(localUser);
		return null;
	};

	return { currUser, loginWithProvider, createUser, loginUser, logOutUser };
};

export default useAuth;
