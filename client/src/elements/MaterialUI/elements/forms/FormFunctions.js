import axios from 'axios';

import FormCheckOut from '../../../forms/FormCheckOut';

/**
 *  Form handlers
 */
const handleGetNameForm = async (result) => {
	const name = await getName(result);
	console.log(result);
	console.log(name);
};
const handleCheckInForm = (result) => {
	console.log(result);
};
const handleCheckOutForm = (result) => {
	FormCheckOut(result);
};

/**
 *  Functions
 */

// Function to add check out data to mySQL database
const adjustSQL = async (tag, date) => {
	const data = {
		cb_asset_tag: tag,
		date_checkin: date,
	};
	const config = { headers: { 'Content-Type': 'application/json' } };
	const url = 'http://localhost:3000/sql/adjust-database';

	await axios.post(url, data, config).catch((err) => {
		console.error(`Error adjusting mySQL database: ${err}`);
	});
};

const getChromebook = async (tag) => {
	try {
		const options = {
			method: 'GET',
			url: `http://localhost:3000/chromebook/${tag}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		};
		const response = await axios.request(options);
		return response;
	} catch (error) {
		console.error("Error in getChromebook: ", error);
	}
};

const getUser = async (studentID) => {
    try {
        const options = {
			method: 'GET',
			url: `http://localhost:3000/snipe-it/user/${studentID}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			params: {
                id: studentID,
            },
		};
		const response = await axios.request(options);
		console.log(`RESPONSE FROM getUser (client): ${response}`);
        return response; 
    } catch (error) {
        console.error("Error in getUser:", error);
        throw error;
    }
};

const POSTToSQL = async () => {
	const url = 'http://localhost:3000/sql/add-to-database';
	const config = { headers: { 'Content-Type': 'application/json' } };
	const data = {
		obj: infoObj,
	};
	await axios.post(url, data, config).catch((err) => {
		console.log(`Error in addToDatabase: ${err}`);
	});
};

const checkOutOnSnipeIT = async (studentID, userID, assetTag, CBInfo) => {
	try {
		const access_token = process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN;
		const chromebookID = CBInfo.id;
		const chromebookStatusID = CBInfo.status_label.id;

		const requestData = {
			stuID: studentID,
			statusID: chromebookStatusID,
			cbID: chromebookID,
			userID: userID,
		};

		const options = {
			method: 'POST',
			url: `http://localhost:3000/chromebook/check-out/${assetTag}/${studentID}`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${access_token}`,
				'Content-Type': 'application/json',
			},
			data: JSON.stringify(requestData),
		};
		const response = await axios.request(options);
		if (response.data) {
			console.log(`Successfully checked out!`)
		}
	} catch (err) {
		console.error('Error in checkOutOnSnipeIT ', err);
	}
};

const CheckIn = async (chromebook) => {
	try {
		const access_token = process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN;
		console.log(`CHROMEBOOK INFO: ${chromebook}`);
		const cbID = chromebook.id;
		const cbStatusID = chromebook.status_label.id;
		const requestData = {
			cbID: cbID,
			status_id: cbStatusID,
		};
		const options = {
			method: 'POST',
			url: `http://localhost:3000/chromebook/check-in`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${access_token}`,
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(requestData),
		};
		const response = await axios.request(options);
		if (response.data) {
			console.log(`Successfully checked in!`);
		}
	} catch (error) {
		console.error("Error in client CheckIn Function:", error);
	}
};

export { getChromebook, getUser, checkOutOnSnipeIT, CheckIn, POSTToSQL, adjustSQL, handleCheckInForm, handleCheckOutForm, handleGetNameForm };
