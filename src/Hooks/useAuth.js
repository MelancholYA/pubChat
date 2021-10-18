import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
} from 'firebase/auth';
import '../firebase/config';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import useStorage from './useStorage';
import { useEffect } from 'react';

const useAuth = () => {
	const history = useHistory();
	const { enqueueSnackbar } = useSnackbar();
	const googleProvider = new GoogleAuthProvider();
	const facebookProvider = new FacebookAuthProvider();
	const auth = getAuth();
	const { writeData, readData } = useStorage();

	useEffect(() => {
		if (auth.currentUser) {
			localStorage.setItem('user', JSON.stringify(auth.currentUser));
		}
	}, [auth.currentUser]);
	const loginWithProvider = async (provider) => {
		await signInWithPopup(
			auth,
			provider === 'fb' ? facebookProvider : googleProvider,
		)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				// const credential = GoogleAuthProvider.credentialFromResult(result);
				// const token = credential.accessToken;
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
						name: user?.displayName,
						email: user?.email,
						photoURL: user?.photoURL,
						uid: user?.uid,
						displayName: user?.displayName,
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
							name: user?.displayName,
							email: user?.email,
							photoURL: user?.photoURL,
							uid: user?.uid,
							displayName: user?.displayName,
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
	const updateUser = async (data) => {
		await updateProfile(currUser(), data)
			.then(() => {
				// Profile updated!
				// ...
				console.log('syc');
				localStorage.setItem(
					'user',
					JSON.stringify({ ...currUser(), ...data }),
				);
				const userDbData = readData('users/' + currUser().uid);
				writeData('users/' + currUser().uid, {
					...userDbData,
					...data,
				});
				enqueueSnackbar('Profile updated succesfully', {
					variant: 'success',
					preventDuplicate: true,
				});
			})
			.catch((error) => {
				// An error occurred
				// ...
				enqueueSnackbar(error?.message.split('/')[1].replaceAll('-', ' '), {
					variant: 'error',
					preventDuplicate: true,
				});
				console.log(error, error.code);
			});
	};
	const updateUserEmail = async (email) => {
		await updateEmail(auth.currentUser, email)
			.then(() => {
				enqueueSnackbar('Profile updated succesfully', {
					variant: 'success',
					preventDuplicate: true,
				});
			})
			.catch((error) => {
				console.log(error.code);
				enqueueSnackbar(
					error.code === 'auth/requires-recent-login'
						? 'Please sign out then relogin and try'
						: error?.message.split('/')[1].replaceAll('-', ' '),
					{
						variant: 'error',
						preventDuplicate: true,
					},
				);
			});
	};

	return {
		currUser,
		loginWithProvider,
		createUser,
		loginUser,
		logOutUser,
		updateUser,
		updateUserEmail,
	};
};

export default useAuth;
