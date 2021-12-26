import React from 'react';

import { fontsList } from '../../helpers/font.helper';
import { FormRow } from '../formRow/formRow.comp';
import { FormLabel } from '../formLabel/formLabel.comp';

interface IFontFamilySelectorProps {
	selectedFontId: string;
	updateFont: (fontId: string) => void;
}

export const FontFamilySelector = ({
	selectedFontId,
	updateFont,
}: IFontFamilySelectorProps) => {
	return (
		<FormRow>
			<FormLabel>Font Type</FormLabel>
			<select
				value={selectedFontId || 'font_open_sans'}
				onChange={(e) => updateFont(e.target.value)}
			>
				{fontsList.map((font) => (
					<option key={`option_${font.id}`} value={font.id}>
						{font.name}
					</option>
				))}
			</select>
		</FormRow>
	);
};
