import { Container } from '@mui/material';
import { Provider } from 'react-redux';
import Auth from './pages/Auth';
import Store from './Redux';
import './styles/main.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './pages/Main';

const theme = createTheme({
	palette: {
		primary: {
			main: '#76C00D',
		},
		secondary: {
			main: '#ffffff',
		},
	},
});

function App() {
	return (
		<Router>
			<Provider store={Store}>
				<ThemeProvider theme={theme}>
					<SnackbarProvider
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}>
						<Container style={{ padding: 0 }} maxWidth='xl' className='App'>
							<Switch>
								<Route exact path='/' component={Auth} />
								<Route exact path='/chat' component={Main} />
							</Switch>
						</Container>
					</SnackbarProvider>
				</ThemeProvider>
			</Provider>
		</Router>
	);
}

export default App;
