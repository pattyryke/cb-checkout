import axios from 'axios';
import React, { useState } from 'react';
import ConfirmationPage from './assets/ConfirmationPage_CheckIn';

export default function CheckInChromebookForm() {
	const [checkInDate, setCheckInDate] = useState('');
	const [tag, setTag] = useState('');
	const [showConfirmation, setShowConfirmation] = useState(false);

	const getCurrentDate = () => {
		const date = new Date();
		return date;
	};
	const adjustSQL = async () => {
		const data = {
			cb_asset_tag: tag,
			date_checkin: checkInDate,
		};
		const config = { headers: { 'Content-Type': 'application/json' } };

		await axios.post('http://localhost:3000/sql/adjust-database', data, config).catch((err) => {
			console.log(`Error in adjustSQL: ${err}`);
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const date = getCurrentDate();
		setCheckInDate(date);

		const cb_asset_tag = event.target.assetTagInput.value;
		setTag(cb_asset_tag);

		setShowConfirmation(true);
		event.target.reset();
	};
	const handleConfirmation = async (confirmed) => {
		if (confirmed) {
			adjustSQL();
		}
		console.log(`Chromebook check-in process complete.`);
		setShowConfirmation(false);
	};

	return (
		<div id="check-in-option">
			<h2>CHROMEBOOK CHECK-IN FORM</h2>
			<form id="check-in-cb" onSubmit={handleSubmit}>
				<input type="text" id="assetTagInput" placeholder="Asset Tag Number" />

				<button type="submit" id="cb-asset-tag-submit-button">
					SUBMIT
				</button>
			</form>

			{showConfirmation && <ConfirmationPage handleConfirmation={handleConfirmation} tag={tag} />}
		</div>
	);
}
