// Home.jsx
import React from 'react';
import StudentIDToName from '../elements/forms/form-id-to-name';

export default function Home() {
	return (
		<div id="homepage-container">
			<div className="row-container">
				<StudentIDToName />
			</div>
		</div>
	);
}
