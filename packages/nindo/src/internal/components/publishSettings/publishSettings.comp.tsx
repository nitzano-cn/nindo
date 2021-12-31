import React from 'react';
import {
	InstallationCode,
	InstallationTutorials,
} from '../installationCode/installationCode.comp';
import { pluginService } from '../../services';
import { FormRow } from '../../../external/components/formRow/formRow.comp';
import { ContextMenuWrapper } from '../../../external/components/contextMenuWrapper/contextMenuWrapper.comp';
import { ContextMenuSection } from '../../../external/components/contextMenuSection/contextMenuSection.comp';

import './publishSettings.scss';

type PublishSettingsProps = {
	pluginId: string | null;
	showCode?: boolean;
	htmlCodeOnly?: boolean;
	hideTutorials?: boolean;
};

export const PublishSettingsComp = (props: PublishSettingsProps) => {
	const { pluginId, showCode = true, hideTutorials, htmlCodeOnly } = props;

	return !pluginId ? (
		<p className="center message all-centered">
			The code will be available <br />
			once you hit the "Save Changes" button.
		</p>
	) : (
		<ContextMenuWrapper className="publish-settings">
			{showCode && (
				<ContextMenuSection title="Installation Guide">
					<InstallationCode
						componentId={pluginId}
						componentType={pluginService.pluginType}
						buttonClassName="button green"
						htmlOnly={htmlCodeOnly}
					/>
				</ContextMenuSection>
			)}
			<ContextMenuSection title="App Details">
				<FormRow>
					<label>App Instance ID</label>
					<span>{pluginId}</span>
				</FormRow>
				<FormRow>
					<label>App Type</label>
					<span>{pluginService.pluginType}</span>
				</FormRow>
			</ContextMenuSection>
			{!hideTutorials && (
				<ContextMenuSection title="Tutorials">
					<InstallationTutorials />
				</ContextMenuSection>
			)}
		</ContextMenuWrapper>
	);
};

export default PublishSettingsComp;
