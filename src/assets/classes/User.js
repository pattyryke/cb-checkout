const { clientCommands } = require('../../redis/redisClient');

class User {
	/**
	 *
	 * @param {string} id
	 * @param {string} displayName
	 * @param {string} email
	 */
	constructor(id, displayName, email) {
		this.id = id;
		this.displayName = displayName;
		this.email = email;
		this.isAuthenticated = null;
		this.creds = {
			refresh_token: null,
			expiry_date: null,
			access_token: null,
			token_type: null,
			id_token: null,
			scope: null
		};
	}

	async setUserCreds(refreshToken, expiryDate, accessToken, tokenType, idToken, scope) {
		this.isAuthenticated = true;
		this.creds.refresh_token = refreshToken;
		this.creds.expiry_date = expiryDate;
		this.creds.access_token = accessToken;
		this.creds.token_type = tokenType;
		this.creds.id_token = idToken;
		this.creds.scope = scope;
	}

	static async getUser() {
		try {
			const user = await clientCommands.get('currentUser');
			return user;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	static async getCreds() {
		try {
			const currentUser = await clientCommands.get('currentUser');
			const creds = {
				refresh_token: currentUser.refreshToken,
				expiry_date: currentUser.expiryDate,
				access_token: currentUser.accessToken,
				token_type: currentUser.tokenType,
				id_token: currentUser.idToken,
				scope: currentUser.scope,
			};
			return creds;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	static async checkCreds() {
		try {
			const user = await this.getUser();
			if (user.accessToken) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

module.exports = User;
