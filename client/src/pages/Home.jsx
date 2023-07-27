// Home.jsx
import React from 'react';
import GetNameFromStudentIDForm from '../elements/forms/powerschool/GetNameFromStudentIDForm';

export default function Home() {

	return (
		<div id="homepage-container">
			<div className="row-container">
				<GetNameFromStudentIDForm />
			</div>
		</div>
	);
}
