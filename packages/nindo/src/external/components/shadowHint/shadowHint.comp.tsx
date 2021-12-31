import React, { CSSProperties } from 'react';
import { useInView } from 'react-intersection-observer';

import './shadowHint.scss';

interface IShadowHintProps {
	direction: 'top' | 'bottom' | 'left' | 'right';
	shadowStyle?: CSSProperties;
}

export const ShadowHint = ({
	direction,
	shadowStyle = {},
}: IShadowHintProps) => {
	const [ref, inView] = useInView({
		threshold: 0,
	});

	return (
		<>
			<span className={`shadow-hint-ref ${direction}`} ref={ref}></span>
			<div
				className={`shadow-hint ${direction} ${inView ? 'in-view' : ''}`}
				style={shadowStyle}
			></div>
		</>
	);
};
