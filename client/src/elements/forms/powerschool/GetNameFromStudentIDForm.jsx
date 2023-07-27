import axios from 'axios';
import React, { useState } from 'react';
import ResultElement from './assets/ResultElement';

export function getName(id) {
	return axios
		.get(`http://localhost:3000/student/${id}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.error('Error getting student name:', error);
		});
}

export default function GetNameFromStudentIDForm() {
	const [result, setResult] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		const studentId = event.target.studentIDInput.value;
		const name = await getName(studentId);
		setResult(name);
		event.target.reset();
	};

	return (
		<div id="check-in-option">
			<h2>Get the student's name from their ID number</h2>
			<form id="check-in-cb" onSubmit={handleSubmit}>
				<input type="text" id="studentIDInput" placeholder="Student ID Number" />
				<button type="submit" id="studentIDSubmitButton">
					SUBMIT
				</button>
			</form>

			{result && <ResultElement content={result} />}
		</div>
	);
}
