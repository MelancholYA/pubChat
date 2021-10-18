import useAuth from '../Hooks/useAuth';
import { Redirect, useHistory } from 'react-router';
import Chat from '../componants/chat';

const Main = () => {
	const { currUser } = useAuth();
	const user = currUser();
	const history = useHistory();
	return <div>{user ? <Chat /> : <Redirect to='/' />}</div>;
};

export default Main;
