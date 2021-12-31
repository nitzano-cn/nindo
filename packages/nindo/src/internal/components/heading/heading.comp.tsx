import React from 'react';

import { TChildren } from '../../../external/types/plugin.types';

import './heading.scss';

interface IHeadingProps {
	children: TChildren;
	accented?: boolean;
	[x: string]: any;
}

export const H1 = ({ children, className, ...rest }: IHeadingProps) => (
	<h1 className={`heading-1 ${className || ''}`} {...(rest || {})}>
		{children}
	</h1>
);

export const H2 = ({ children, className, ...rest }: IHeadingProps) => (
	<h2 className={`heading-2 ${className || ''}`} {...(rest || {})}>
		{children}
	</h2>
);

export const H3 = ({
	children,
	className,
	accented,
	...rest
}: IHeadingProps) => (
	<h3
		className={`heading-3 ${className || ''} ${accented ? 'accented' : ''}`}
		{...(rest || {})}
	>
		{children}
	</h3>
);

export const H4 = ({ children, className, ...rest }: IHeadingProps) => (
	<h4 className={`heading-4 ${className || ''}`} {...(rest || {})}>
		{children}
	</h4>
);

export const H5 = ({ children, className, ...rest }: IHeadingProps) => (
	<h5 className={`heading-5 ${className || ''}`} {...(rest || {})}>
		{children}
	</h5>
);

export const H6 = ({ children, className, ...rest }: IHeadingProps) => (
	<h6 className={`heading-6 ${className || ''}`} {...(rest || {})}>
		{children}
	</h6>
);
