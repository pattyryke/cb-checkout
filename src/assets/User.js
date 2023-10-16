const { clientCommands } = require('../sessions/redisClient');



class User {
	/**
	 * 
	 * @param {string} id 
	 * @param {string} displayName 
	 * @param {string} email 
	 * @param {string} idToken 
	 * @param {string} accessToken 
	 * @param {string} refreshToken 
	 * @param {string} expiryDate 
	 * @param {string} tokenType 
	 * @param {string} scope 
	 */
	constructor(id, displayName, email, idToken, accessToken, refreshToken, expiryDate, tokenType, scope) {
		this.id = id;
		this.displayName = displayName;
		this.email = email;
		this.idToken = idToken;
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.expiryDate = expiryDate;
		this.tokenType = tokenType;
		this.scope = scope;
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
			}
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
