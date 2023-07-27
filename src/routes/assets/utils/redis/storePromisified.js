const 	client 	= require('../../../../config/client.cjs'),
		redis 	= require('ioredis'),
		Promise = require('promise');

const 	storePromisified = {
	getall: function (key) {
		return new Promise(async (fulfill, reject) => {
			client.hgetall(key, (err, obj) => {
				if (err) {
					reject(err);
				}
				else {
					fulfill(obj);
				};
			});
		});
	},

	set: function (key, hash) {
		return new Promise(async (fulfill, reject) => {
			client.hmset(key, hash, (err, obj) => {
				// console.log(`storePromisified: I AM IN CREATE`);
				if (err) {
					// console.log(err);
					reject(err);
				}
				else {
					// console.log(`fulfilling obj: ${JSON.stringify(obj)}`);
					fulfill(obj);
				};
			});
		});
	},

	exists: function (key) {
		return new Promise(async (fulfill, reject) => {
			client.exists(key, (err, obj) => {
				// console.log(`storePromisified: I AM IN EXISTS`);
				if (err) {
					// console.log(err);
					reject(err);
				}
				else {
					// console.log(`fulfilling obj: ${JSON.stringify(obj)}`);
					fulfill(obj);
				};
			});
		});
	},

	del: function (key) {
		return new Promise(async (fulfill, reject) => {
			client.del(key, (err, obj) => {
				// console.log(`storePromisified: I AM IN DEL`);
				if (err) {
					// console.log(err);
					reject(err);
				}
				else {
					// console.log(`fulfilling obj: ${JSON.stringify(obj)}`);
					fulfill(obj);
				};
			});
		});
	},
};

module.exports = storePromisified;