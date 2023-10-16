import { useState } from 'react';
import { adjustSQL } from '../MaterialUI/elements/forms/FormFunctions';

export default function FormCheckOut(result) {
	const [id, setID] = useState('');
	const [name, setName] = useState('');
	const [tag, setTag] = useState('');
	const [date, setDate] = useState('');

	// Function to get the current date
	const setCurrentDate = () => {
		const currentDate = new Date();
		return currentDate;
	};

	// Function to prompt for assetTag
	const promptForTag = async () => {
		console.log('prompt popup');
		const tagPrompt = prompt(`Please input the tag number of the Chromebook you are checking out for ${name}.`);
		if (tagPrompt) {
			return tagPrompt;
		}
	};

	const runCheckOut = async (studentID) => {
		setID(studentID);
		const studentName = await getName(id);
		if (studentName) {
			setName(studentName);
			const currentDate = setCurrentDate();
			setDate(currentDate);
			const tagPrompt = promptForTag();
			if (tagPrompt) {
				setTag(tagPrompt);
				await adjustSQL(tag, date);
				const completed = document.createTextNode('Completed check out process.');
				const resElement = document.getElementById('result');
				resElement.appendChild(completed);
			}
		}
	};

	runCheckOut(result);
}
