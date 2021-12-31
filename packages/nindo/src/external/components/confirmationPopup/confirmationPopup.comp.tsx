import React from 'react';

import { Popup } from '../popup/popup.comp';

import './confirmationPopup.scss';

interface ConfirmationPopupProps {
	title: string;
	message: string;
	show: boolean;
	approveButtonText?: string;
	closeCallback: () => void;
	approveCallback: () => void;
}

export const ConfirmationPopup = (props: ConfirmationPopupProps) => {
	const {
		show,
		title,
		message,
		closeCallback,
		approveCallback,
		approveButtonText,
	} = props;

	return (
		<Popup
			show={show}
			className="confirmation-popup"
			closeCallback={closeCallback}
		>
			<React.Fragment>
				<h2>{title}</h2>
				<section dangerouslySetInnerHTML={{ __html: message }}></section>
				<div className="buttons-wrapper center">
					<button className="button transparent" onClick={closeCallback}>
						Cancel
					</button>
					<button className="button green" onClick={approveCallback}>
						{approveButtonText || 'Approve'}
					</button>
				</div>
			</React.Fragment>
		</Popup>
	);
};
