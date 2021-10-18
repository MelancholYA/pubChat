import { Avatar, IconButton, Stack } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const PrevChat = ({ data }) => {
	return (
		<Stack
			direction='row'
			alignItems='center'
			sx={{
				padding: 2,
				background: '#0000001a',
				margin: '0 15px',
				borderRadius: '5px',
				padding: '15px 10px',
			}}>
			<Avatar
				sx={{ bgcolor: 'primary.main' }}
				alt={data.user}
				src={data.photoURL}>
				{data.user.slice(0, 1).toUpperCase()}
			</Avatar>
			<div>
				<h4 style={{ marginLeft: 12, textTransform: 'capitalize' }}>
					{data.user}
				</h4>
				<h6 style={{ marginLeft: 12, color: '#0000008f' }}>{data.chat}</h6>
			</div>
			<IconButton sx={{ marginLeft: 'auto' }}>
				<SettingsIcon />
			</IconButton>
		</Stack>
	);
};

export default PrevChat;
