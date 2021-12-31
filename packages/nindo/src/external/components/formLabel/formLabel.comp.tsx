import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { TChildren } from '../../types/plugin.types';

type FormLabelProps = {
	isPremium?: boolean;
	otherProps?: any;
	children: TChildren;
};

export const FormLabel = (props: FormLabelProps) => {
	const { isPremium, children, otherProps } = props;

	return (
		<label {...(otherProps || {})}>
			{isPremium && <FontAwesomeIcon icon={faStar} className="premium-star" />}
			{children && children}
		</label>
	);
};
