import React from 'react';
import {
	FormRow,
	ContextMenuWrapper,
	ContextMenuSection,
	FormLabel,
	usePluginData,
} from '@commonninja/nindo';
import { IPluginData } from '../../plugin/plugin.types';

import './contentSettings.scss';

export const ContentSettingsComp = () => {
	const [pluginData, updateData] = usePluginData<IPluginData>();
	const { content } = pluginData.data;

	function setContentField(propName: string, value: any) {
		updateData({
			content: {
				...content,
				[propName]: value,
			},
		});
	}

	return (
		<ContextMenuWrapper className="content-settings">
			<ContextMenuSection title="Content Settings">
				<FormRow>
					<FormLabel>Content test field</FormLabel>
					<input
						type="text"
						value={content.test}
						placeholder="Enter text..."
						onChange={(e) => setContentField('test', e.target.value)}
					/>
				</FormRow>
			</ContextMenuSection>
		</ContextMenuWrapper>
	);
};
