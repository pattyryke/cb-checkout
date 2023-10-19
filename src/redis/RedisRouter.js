const controller = require('./RedisController');



const RedisRouter = (app) => {
    // Get the stored currentUser
    app.get('/google/check/user', async (req, res) => {
        try {
            const currentUser = await controller.getGoogleUser();
            console.log(currentUser);
            if(currentUser.isAuthenticated) {
                res.send(currentUser.isAuthenticated);
            } else {
                res.send(false);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    });
    // Logout
    // Delete currentGoogleUser from database
	app.get('/google/logout', async (req, res) => {
        try {
            await controller.delGoogleUser();
            res.status(200);
        } catch (error) {
            console.error(error);
            throw error;
        }
	});
};

module.exports = RedisRouter;