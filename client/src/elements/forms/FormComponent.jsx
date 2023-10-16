import React, { useState } from 'react';



const FormComponent = ({ title, onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
    };

    return(
        <div>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter value here..."
                />
                <button type="submit">Submit</button>
            </form>
            <div id='result'></div>
        </div>
    );
};

export default FormComponent;