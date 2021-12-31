import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './datePicker.scss';

const isSSR: boolean = typeof document === 'undefined';
const portalElmId = 'date-picker-portal';
let portalRoot: any = null;

if (!isSSR) {
	portalRoot = document.getElementById(portalElmId) as HTMLDivElement;

	if (!portalRoot) {
		portalRoot = document.createElement('div');
		portalRoot.setAttribute('id', portalElmId);
		document.body.append(portalRoot);
	}
}

export const DatePicker = (props: ReactDatePickerProps) => {
	return (
		<div className="date-picker-wrapper">
			<ReactDatePicker {...props} portalId={portalElmId} />
		</div>
	);
};
