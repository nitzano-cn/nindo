import React from 'react';
import { useParams } from 'react-router-dom';

import { IViewerProps } from '../../../external/types/viewer.types';
import { IPluginComp, IPluginLoaderComp } from '../../../external/types/plugin.types';
import { PluginLoader } from '../pluginLoader/pluginLoader.comp';
import { PluginWrapper } from '../pluginWrapper/pluginWrapper.comp';

import './viewer.scss';

export const Viewer = (props: { 
	pluginComp: IPluginComp, 
	pluginLoaderComp?: IPluginLoaderComp;
}) => {
	const { vendor } = useParams() as any;
	const { pluginComp, pluginLoaderComp, ...otherProps } = props;

	return (
		<div id="viewer" className={(otherProps as IViewerProps<any>)?.viewerSettings?.inlineElm ? 'inline' : ''}>
			<PluginLoader
				pluginComp={<PluginWrapper pluginComp={pluginComp} />}
				pluginLoaderComp={pluginLoaderComp}
				vendor={vendor}
				{...otherProps}
			/>
		</div>
	);
};
