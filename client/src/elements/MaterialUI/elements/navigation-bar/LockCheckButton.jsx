import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container } from '@mui/material';

export default function LockCheckButton() {
	const getChromebookID = async (lockList) => {
		console.log('lockCheck in getChromebookID:', lockList);
		try {
			const promises = lockList.map(async (serial_num) => {
				const options = {
					method: 'GET',
					url: 'http://localhost:3000/google/chromebooks/get-id',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					params: {
						serialNum: serial_num,
					},
				};
				const response = await axios.request(options);
				return response.data;
			});
			
			const results = await Promise.all(promises);
			return results;
		} catch (error) {
			console.error("LockCheckButton: Error in getChromebookID:", error);
		}
	};
	
	
	const lockChromebooks = async (devices) => {
		try {
			const promises = devices.map(async (deviceObj) => {
				const options = {
					method: 'GET',
					url: 'http://localhost:3000/google/chromebooks/lock',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					params: {
						deviceId: deviceObj.deviceId,
						status: deviceObj.status,
					},
				};
				const response = await axios.request(options);
				console.log(response);
			});
	
			await Promise.all(promises);
		} catch (error) {
			console.error("Error in lockChromebooks:", error);
		}
	};

	
	const lockCheck = async (chromebooks) => {
		const lockList = [];
		try {
			chromebooks.forEach((cb) => {
				const currentDate = new Date();
				const checkoutDate = new Date(cb.last_checkout.datetime);
				
				const timeDifference = currentDate.getTime() - checkoutDate.getTime();

				if (timeDifference >= 24 * 60 * 60 * 1000) {
					console.log(cb.serial);
					lockList.push(cb.serial);
				}
			});
			return lockList;
		} catch (error) {
			console.error("Error in lockCheck:", error);
			throw error;
		}
	};
	

	const getChromebooks = async () => {
		const options = {
			method: 'GET',
			url: 'http://localhost:3000/chromebooks/dailys',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		};

		try {
			const response = await axios.request(options);
			return response.data;
		} catch (error) {
			console.error("Error in LockCheckButton getChromebooks():", error);
			throw error;
		}
	};

	const handleClick = async () => {
		const options = {
			method: 'GET',
			url: 'http://localhost:3000/based',
		};
		const response = axios.request(options);
		// const chromebooks = await getChromebooks();
		// const cbList = chromebooks.rows;
		// console.log('chromebooks:', chromebooks);

		// const chromebooksToLock = await lockCheck(cbList);

		// const devicesPromises = await getChromebookID(chromebooksToLock);
		// const devices = await Promise.all(devicesPromises);
		// console.log(devices);
		// const response = await lockChromebooks(devices);
		
		// console.log(response);
	};

	return (
		<Container
			fixed
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignContent: 'center',
			}}>
			<Button variant="contained" size="small" id="LockCheckButton" onClick={handleClick}>
				Lock Chromebooks
			</Button>
		</Container>
	);
}
