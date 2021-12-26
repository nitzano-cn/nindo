import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { IViewerProps } from '../../../external/types/viewer.types';
import { IPluginComp, IPluginLoaderComp } from '../../../external/types/plugin.types';
import { PluginLoader } from '../pluginLoader/pluginLoader.comp';
import { PluginWrapper } from '../pluginWrapper/pluginWrapper.comp';

import './viewer.scss';

export const Viewer = (props: { 
	pluginComp: IPluginComp<any>, 
	pluginLoaderComp?: IPluginLoaderComp;
}) => {
	const match = useRouteMatch();
	const { vendor } = match.params as any;
	const { pluginComp, pluginLoaderComp, ...otherProps } = props;

	return (
		<div id="viewer" className={(otherProps as IViewerProps<any>)?.viewerSettings?.inlineElm ? 'inline' : ''}>
			<PluginLoader
				pluginComp={<PluginWrapper mode="viewer" pluginComp={pluginComp} vendor={vendor} />}
				pluginLoaderComp={pluginLoaderComp}
				vendor={vendor}
				{...otherProps}
			/>
		</div>
	);
};
