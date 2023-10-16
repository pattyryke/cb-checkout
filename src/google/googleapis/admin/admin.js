const { promises } = require('fs');
const { google } = require('googleapis');
const { resolve, reject } = require('promise');
require('dotenv').config();

const customer_id = process.env.REACT_APP_CUSTOMER_ID;

const admin = google.admin('directory_v1');

/**
 *  FUNCTIONS
 */
const getChromebookID = (serial_num) => {
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
	 * @param {string} deviceId Google's resource ID for ChromeOS device
	 * 
	 * 
	 * Combine lockChromebook and getChromebookID
	 * return the serial numbers and the status in JSON format
	 * result = {
	 * 		device1: {
	 * 			serialNum: '12345',
	 * 			status: 'DISABLED'
	 * 		},
	 * 		device2: {
	 * 			serialNum: '54321',
	 * 			status: 'DISABLED'
	 * 		}
	 * }
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

};

const checkChromebookStatus = (deviceId) => {

};


module.exports = {
	getChromebookID,
	lockChromebook,
	unlockChromebook,
	checkChromebookStatus
}