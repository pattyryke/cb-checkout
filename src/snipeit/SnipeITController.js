const { default: axios } = require('axios');
const Device = require('../assets/classes/Device');

const access_token = process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN;
/**
 * DEVICE FUNCTIONS
 */
const getChromebook = async (req, res) => {
	const assetTag = req.query.assetTag;
	try {
		const device = new Device(assetTag);
		await device.initializeDevice();
		res.status(200).send(device);
	} catch (error) {
		res.status(400).send(error);
		throw error;
	}
};
const checkIn = async (req, res) => {
	const assetTag = req.query.assetTag;
	console.log(assetTag);
	try {
		const device = new Device(assetTag);
		await device.initializeDevice();
		if (device.isCheckedOut()) {
			await device.checkin();
			res.status(200).send(`The device has been checked in.`);
		} else {
			res.status(302).send(`The device is unchanged.`);
		}
	} catch (error) {
		res.status(400).send(error);
		throw error;
	}
};
const checkOut = async (req, res) => {
	const assetTag = req.query.assetTag;
	const studentId = req.query.studentId;
	try {
		const device = new Device(assetTag);
		await device.initializeDevice();
		if (device.isCheckedOut()) {
			await device.overrideCheckout(studentId);
			res.status(200).send(`Device is now checked out to ${device.snipeit.assignedUser.studentName} (${device.snipeit.assignedUser.studentId}).`);
		} else {
			res.status(304).send(`Device has not been updated.`);
		}
	} catch (error) {
		res.status(400).send(error);
	}
};
const getDailys = async (req, res) => {
	const options = {
		method: 'GET',
		url: `https://fwusd.snipe-it.io/api/v1/hardware?limit=2&offset=0&sort=created_at&order=desc&rtd_location_id=16&status=Deployed`,
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${access_token}`,
		},
	};
	try {
		const response = await axios(options);
		const dailys = response.data.rows;

		const dailysPromises = dailys.map(async (cb) => {
			const device = new Device(cb.asset_tag);
			await device.initializeDevice();
			return device;
		});
		const deviceArray = await Promise.all(dailysPromises);
		res.send(deviceArray);
	} catch (error) {
		res.status(400).send(error);
		throw error;
	}
};
const lockCheck = async (req, res) => {
	const assetTag = req.query.assetTag;
	const device = new Device(assetTag);
	try {
		await device.lockCheck();
		res.send(device.assetTag);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

/**
 * USER FUNCTIONS
 */
const getUser = async (req, res) => {
	const studentId = req.query.studentId;
	const options = {
		method: 'GET',
		url: `https://fwusd.snipe-it.io/api/v1/users`,
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${access_token}`,
			'Content-Type': 'application/json',
		},
		params: {
			employee_num: studentId,
		},
	};
	try {
		const response = await axios.request(options);
		res.status(200).send(response.data);
	} catch (error) {
		res.status(400).error(error);
		throw error;
	}
};

module.exports = {
	getChromebook,
	getDailys,
	checkIn,
	checkOut,
	getUser,
	lockCheck,
};
