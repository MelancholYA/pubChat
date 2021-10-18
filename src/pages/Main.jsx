import useAuth from '../Hooks/useAuth';
import { Redirect } from 'react-router';
import Chat from '../componants/chat';

const Main = () => {
	const { currUser } = useAuth();
	const user = currUser();
	return <div>{user ? <Chat /> : <Redirect to='/' />}</div>;
};

export default Main;
