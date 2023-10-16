import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DatabaseDisplay() {
	const [table, setTable] = useState([]);
	const [condition, setCondition] = useState(`WHERE isCompleted = 0`);

	const setFilter = (option) => {
		var x = '';
		switch (option) {
			case 'incomplete':
				x = 'WHERE isCompleted = 0';
				break;
			case 'complete':
				x = 'WHERE isCompleted = 1';
				break;
			case 'locked':
				x = 'WHERE isLocked = 1';
				break;
			case 'feed':
				x = 'WHERE isFeed = 1';
				break;
			case 'all':
				x = '';
				break;
		}
		setCondition(x);

		console.log(`Option is set to: ${option}`);
	};

	const fetchData = (body) => {
		const params = { display: body };

		axios
			.get('http://localhost:3000/sql/display', { params })
			.then((response) => {
				setTable(response.data[0]);
			})
			.catch((error) => {
				console.error('Error fetching data from the server:', error);
			});
	};

	const generateTable = (array) => {
		return (
			<table border="2">
				<tbody>
					{array.map((obj, index) => (
						<tr key={index}>
							{Object.values(obj).map((value, index) => (
								<td key={index}>{value}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	const handleChange = (event) => {
		const selectedOption = event.target.value;
		setFilter(selectedOption);
	};

	useEffect(() => {
		console.log(condition);
		fetchData(condition);
	}, [condition]);

	return (
		<div>
			<h2>Database Display</h2>
			<select onChange={handleChange} id="condition">
				<option value="incomplete">Currently Checked Out</option>
				<option value="locked">Locked Check-outs</option>
				<option value="feed">Feed Check-outs</option>
				<option value="complete">Completed Check-outs</option>
				<option value="all">All Check-outs</option>
			</select>
			{generateTable(table)}
		</div>
	);
}
