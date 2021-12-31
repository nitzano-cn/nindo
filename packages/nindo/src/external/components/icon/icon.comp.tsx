import React, { CSSProperties } from 'react';

import { TPluginIcon, iconToNumberOfPaths } from '../../types/icon.types';

// requires import fonts from https://www.commoninja.com/static/styles/fonts.css

type TSystemIcon =
	| 'arrow-left'
	| 'arrow-right'
	| 'chevron-down'
	| 'chevron-right'
	| 'chevron-up'
	| 'copy'
	| 'corner-right-down'
	| 'external-link'
	| 'facebook'
	| 'linkedin'
	| 'twitter'
	| 'minus'
	| 'plus'
	| 'search'
	| 'star-empty-1'
	| 'star-empty'
	| 'star-full'
	| 'analytics'
	| 'coding'
	| 'customize'
	| 'edit'
	| 'file-csv'
	| 'google-drive'
	| 'quick'
	| 'responsive'
	| 'url'
	| 'slice-1'
	| 'slice-2'
	| 'slice-3'
	| 'gdpr'
	| 'check'
	| 'close'
	| 'menu'
	| 'drag'
	| 'delete'
	| 'engagment'
	| 'time'
	| 'content'
	| 'youtube'
	| 'rss'
	| 'wordpress'
	| 'vimeo'
	| 'joomla-logo'
	| 'shopify-logo'
	| 'webflow-logo'
	| 'weebly-logo'
	| 'wix-logo'
	| 'wordpress-logo'
	| 'joomla-icon'
	| 'shopify-icon'
	| 'webflow-icon'
	| 'weebly-icon'
	| 'wix-icon'
	| 'wordpress-icon';

interface IIconProps {
	type: TPluginIcon | TSystemIcon;
	size?: number;
	title?: string;
}

export const NinjaIcon = ({ type, size }: IIconProps) => {
	const style: CSSProperties = {};

	if (size) {
		style.fontSize = `${size}px`;
	}

	return (
		<i className={`icon-${type}`} style={style}>
			{Array.from(new Array(iconToNumberOfPaths[type] || 1)).map((x, i) => (
				<span key={`icon_path_${type}_${i}`} className={`path${i + 1}`}></span>
			))}
		</i>
	);
};

export const SystemIcon = ({ type, size, title }: IIconProps) => {
	const style: CSSProperties = {};

	if (size) {
		style.fontSize = `${size}px`;
	}

	return <i className={`icon-${type}`} style={style} title={title || ''}></i>;
};
