require('dotenv').config();

const 	express = require('express'),
		cors = require('cors'),
		session = require('express-session'),
		compression = require('compression'),
		cookieParser = require('cookie-parser'),
		flash = require('connect-flash'),
		path = require('path'),
		passport = require('passport'),
		RedisStore = require('connect-redis').default;

const 	client = require('./src/config/client.cjs'),
		googleRouter = require('./src/router/googleRouter'),
		snipeit_routes = require('./src/routes/SnipeITRoutes'),
		ps_routes = require('./src/routes/PSRoutes'),
		mysqlController = require('./src/database/MySQLController'),
		checkout = require('./src/database/Utils/CheckOut'),
		checkin = require('./src/database/Utils/CheckIn'),
		displays = require('./src/database/Utils/Displays'),
		passportConfig = require('./src/config/passport');

const 	app = express();
const 	port = process.env.REACT_APP_PORT || 3000;



app.use(
	session({
		secret: 'secret',
		name: 'passport_google',
		cookies: { secure: false, maxAge: 3600000 },
		saveUninitialized: true,
		resave: false,
		store: new RedisStore({ client: client }),
	}));
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'client/build')));

googleRouter(passport, app);
passportConfig(passport);

/**
 *  mySQL DATABASE
 */
app.get('/sql/request-serial/:tag', mysqlController.getSerial);
app.get('/sql/request-all-chromebooks', mysqlController.getAllIncomplete);
app.get('/sql/display', displays.displayTable);

app.post('/sql/add-to-database', checkout.addToDatabase);
app.post('/sql/adjust-database', checkin.modifyRow);

/**
 *  SNIPE-IT
 */
app.get('/chromebook/:assetTag', snipeit_routes.checkOutChromebook);
app.get('/chromebook/assign/:tag/:student', checkout.checkOutOnSnipeIT);

/**
 *  POWERSCHOOL
 */
app.get('/student/:studentId', ps_routes.getStudentNameById);

// Client
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
