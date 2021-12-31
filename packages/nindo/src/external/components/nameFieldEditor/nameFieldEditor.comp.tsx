import React from 'react';
import { useDispatch } from 'react-redux';

import { nameUpdated } from '../../../internal/actions/plugin.actions';
import { FormLabel } from '../formLabel/formLabel.comp';
import { FormRow } from '../formRow/formRow.comp';

export const NameFieldEditor = ({ currentValue }: { currentValue: string }) => {
	const dispatch = useDispatch();

	function setPluginName(value = '') {
		dispatch(nameUpdated(value));
	}

	return (
		<FormRow>
			<FormLabel>Main Title</FormLabel>
			<input
				type="text"
				value={currentValue}
				placeholder="Enter title..."
				onChange={(e) => setPluginName(e.target.value)}
			/>
		</FormRow>
	);
};
