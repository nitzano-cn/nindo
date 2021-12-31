import React from 'react';
import { usePluginData } from '@commonninja/nindo';

import { IPluginData } from './plugin.types';

import './plugin.scss';

export const Plugin = () => {
	const [pluginData] = usePluginData<IPluginData>();
	const { styles, settings, content } = pluginData.data;

	return (
		<>
			{/* Title & Plugin content */}
			{settings.showTitle && <h2 style={styles.title}>{pluginData.name}</h2>}
			Content: {content.test}
		</>
	);
};
