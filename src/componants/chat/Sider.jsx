import { Divider, Stack } from '@mui/material';
import Logo from '../../assets/logo.svg';
import PrevChats from './PrevChats';
import User from './User';

const Sider = () => {
	return (
		<div>
			<Stack direction='row' alignItems='center' sx={{ padding: 2 }}>
				<img src={Logo} height='50px' alt='' />
				<h2 style={{ marginLeft: 12 }}>PubChat</h2>
			</Stack>
			<Divider sx={{ margin: '5px 15px' }} />
			<User />
			<PrevChats />
		</div>
	);
};

export default Sider;
