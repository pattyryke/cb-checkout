const compression = require('compression');
const flash = require('connect-flash');
const RedisStore = require('connect-redis').default;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { join } = require('path');

const passportConfig = require('./src/sessions/passport.js');
const SnipeITController = require('./src/snipeit/SnipeITController.js');
const MySQLController = require('./src/mysql/MySQLController.js');
const CheckIn = require('./src/snipeit/CheckIn.js');
const CheckOut = require('./src/snipeit/CheckOut.js');
const Displays = require('./src/utils/Displays.js');
const googleRouter = require('./src/google/googleRouter.js');
const PSRoutes = require('./src/powerschool/PSRoutes.js');
const SnipeITRoutes = require('./src/snipeit/SnipeITRoutes.js');
const redisController = require('./src/sessions/redisClient.js');
const Device = require('./src/assets/classes/Device.js');
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

/**
 * PASSPORT CONFIG
 */
app.use(passport.initialize());
app.use(passport.session());


/**
 *  mySQL DATABASE
 */
app.get('/sql/request-serial/:tag', MySQLController.getSerial);
app.get('/sql/request-all-chromebooks', MySQLController.getAllIncomplete);
app.get('/sql/display', Displays.displayTable);

app.post('/sql/add-to-database', CheckOut.addToDatabase);
app.post('/sql/adjust-database', CheckIn.modifyRow);

/**
 *  SNIPE-IT
 */
app.get('/based', async (req, res) => {
	const assetTag = '1008143';
	const newDevice = new Device(
		assetTag,
	);
	console.log(newDevice);
});

app.get('/snipeit/chromebook/:assetTag', SnipeITRoutes.fetchChromebookByAssetTag);
app.get('/snipe-it/user/:studentID', SnipeITController.getUser);
app.post('/chromebook/check-out/:assetTag/:studentID', SnipeITRoutes.checkOutChromebook);
app.post('/chromebook/check-in', SnipeITController.CheckOutChromebook);
app.get('/chromebooks/dailys', SnipeITController.getDailyChromebooks);

/**
 *  POWERSCHOOL
 */
app.get('/student/:studentId', PSRoutes.getStudentNameById);

googleRouter(app);
passportConfig(passport);

// Client
app.get('/', (req, res) => {
	console.log(JSON.stringify(req));
	res.sendFile(join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
