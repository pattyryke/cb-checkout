import axios, { AxiosHeaders } from 'axios';
import React, { useState, useEffect } from 'react';
import { getName } from '../powerschool/GetNameFromStudentIDForm';
import ConfirmationPage from './assets/ConfirmationPage_CheckOut';

export default function CheckOutChromebookByAssetTagForm() {
	const [infoObj, setInfoObj] = useState('');
	const [showConfirmation, setShowConfirmation] = useState(false);

	const getCBInfo = async (tag) => {
		try {
			const response = await axios.get(`http://localhost:3000/chromebook/${tag}`);
			const cbInfo = response.data;
			return cbInfo;
		} catch (error) {
			console.error('Error talking to SnipeIT on the server: ', error);
			return null;
		}
	};
	const getCurrentDate = () => {
		var date = new Date();
		return date;
	};
	const createFullInfoObj = async (info) => {
		const fullCBInfo = await getCBInfo(info.tag);
		const data = {
			student_id: info.id,
			student_name: info.name,
			cb_serial_num: fullCBInfo.serial,
			cb_asset_tag: info.tag,
			cb_full_info: fullCBInfo,
			date_checkout: getCurrentDate(),
			date_checkin: null,
			isLocked: false,
			isFeed: false,
			isCompleted: false,
		};
		return JSON.stringify(data);
	};
	const POSTToSQL = async () => {
		const data = {
			obj: infoObj,
		};
		const config = {
			headers: { 'Content-Type': 'application/json' },
		};
		await axios.post('http://localhost:3000/sql/add-to-database', data, config)
			.catch((err) => {
				console.log(`Error in addToDatabase: ${err}`);
			}
		);
	};
	const checkOutOnSnipeIT = async () => {
		const access_token = process.env.REACT_APP_SNIPEIT_ACCESS_TOKEN;
		try{
			const response = await axios.get(`http://localhost:3000/chromebook/assign/${infoObj.cb_asset_tag}/${infoObj.student_id}`, {
				headers: {
					'Authorization': `Bearer ${access_token}`,
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'asset_tag': `${infoObj.cb_asset_tag}`,
				},
				params: {
					location: 'HS Daily Chromebooks',
				}
			})
				.catch((err) => {
					console.log(`Error in addToDatabase: ${err}`);
				}
			);
			console.log(response);
		} catch (err) {
			console.error('Error in checkOutOnSnipeIT ', err);
		}
		
	};


	const handleSubmit = async (event) => {
		event.preventDefault();
		const info = {
			tag: event.target.assetTagInput.value,
			id: event.target.studentIDInput.value,
			name: await getName(event.target.studentIDInput.value),
			serial: await getCBInfo(event.target.assetTagInput.value),
		};

		const fullInfoObj = await createFullInfoObj(info);
		setInfoObj(JSON.parse(fullInfoObj));
		setShowConfirmation(true);
		event.target.reset();
	};

	const handleConfirmation = async (confirmed) => {
		if (confirmed) {
			if (infoObj) {
				POSTToSQL();
				checkOutOnSnipeIT();
			}
		}
		console.log('Chromebook check out process complete.');
		setShowConfirmation(false);
	};

	useEffect(() => {
		console.log(`Updated infoObj:`, infoObj);
	}, [infoObj]);

	return (
		<div id="check-out-option">
			<h2>CHROMEBOOK CHECK-OUT FORM</h2>
			<form id="check-out-cb" onSubmit={handleSubmit}>
				<input type="text" id="assetTagInput" placeholder="Asset Tag Number" />

				<input type="text" id="studentIDInput" placeholder="Student ID Number" />

				<button type="submit" id="cb-asset-tag-submit-button">
					SUBMIT
				</button>
			</form>

			{showConfirmation && <ConfirmationPage handleConfirmation={handleConfirmation} infoObj={infoObj} />}
		</div>
	);
}
