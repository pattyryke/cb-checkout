const google = require('googleapis');
const snipeit = require('../../snipeit/SnipeITController');
const { default: axios } = require('axios');
require('dotenv').config();


class Device {
    /**
     * 
     * @param {string} assetTag Asset tag of the Chromebook
     */
    constructor(assetTag) {
        this.assetTag = assetTag;
        // this.serialNumber = this.getSerialNumber(assetTag).serial;
        // this.snipeitId = this.getSerialNumber(assetTag).id;
        // this.snipeitStatusLabel = this.getSerialNumber(assetTag).status_label;
        // this.snipeitLocationInfo = this.getSerialNumber(assetTag).rtd_location;
    }

    /**
     * Snipe-IT
     */
    async getSerialNumber() {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/snipeit/chromebook/${this.assetTag}`
        };
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Device;