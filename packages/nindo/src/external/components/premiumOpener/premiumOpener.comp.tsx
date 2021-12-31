import React from 'react';

import { TChildren } from '../../types/plugin.types';

import './premiumOpener.scss';

type PremiumOpenerProps = {
	children: TChildren;
};

export const PremiumOpener = (props: PremiumOpenerProps) => {
	function onClick() {
		const openerElm = document?.getElementById(
			'premium-popup-opener'
		) as HTMLElement;
		if (openerElm) {
			openerElm.click();
		}
	}

	return (
		<span onClick={onClick} className="premium-opener-trigger">
			{props.children}
		</span>
	);
};
