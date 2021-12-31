import React, { CSSProperties } from 'react';

import { TChildren } from '../../types/plugin.types';

import './loader.scss';

type LoaderProps = {
	children?: TChildren;
	size?: 'normal' | 'small' | 'big';
	className?: string;
	outerColor?: string;
	innerColor?: string;
};

export const Loader = (props: LoaderProps) => {
	const outerLoaderStyle: CSSProperties = {};
	const innerLoaderStyle: CSSProperties = {};

	if (props.outerColor) {
		outerLoaderStyle.borderTopColor = props.outerColor;
		outerLoaderStyle.borderBottomColor = props.outerColor;
	}

	if (props.innerColor) {
		innerLoaderStyle.borderTopColor = props.innerColor;
		innerLoaderStyle.borderBottomColor = props.innerColor;
	}

	return (
		<div className={`loader ${props.className || ''} ${props.size || ''}`}>
			<div className="outer" style={outerLoaderStyle}>
				<div className="inner" style={innerLoaderStyle}></div>
			</div>
			{props.children && props.children}
		</div>
	);
};
