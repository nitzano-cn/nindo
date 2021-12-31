import React from 'react';

import { TComponentType } from '../../../external/types/component.types';

import { FormRow } from '../../../external/components/formRow/formRow.comp';
import { CopyInput } from '../../../external/components/copyInput/copyInput.comp';

import './installationCode.scss';

type InstallationCodeProps = {
	componentId: string;
	componentType: TComponentType;
	buttonClassName?: string;
	className?: string;
	htmlOnly?: boolean;
};

export const InstallationCode = (props: InstallationCodeProps) => {
	const { componentId, componentType, className, buttonClassName, htmlOnly } =
		props;
	let scriptStr = `<div class="commonninja_component" comp-type="${componentType}" comp-id="${componentId}"></div>`;
	if (!htmlOnly) {
		scriptStr = `<script src="https://cdn.commoninja.com/sdk/latest/commonninja.js" defer></script>\n${scriptStr}`;
	}

	return (
		<div className={`installation-code ${className ? className : ''}`}>
			<FormRow flow="column">
				<label>
					Place this code wherever you want the app to appear on your website
					(HTML editor, theme, template, etc).
				</label>
				<CopyInput
					value={scriptStr}
					inputType="textarea"
					buttonClassName={buttonClassName}
				/>
			</FormRow>
		</div>
	);
};

export const InstallationTutorials = () => {
	return (
		<div className="installation-tutorials">
			<p>Learn how to install on:</p>
			<div className="platforms-list">
				<a
					href="https://www.commoninja.com/platforms/shopify"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://www.commoninja.com/public/images/svg/shopify.svg'}
						alt={'Shopify'}
					/>
				</a>
				<a
					href="https://www.commoninja.com/platforms/wordpress"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://www.commoninja.com/public/images/svg/wordpress.svg'}
						alt={'Wordpress'}
					/>
				</a>
				<a
					href="https://www.commoninja.com/platforms/wix"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://www.commoninja.com/public/images/svg/wix.svg'}
						alt={'Wix'}
					/>
				</a>
				<a
					href="https://www.commoninja.com/platforms/squarespace"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://www.commoninja.com/public/images/svg/squarespace.svg'}
						alt={'Squarespace'}
					/>
				</a>
				<a
					href="https://www.commoninja.com/platforms/webflow"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://www.commoninja.com/public/images/svg/webflow.svg'}
						alt={'Webflow'}
					/>
				</a>
				<a
					href="https://www.commoninja.com/platforms/weebly"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://www.commoninja.com/public/images/svg/weebly.svg'}
						alt={'Weebly'}
					/>
				</a>
				<a
					href="https://www.commoninja.com/platforms/duda"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://www.commoninja.com/public/images/svg/duda.svg'}
						alt={'Duda'}
					/>
				</a>
				<a
					href="https://www.commoninja.com/platforms/jimdo"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://www.commoninja.com/public/images/svg/jimdo.svg'}
						alt={'Jimdo'}
					/>
				</a>
				<a
					href="https://www.commoninja.com/platforms/webs"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src={'https://www.commoninja.com/public/images/svg/webs.svg'}
						alt={'Webs'}
					/>
				</a>
			</div>
		</div>
	);
};
