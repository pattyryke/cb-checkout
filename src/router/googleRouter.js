const   google              = require('../routes/assets/utils/GoogleController'),
        storePromisified    = require('../routes/assets/utils/redis/storePromisified')



// scope: [
//     'email', 
//     'profile'
//     'https://www.googleapis.com/auth/admin.directory.device.chromeos',
//     'https://www.googleapis.com/auth/admin.directory.orgunit',
//     'openid'
// ],

// Route middleware to ensure user is authenticated.
const ensureAuthenticated = (req, res, next) => {
    console.log(`ENSURING AUTHENTICATION: req.user = ${req.user}`);
    console.log(`ENSURING AUTHENTICATION: req.isAuthenticated() = ${req.isAuthenticated()}`);
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('Unauthorized');
};


var googleRouter = (passport, app) => {

    // Handle login authorization
    app.get('/auth/google/login', 
        passport.authenticate('google', { 
            scope: [ 'email', 'profile' ],
            session: true }
        ));
    
    app.get('/auth/google/callback', 
        passport.authenticate('google', {
            successRedirect: 'http://localhost:3000/google/login/success',
            failureRedirect: 'http://localhost:3000/google/login/failure',
            session: true
    }));


    // Handle logging out
    app.get('/google/logout', function (req, res) {
        req.logout();
        res.redirect('http://localhost:3001/');
    });


    // Show account details
    app.get('/google/account', ensureAuthenticated, (req, res) => {
        console.log(req.user);
        if (req.user) {
            res.json(req.user);
        } else {
            res.status(404).send('No user found');
        }
    });


    app.get('/google/login/success', ensureAuthenticated, (req, res) => {
        console.log(`SUCCESS: REQ = ${JSON.stringify(req.user)}`);
        if (req.user) {
            const displayName = req.user.name;
            res.send(`
                <div>
                    <h1>
                        Welcome, ${displayName}!
                    </h1>
                    <a href='http://localhost:3001/'>
                        Return to the Home Page
                    </a>
                </div>
            `);
        }
    });


    app.get('/google/login/failure', (req, res) => {
        res.send(`
            <div>
                <h1>
                    Failed to login.
                </h1>
                <a href='http://localhost:3001/'>
                    Return to the Home Page
                </a>
            </div>
        `);
    });

    app.get('/google/lock/:serial', google.requestAuth);
}

module.exports = googleRouter;