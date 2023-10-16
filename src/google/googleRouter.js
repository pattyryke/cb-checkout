const controller = require('./GoogleController.js');
const admin = require('./googleapis/admin/admin.js');
const { authCheck, getAuthTokens, getAuthURL } = require('./googleapis/auth/auth.js');

// Route middleware to ensure user is authenticated.
const ensureAuthenticated = async (req, res, next) => {
	try {
		const isAuthenticated = await authCheck();
		if (!isAuthenticated) {
			res.redirect('/');
		} else {
			next();
		}
	} catch (error) {
		console.error('Error in ensureAuthenticated:', error);
	}
};

var googleRouter = (app) => {
	// Handle login authorization
	app.get('/auth/google/login', async (req, res) => {
		const authURL = getAuthURL();
		res.redirect(authURL);
	});

	app.get('/auth/google/callback', async (req, res) => {
		const code = req.query.code;
		try {
			const tokens = await getAuthTokens(code);
			res.redirect('http://localhost:3001/');
		} catch (error) {
			console.error(error);
			res.redirect('http://localhost:3001/failed');
		}
	});

	// app.get('/google/lock', google.requestAuth);
	app.get('/google/chromebooks/lock', ensureAuthenticated, async (req, res) => {
		const deviceId = req.query.deviceId;
		const status = req.query.status;
		console.log(status);
		if (status === 'ACTIVE') {
			await admin.lockChromebook(deviceId);
			console.log(`${deviceId} is now disabled.`);
		} else {
			console.log
		}
		console.log(response.data);
	});

	app.get('/google/chromebooks/get-id', ensureAuthenticated, async (req, res) => {
		const serial_num = req.query.serialNum;
		const response = await admin.getChromebookID(serial_num);
		res.send(response.chromeosdevices[0]);
	});
};

module.exports = googleRouter;
