import React from "react";

export default function ConfirmationPage({ handleConfirmation, tag }) {
    const insertHyphen = (string) => {
        return string.slice(0, 1) + "-" + string.slice(1);
    }

    const asset_tag = insertHyphen(tag);
    const confirmation_message = `Are you sure you want to check in this Chomebook (${asset_tag})?`;


    const confirmCheckin = () => {
        handleConfirmation(true);
    };

    const cancelCheckin = () => {
        handleConfirmation(false);
    };

    return (
        <div className="confirmation">
            <p>
                {confirmation_message}
            </p>
            <div className="confirmation-buttons">
                <button onClick={confirmCheckin}>Yes</button>
                <button onClick={cancelCheckin}>No</button>
            </div>
        </div>
    );
}
