const { default: axios } = require('axios');
const { getChromebookInfo, lockChromebook, unlockChromebook } = require('../../google/googleapis/admin');
require('dotenv').config();

class Device {
    /**
     * 
     * @param {string} assetTag ex. 1001234
     */
	constructor(assetTag) {
		this.assetTag = assetTag;
		this.serialNumber = null;
		this.snipeit = {
			id: null,
			status: {
				id: null,
				name: null,
				statusType: null,
				statusMeta: null,
			},
			location: {
				id: null,
				name: null,
			},
			assignedUser: {
				snipeitId: null,
                studentName: null,
				studentId: null,
			},
            isCheckedOut: false,
            checkoutDate: null,
		};
		this.google = {
			id: null,
			status: null,
			location: {
				id: null,
				path: null,
			},
			isLocked: false,
		};
	}

    /**
     * Functions
     */
    async lock() {
        try {
            await lockChromebook(this.google.id);
            const newGoogleData = await this.fetchGoogleData(this.serialNumber);
            this.google.status = newGoogleData.chromeosdevices[0].status;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async unlock() {
        try {
            await unlockChromebook(this.google.id);
            const newGoogleData = await this.fetchGoogleData(this.serialNumber);
            this.google.status = newGoogleData.chromeosdevices[0].status;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async checkout(student_id) {
        const options = {
            method: 'POST',
            url: `https://fwusd.snipe-it.io/api/v1/hardware/${this.snipeit.id}/checkout`,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data: {
                status_id: this.snipeit.status.id,
                checkout_to_type: 'user',
                assigned_user: student_id,
            },
        };
        try {
            const response = await axios.request(options);
            if (response.data) { 
                console.log('Successfully checked out the Chromebook.'); 
                await this.initializeDevice();
                if (this.google.status !== 'ACTIVE') {
                    await this.unlock();
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async checkin() {
        const options = {
            method: 'POST',
            url: `https://fwusd.snipe-it.io/api/v1/hardware/${this.snipeit.id}/checkin`,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data: {
                status_id: this.snipeit.status.id,
            },
        };
        try {
            const response = await axios.request(options);
            if (response.data) { 
                console.log('Successfully checked in the Chromebook.'); 
                await this.initializeDevice();
                if (this.google.status !== 'ACTIVE') {
                    await this.unlock();
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async overrideCheckout(student_id) {
        await this.checkin();
        await this.checkout(student_id);
    }


    /**
     * Check functions
     */
    async lockCheck() {
        const currentDate = new Date();
        const checkoutDate = new Date(this.snipeit.checkoutDate);
        const timeDifference = currentDate - checkoutDate;

        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

        if (timeDifference > oneDayInMilliseconds) {
            console.log(`Locking ${this.assetTag}...`);
            await this.lock();
        }
    }
    isCheckedOut() {
        if (this.snipeit.assignedUser.studentId) { return true; } 
        else { return false; }
    }


    /**
     * 
     * Variable initialization process for Chromebook
     * 
     */
	async initializeDevice() {
		try {
			await this.fetchSnipeitData(this.assetTag);
			await this.fetchGoogleData(this.serialNumber);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	/**
	 * Snipe-IT
	 */
	async fetchSnipeitData(assetTag) {
		const access_token = process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN;
		const options = {
			method: 'GET',
			url: `https://fwusd.snipe-it.io/api/v1/hardware/bytag/${assetTag}`,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
		};
		try {
			const response = await axios.request(options);
			this.addSnipeITData(response.data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	addSnipeITData(data) {
		this.serialNumber = data.serial;
		this.snipeit.id = data.id;
		this.snipeit.status.id = data.status_label.id;
		this.snipeit.status.name = data.status_label.name;
		this.snipeit.status.statusType = data.status_label.status_type;
		this.snipeit.status.statusMeta = data.status_label.status_meta;
		this.snipeit.location.id = data.rtd_location.id;
		this.snipeit.location.name = data.rtd_location.name;
		if (data.assigned_to.id) {
			this.snipeit.isCheckedOut = true;
            this.snipeit.checkoutDate = data.last_checkout.datetime;
			this.snipeit.assignedUser.snipeitId = data.assigned_to.id;
			this.snipeit.assignedUser.studentId = data.assigned_to.employee_number;
            this.snipeit.assignedUser.studentName = data.assigned_to.name;
		}
	}

	/**
	 * Google
	 */
	async fetchGoogleData(serialNumber) {
		try {
			const gInfo = await getChromebookInfo(serialNumber);
			this.addGoogleData(gInfo);
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
	addGoogleData(data) {
		this.google.id = data.chromeosdevices[0].deviceId;
		this.google.status = data.chromeosdevices[0].status;
		this.google.location.id = data.chromeosdevices[0].orgUnitId;
		this.google.location.path = data.chromeosdevices[0].orgUnitPath;
		if (data.chromeosdevices[0].status === 'DISABLED') {
			this.google.isLocked = true;
		}
	}
}

module.exports = Device;
