import React, { CSSProperties } from 'react';

import { TChildren } from '../../types/plugin.types';

import './button.scss';

type ButtonProps = {
	children: TChildren;
	onClick?: (e?: any) => void;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	size?: 'small' | 'normal' | 'big';
	color?: 'gray' | 'green' | 'transparent';
	mode?: 'default' | 'major' | 'primary' | 'secondary';
	style?: CSSProperties;
	title?: string;
	icon?: string;
	disabled?: boolean;
	otherProps?: any;
};

export const Button = (props: ButtonProps) => {
	const {
		className,
		children,
		onClick,
		type,
		title,
		style,
		size,
		color,
		mode,
		disabled,
		otherProps,
	} = props;
	const buttonProps: any = {
		className: `button ${className || ''} ${size || 'normal'} ${color || ''} ${
			mode || ''
		}`,
	};

	if (type) {
		buttonProps.type = type;
	}

	if (onClick) {
		buttonProps.onClick = onClick;
	}

	if (style) {
		buttonProps.style = style;
	}

	if (title) {
		buttonProps.title = title;
	}

	if (disabled) {
		buttonProps.disabled = disabled;
	}

	return (
		<button {...buttonProps} {...otherProps}>
			{children}
		</button>
	);
};
