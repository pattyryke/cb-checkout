const { google } = require('googleapis');

const people = google.people('v1');



const getUserInfo = (access_token) => {
	return new Promise((resolve, reject) => {
		people.people.get(
			{
				resourceName: 'people/me',
				personFields: 'emailAddresses,names'
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

module.exports = { getUserInfo };
