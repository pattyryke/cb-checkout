const { google } = require('googleapis');
const { clientCommands } = require('../../redis/redisClient');
const { setGoogleUser, getGoogleUser } = require('../../redis/RedisController');
const { getUserInfo } = require('./people');
const User = require('../../assets/classes/User');
require('dotenv').config();

// Environmental variables
const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

// Creating Google client
const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
// Configure googleapis to use authentication credentials
google.options({ auth: oauth2Client });

// Defining scopes
const scopes = ['email', 'profile', 'openid', 'https://www.googleapis.com/auth/admin.directory.device.chromeos', 'https://www.googleapis.com/auth/user.emails.read', 'https://www.googleapis.com/auth/userinfo.profile'];

// OAuth2 URL creation
const getAuthURL = () => {
	const authURL = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scopes,
		include_granted_scopes: true,
	});
	return authURL;
};

// Get tokens from OAuth2 URL
const getAuthTokens = async (code) => {
	try {
		const { tokens } = await oauth2Client.getToken(code);
		return tokens;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

//
const authCheck = async () => {
	try {
		const check = await User.checkCreds();
		if (check) {
			oauth2Client.setCredentials(await User.getCreds());
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const createUserObj = async (tokens) => {
	try {
		const userData = await getUserInfo(tokens.access_token);
		const user = new User(userData.names[0].metadata.source.id, userData.names[0].displayName, userData.emailAddresses[0].value);
		await user.setUserCreds(
			tokens.refresh_token, 
			tokens.expiry_date, 
			tokens.access_token, 
			tokens.token_type, 
			tokens.id_token, 
			tokens.scope
		);
		console.log(user);

		return user;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

oauth2Client.on('tokens', async (tokens) => {
	try {
		if (tokens.access_token) {
			console.log('oauth2Client.on(tokens):');
			oauth2Client.setCredentials({
				refresh_token: tokens.refresh_token,
				expiry_date: tokens.expiry_date,
				access_token: tokens.access_token,
				token_type: tokens.token_type,
				id_token: tokens.id_token,
				scope: tokens.scope,
			});
			console.log('Credentials are set!');
			const user = await createUserObj(tokens);
			await setGoogleUser(user);
		}
	} catch (error) {
		console.error(error);
	}
});

module.exports = {
	authCheck,
	getAuthTokens,
	getAuthURL,
	createUserObj,
	oauth2Client,
};
