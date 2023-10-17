const compression = require('compression');
const flash = require('connect-flash');
const RedisStore = require('connect-redis').default;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const { join } = require('path');

const googleRouter = require('./src/google/GoogleRouter.js');
const redisController = require('./src/redis/redisClient.js');
const { createDevice } = require('./src/assets/functions/createDevice.js');
const snipeitRouter = require('./src/snipeit/SnipeITRouter.js');
require('dotenv').config();

const port = process.env.REACT_APP_PORT || 3000;

const app = express();

/**
 * EXPRESS CONFIG
 */
app.use(express.static(join(__dirname, 'client/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(flash());

/**
 * REDIS CONFIG
 */
app.use(
	session({
		store: new RedisStore({ client: redisController.client }),
		secret: 'secret',
		saveUninitialized: false,
		resave: false,
		cookie: {
			secure: false,
			httpOnly: true,
			sameSite: true,
			maxAge: 1000 * 60 * 10,
		},
	})
);

// Redis connection initialization
redisController.clientCommands.connect(session);

// SnipeIT
snipeitRouter(app);

// Google
googleRouter(app);

// Client-side
app.get('/', (req, res) => {
	console.log(JSON.stringify(req));
	res.sendFile(join(__dirname + '/client/build/index.html'));
});
app.get('/create-device', async (req, res) => {
	try {
		const assetTag = req.query.tag;
		const device = await createDevice(assetTag);
		res.status(200).send(device);
	} catch (error) {
		console.error(error);
		res.status(400).json('ERROR IN ROUTE /create-device');
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
