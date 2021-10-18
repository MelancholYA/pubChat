import { Avatar, IconButton, Stack, Menu, MenuItem } from '@mui/material';
import useAuth from '../../Hooks/useAuth';
import useStorage from '../../Hooks/useStorage';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

const User = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const { writeData, readData } = useStorage();
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const { currUser, logOutUser } = useAuth();
	const user = currUser();

	return (
		<Stack
			direction='row'
			alignItems='center'
			sx={{
				background: '#0000001a',
				margin: '0 15px',
				borderRadius: '5px',
				padding: '15px 10px',
			}}>
			<Avatar
				sx={{ bgcolor: 'primary.main' }}
				alt={user.displayName}
				src={user.photoURL}>
				{user.displayName.slice(0, 1).toUpperCase()}
			</Avatar>
			<div>
				<h4 style={{ marginLeft: 12, textTransform: 'capitalize' }}>
					{user.displayName}
				</h4>
				<h6 style={{ marginLeft: 12, color: '#0000008f' }}>{user.email}</h6>
			</div>

			<IconButton
				id='basic-button'
				aria-controls='basic-menu'
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				sx={{ marginLeft: 'auto' }}>
				<SettingsIcon />
			</IconButton>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem
					onClick={(e) => {
						handleClose(e);
						writeData();
					}}>
					write
				</MenuItem>
				<MenuItem
					onClick={(e) => {
						handleClose(e);
						readData();
					}}>
					read
				</MenuItem>
				<MenuItem
					onClick={(e) => {
						handleClose(e);
						logOutUser('users/', JSON.stringify({ hi: 'no' }));
					}}>
					Logout
				</MenuItem>
			</Menu>
		</Stack>
	);
};

export default User;
