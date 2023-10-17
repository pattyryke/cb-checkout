const { google } = require('googleapis');
require('dotenv').config();

const customer_id = process.env.REACT_APP_CUSTOMER_ID;

const admin = google.admin('directory_v1');

/**
 *  FUNCTIONS
 */
const getChromebookInfo = (serial_num) => {
	/**
	 * @param {string} serial_num Serial number of the Chromebook
	 */
	return new Promise((resolve, reject) => {
		console.log('admin.js:', serial_num);
		admin.chromeosdevices.list(
			{
				customerId: customer_id,
				query: serial_num,
			},
			(error, response) => {
				if (error) {
					console.error(error);
					reject(error);
				} else {
					resolve(response.data);
				}
			}
		);
	});
};

const lockChromebook = (deviceId) => {
	/**
	 * @param {string} deviceId Google provided Device ID 
	 */
	return new Promise((resolve, reject) => {
		admin.chromeosdevices.action(
			{
				customerId: customer_id,
				resourceId: deviceId,
				requestBody: {
					action: 'disable'
				}
			},
			(error, response) => {
				if (error) {
					console.error(error);
					reject(error);
				} else {
					resolve(response.data);
				}
			}
		);
	});
};

const unlockChromebook = (deviceId) => {
	/**
	 * @param {string} deviceId Google provided Device ID 
	 */
	return new Promise((resolve, reject) => {
		admin.chromeosdevices.action(
			{
				customerId: customer_id,
				resourceId: deviceId,
				requestBody: {
					action: 'reenable'
				}
			},
			(error, response) => {
				if (error) {
					console.error(error);
					reject(error);
				} else {
					resolve(response.data);
				}
			}
		);
	});
};



module.exports = {
	getChromebookInfo,
	lockChromebook,
	unlockChromebook
}