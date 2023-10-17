const redis = require('ioredis').default;

const client = redis.createClient({
    port: 6379,
    host: 'localhost',
});
client.on('error', (error) => {
    console.error(`Error in the client: ${error}`);
});
client.on('connect', () => {
	console.log('Connected to client');
});

exports.client = client;

exports.clientCommands = {
	connect: async function () {
	  if (client.status === 'ready') {
		console.log('Client connected.');
		await client.flushall();
	  } else {
		console.log('Client not connected...', client.status);
	}},
	disconnect: function () {
		try {
			client.disconnect();
			console.log('Client disconnected...');
		} catch (error) {
			console.error(error);
		}
	},
  
	get: function (index) {
		return new Promise((resolve, reject) => {
			client.hgetall(index, (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		});
	},
	
	set: function (index, value) {
		return new Promise((resolve, reject) => {
			client.hset(index, value, (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		});
	},	
  
	delete: async function (index) {
	  await client.hdelall(index);
	},
};
