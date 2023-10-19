import { Container } from '@mui/material';
import GoogleSignInButton from './GoogleSignInButton.jsx';
import NavigationDropdownMenu from './NavigationDropdownMenu.jsx';
import GoogleDeviceLockButton from './GoogleDeviceLockButton.jsx';

export default function NavigationBar({isLoggedIn}) {
	return (
		<Container
			maxWidth="xl"
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-around',
				height: '30px',
			}}>
			<NavigationDropdownMenu />
			<GoogleDeviceLockButton />
			<GoogleSignInButton isLoggedIn={isLoggedIn}/>
		</Container>
	);
}
