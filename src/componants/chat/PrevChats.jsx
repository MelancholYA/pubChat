import {
	IconButton,
	List,
	ListItem,
	ListItemButton,
	Stack,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Users from './Users';
import { useState } from 'react';
const PrevChats = () => {
	const [showUsers, setShowUsers] = useState(false);
	return (
		<div style={{ padding: 16, marginTop: 12 }}>
			<Stack direction='row' alignItems='center' justifyContent='space-between'>
				<h4>Previous chats</h4>
				<IconButton
					size='small'
					color='primary'
					onClick={() => setShowUsers(true)}>
					<AddCircleIcon />
				</IconButton>
			</Stack>
			<Users show={showUsers} toggle={setShowUsers} />
			<List>
				<ListItem disablePadding>
					<ListItemButton>
						<p>chat</p>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<h1>chat</h1>
				</ListItem>
			</List>
		</div>
	);
};

export default PrevChats;
