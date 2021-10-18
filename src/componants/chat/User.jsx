import { Avatar, IconButton, Stack } from '@mui/material';
import useAuth from '../../Hooks/useAuth';
import useStorage from '../../Hooks/useStorage';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect, useState } from 'react';
import loader from '../../assets/loader.svg';
import Settings from './Settings';

const User = () => {
	const { uploadFile, url } = useStorage();
	const [PicLoader, setPicLoader] = useState(false);
	const { currUser, logOutUser, updateUser } = useAuth();
	const [openSettings, setOpenSettings] = useState(false);
	const user = currUser();

	const uploadPic = async (e) => {
		setPicLoader(true);
		await uploadFile(e.target.files[0], 'users/' + currUser().uid);
	};

	const updatePic = async () => {
		await updateUser({ photoURL: url });
	};

	useEffect(() => {
		console.log(url, 'tt0');
		if (url) {
			console.log(url, 'tt1');
			updatePic();
			setPicLoader(false);
		}
		// eslint-disable-next-line
	}, [url]);

	return (
		<Stack
			direction='row'
			alignItems='center'
			sx={{
				background: '#0000001a',
				position: 'relative',
				margin: '0 15px',
				borderRadius: '5px',
				padding: '15px 10px',
			}}>
			<Avatar
				loading={true}
				sx={{ background: '#00000055' }}
				alt={currUser().displayName}
				src={PicLoader ? loader : currUser().photoURL}>
				{currUser().displayName.slice(0, 1).toUpperCase()}
			</Avatar>
			<Settings
				open={openSettings}
				setOpen={setOpenSettings}
				logOut={logOutUser}
				user={user}
			/>

			<input
				onChange={(e) => uploadPic(e)}
				style={{
					position: 'absolute',
					top: 15,
					left: 10,
					width: 40,
					height: 40,
					opacity: 0,
					zIndex: 9,
				}}
				accept='image/*'
				id='contained-button-file'
				multiple={false}
				type='file'
			/>
			<div>
				<h4 style={{ marginLeft: 12, textTransform: 'capitalize' }}>
					{currUser().displayName}
				</h4>
				<h6 style={{ marginLeft: 12, color: '#0000008f' }}>
					{currUser().email}
				</h6>
			</div>

			<IconButton
				id='basic-button'
				onClick={() => {
					setOpenSettings(true);
				}}
				sx={{ marginLeft: 'auto' }}>
				<SettingsIcon />
			</IconButton>
		</Stack>
	);
};

export default User;
