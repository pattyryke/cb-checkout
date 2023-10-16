// Home.jsx
import React from 'react';
import StudentIDToName from '../elements/MaterialUI/elements/forms/form-id-to-name';

export default function Home() {

	return (
		<div id="homepage-container">
			<div className="row-container">
				<StudentIDToName />
			</div>
		</div>
	);
}