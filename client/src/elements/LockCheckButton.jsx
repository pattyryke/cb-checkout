import React from "react";
import axios from "axios";
import checkAuth from "./google/utils/googleUtils";

export default function LockCheckButton() {

    const isLate = (device) => {
        const deviceDateISO = device.date_checkout;
        const deviceDate = new Date(deviceDateISO);
        const currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        console.log(currentDate);
        console.log(deviceDate);
        if (deviceDate < currentDate) {
            return true;
        } else {
            return false;
        }
    };
    
    const getCheckedOutDevices = async () => {
        try {
            const response = await axios.get('http://localhost:3000/sql/request-all-chromebooks');
            return response.data;
        } catch (error) {
            console.error('Error in LockCheckButton.jsx: ', error);
        }
    };
    const lockChromebook = async (device) => {
        try {
            const check = checkAuth();
            console.log('check = '+ check);
            const serial = device.cb_serial_num;
            const response = await axios.get(`http://localhost:3000/google/lock/${serial}`);
            console.log(response);
        } catch(err) {
            console.error('Error while locking Chromebooks: '+ err);
        }
    };

    const handleClick = async () => {
        const checkedOutDevices =  await getCheckedOutDevices();
        checkedOutDevices.forEach(device => {
            if (isLate(device)) {
                console.log(`${device.cb_asset_tag} is late. Locking now...`)
                lockChromebook(device);
            } else {
                console.log(`${device.cb_asset_tag} is good. Checking next device...`)
            }
        });
    };

    return (
        <button type="button" onClick={handleClick} id="LockCheckButton">
            RUN CHROMEBOOK LOCK CHECK
        </button>
    );
}