const redis = require('ioredis');

const clientCommands = {
	connect: async function (client) {
		if (!client.status || client.status === 'closed') {
			console.log('Connecting client to Redis server...');
			await client.connect();
			console.log('Client connected.');
		} else {
			console.log('Client already connected.');
		}
	},

	checkKeyValue: async function (client) {
		try {
			const value = await client.hget('key', 'field');
			if (value !== null && value === 'value') {
				console.log('PASSED: Key-value pair exists in Redis.');
				return true;
			} else {
				console.log('FAILED: Key-value pair does not exist in Redis.');
				return false;
			}
		} catch (err) {
			console.log('ERROR:', err);
			return false;
		}
	},

	setKeyValue: async function (client) {
		await client.hset('key', 'field', 'value');
	},

	deleteKeyValue: async function (client) {
		await client.del('key');
	},
};

const client = redis.createClient(6379, 'localhost');

client.on('connect', () => {
	console.log('Client connection successful!');
	clientCommands.checkKeyValue(client).then((exists) => {
		if (exists) {
			console.log('CLIENT CONNECTED!');
		} else {
			clientCommands
				.setKeyValue(client)
				.then(() => {
					console.log('Key-value pair created in Redis.');
					clientCommands
						.deleteKeyValue(client)
						.then(() => {
							console.log('Key-value pair deleted from Redis.');
							clientCommands.connect(client);
						})
						.catch((err) => {
							console.log('Failed to delete key-value pair from Redis:', err);
						});
				})
				.catch((err) => {
					console.log('Failed to set key-value pair in Redis:', err);
				});
		}
	});
});

client.on('error', (err) => {
	console.log(`An error has occurred in client.js: ${err}`);
});

module.exports = client;
