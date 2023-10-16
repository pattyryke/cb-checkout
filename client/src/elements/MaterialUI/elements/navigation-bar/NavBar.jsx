import { Container } from '@mui/material';
import NavButton from './NavButton.jsx';
import Login from './Login';
import LockCheckButton from './LockCheckButton';

export default function NavBar({userData}) {
	return (
		<Container
			maxWidth="xl"
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-around',
				height: '30px',
			}}>
			<NavButton />
			<Login />
			<LockCheckButton userData={userData}/>
		</Container>
	);
}
