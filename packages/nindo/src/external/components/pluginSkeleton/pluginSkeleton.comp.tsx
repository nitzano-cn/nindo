import React from 'react';
import { NinjaSkeleton, NinjaSkeletonTheme } from '../skeleton/skeleton.comp';
import { getLuminance, darken, lighten } from 'color2k';

import { TPluginMode } from '../../types/plugin.types';

import './pluginSkeleton.scss';

export const PluginSkeleton = ({
	leadColor,
	mode,
}: {
	leadColor?: string;
	mode: TPluginMode;
}) => {
	let color = 'rgba(255,255,255,0.2)';

	try {
		const urlParams = new URLSearchParams(
			typeof window !== 'undefined' ? window?.location?.search : ''
		);
		const baseColor: string =
			leadColor || decodeURIComponent(urlParams.get('bg') || '') || '#fff';
		const brightness = getLuminance(baseColor);
		color =
			brightness > 0.5 ? darken(baseColor, 0.02) : lighten(baseColor, 0.02);
	} catch (e) {}

	return (
		<div className="plugin-skeleton">
			<NinjaSkeletonTheme leadColor={color}>
				<div id="plugin-wrapper">
					<h2 className="plugin-title">
						<NinjaSkeleton />
					</h2>
					<div className="plugin-description">
						<NinjaSkeleton />
					</div>
					<div className="plugin">
						<NinjaSkeleton height={300} />
					</div>
				</div>
			</NinjaSkeletonTheme>
		</div>
	);
};
