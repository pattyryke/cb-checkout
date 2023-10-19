import React from 'react';
import axios from 'axios';
import { Button, Container } from '@mui/material';

export default function GoogleDeviceLockButton() {
	const getChromebooks = async () => {
		const options = {
			method: 'GET',
			url: 'http://localhost:3000/snipeit/dailys',
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


	const lockCheck = (chromebooks) => {
		try {
			const promises = chromebooks.map(async (cb) => {
				const options = {
					method: 'GET',
					url: 'http://localhost:3000/snipeit/lockCheck',
					params: {
						assetTag: cb.assetTag,
					}
				};
				const response = await axios.request(options);
				return response.data;
			});
			return promises;
		} catch (error) {
			console.error("Error in lockCheck:", error);
			throw error;
		}
	};
	


	const handleClick = async () => {
		const chromebooks = await getChromebooks();
		const cbLockListPromises = await lockCheck(chromebooks);
		const cbLockList = await Promise.all(cbLockListPromises);
		console.log(cbLockList);
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
