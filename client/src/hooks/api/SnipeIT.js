import axios from 'axios';


export async function getChromebook(assetTag) {
    const options = {
        method: 'GET',
        url: `http://localhost:3000/snipeit/device`,
        params: {
            assetTag: assetTag
        }
    };
    try {
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function checkIn(assetTag) {
    const options = {
        method: 'POST',
        url: 'http://localhost:3000/snipeit/check-in',
        params: {
            assetTag: assetTag
        }
    };
    try {
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function checkOut(assetTag, studentId) {
    const options = {
        method: 'POST',
        url: 'http://localhost:3000/snipeit/check-out',
        params: {
            assetTag: assetTag,
            studentId: studentId,
        }
    };
    try {
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export async function getUser() {
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
    try {
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};