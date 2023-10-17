const controller = require('./SnipeITController');

const snipeitRouter = (app) => {
    app.get('/snipeit/user', controller.getUser);
    
    app.get('/snipeit/device', controller.getChromebook);
    app.get('/snipeit/dailys', controller.getDailys);

    app.post('/snipeit/check-out', controller.checkOut);
    app.post('/snipeit/check-in', controller.checkIn);

    app.get('/snipeit/lockCheck', controller.lockCheck);
}

module.exports = snipeitRouter;