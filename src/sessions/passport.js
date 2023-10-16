const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../assets/User.js');
require('dotenv').config({
	path: `${__dirname}/../../.env`,
});

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

const passportConfig = (passport) => {
	passport.use(
		new GoogleStrategy({
				clientID: client_id,
				clientSecret: client_secret,
				callbackURL: redirect_uri,
				scope: [
					'email', 
					'profile', 
					'openid',
				],
				passReqToCallback: true,
				state: true,
			}, async (req, accessToken, refreshToken, profile, done) => {
				try {
					if (!profile) { throw new Error('No profile...'); }
					const id = profile.id;
					const userCheck = await User.findById(id);
					console.log('userCheck:', userCheck);
					if (!userCheck) {
						const user = new User(
							profile.id,
							profile.displayName,
							profile.emails[0].value,
							accessToken,
							refreshToken
						);
						await user.save();
						done(null, user);
					} else {
						console.log('User already exists...')
						done(null, userCheck);
					}
				} catch (error) {
					console.error("ERROR IN PASSPORT AUTH:", error);
					// done(error, null);
				}
			}
		)
	);


	passport.serializeUser((user, done) => {
		try {
			console.log('Serializing...')
			return done(null, user);
		} catch (error) {
			console.error("ERROR IN PASSPORT SERIALIZEUSER:", error);
		}
	});
	passport.deserializeUser((user, done) => {
		try {
			console.log('Deserializing...')
			return done(null, user);
		} catch (error) {
			console.error("ERROR IN DESERIALIZEUSER:", error);
		}
	});
};

module.exports = passportConfig;
