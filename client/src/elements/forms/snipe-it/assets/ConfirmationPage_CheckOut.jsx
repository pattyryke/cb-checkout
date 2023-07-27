import React from "react";

export default function ConfirmationPage({ handleConfirmation, infoObj }) {
    const insertHyphen = (string) => {
        return string.slice(0, 1) + "-" + string.slice(1);
    }


    const stu_id = infoObj.student_id;
    const stu_name = infoObj.student_name;
    const asset_tag = insertHyphen(infoObj.cb_asset_tag);
    const confirmation_message = `Are you sure you want to check out this Chromebook (${asset_tag}) to ${stu_name} (${stu_id})?`;


    const confirmCheckout = () => {
        handleConfirmation(true);
    };

    const cancelCheckout = () => {
        handleConfirmation(false);
    };

    return (
        <div className="confirmation">
            <p>
                {confirmation_message}
            </p>
            <div className="confirmation-buttons">
                <button onClick={confirmCheckout}>Yes</button>
                <button onClick={cancelCheckout}>No</button>
            </div>
        </div>
    );
}
