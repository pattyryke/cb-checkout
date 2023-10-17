import axios from 'axios';



/**
 *  Functions
 */
const getChromebook = async (tag) => {
	try {
		const options = {
			method: 'GET',
			url: `http://localhost:3000/snipeit/chromebook/${tag}`,
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

const getUser = async (studentId) => {
    try {
        const options = {
			method: 'GET',
			url: `http://localhost:3000/snipeit/user`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			params: {
                studentId: studentId,
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


const checkOutOnSnipeIT = async (studentId, userID, assetTag, CBInfo) => {
	try {
		const access_token = process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN;
		const chromebookID = CBInfo.id;
		const chromebookStatusID = CBInfo.status_label.id;

		const requestData = {
			stuID: studentId,
			statusID: chromebookStatusID,
			cbID: chromebookID,
			userID: userID,
		};

		const options = {
			method: 'POST',
			url: `http://localhost:3000/snipeit/check-out`,
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${access_token}`,
				'Content-Type': 'application/json',
			},
			params: {
				assetTag: assetTag,
				studentId: studentId
			}
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
			url: `http://localhost:3000/snipeit/check-in`,
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

export { getChromebook, getUser, checkOutOnSnipeIT, CheckIn };
