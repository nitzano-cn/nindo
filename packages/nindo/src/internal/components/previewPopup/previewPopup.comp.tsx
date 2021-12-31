import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faDesktop,
	faMobileAlt,
	faTabletAlt,
} from '@fortawesome/free-solid-svg-icons';

import { Popup } from '../../../external/components/popup/popup.comp';
import { Button } from '../../../external/components/button/button.comp';
import { IPlugin } from '../../../external/types/plugin.types';

import './previewPopup.scss';

interface PreviewPopupProps<T> {
	plugin: IPlugin<T>;
	previewPath: string;
	closeCallback: () => void;
	show: boolean;
	className?: string;
}

export const PreviewPopup = (props: PreviewPopupProps<any>) => {
	const { plugin, previewPath, closeCallback, show, className } = props;
	const [iframeDimensions, setIframeDimensions] = useState<{
		width: null | number;
	}>({
		width: null,
	});
	const iframeElm = useRef<any>(null);

	function setIframeWidth(width: number | null) {
		setIframeDimensions({
			...iframeDimensions,
			width,
		});
	}

	function connectPreview() {
		postMessageToPreview({ type: 'handshake' });
		postMessageToPreview({
			type: 'editor.update',
			plugin,
		});
	}

	function postMessageToPreview(message: any) {
		iframeElm.current.contentWindow.postMessage(JSON.stringify(message), '*');
	}

	return (
		<Popup
			show={show}
			closeCallback={closeCallback}
			className={`preview-popup ${className}`}
		>
			<h2>Preview</h2>
			<div className="preview-wrapper">
				<div className="platforms">
					<button title="Desktop" onClick={() => setIframeWidth(null)}>
						<FontAwesomeIcon icon={faDesktop} />
					</button>
					<button title="Tablet" onClick={() => setIframeWidth(920)}>
						<FontAwesomeIcon icon={faTabletAlt} />
					</button>
					<button title="Mobile" onClick={() => setIframeWidth(420)}>
						<FontAwesomeIcon icon={faMobileAlt} />
					</button>
				</div>
				<div
					className="iframe-wrapper"
					style={{
						width: iframeDimensions.width ? `${iframeDimensions.width}px` : '',
					}}
				>
					<iframe
						title="Preivew iframe"
						frameBorder={0}
						src={previewPath}
						ref={iframeElm}
						onLoad={connectPreview}
					></iframe>
				</div>
			</div>
			<div className="buttons-wrapper center">
				<Button onClick={closeCallback}>Close</Button>
			</div>
		</Popup>
	);
};
