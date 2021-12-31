import { CSSProperties } from 'react';
import { eventService } from '../../internal/services';

type TEventType = 'CLICK' | 'HOVER';

class EventHelper {
	public pluginId: string = '';

	public reportEngagementEvent(
		eventSubType: string,
		entityPath: string = '',
		eventType: TEventType = 'CLICK'
	) {
		if (!this.pluginId) {
			return;
		}

		eventService.postEventToParent(
			'COMMONNINJA_ENGAGEMENT_EVENT',
			this.pluginId,
			{
				eventType,
				eventSubType: eventSubType.toLowerCase().replace(/ /g, '-'),
				entityPath,
			}
		);
	}

	public dispatchEventToFrame(frameId: string, action: any) {
		eventService.postEventToParent(
			'COMMONNINJA_DISPATCH_ACTION_TO_FRAME',
			this.pluginId,
			{
				frameId,
				action,
			}
		);
	}

	public updateViewerDimensions(height?: number, width?: number) {
		const dimensions: any = {
			width: undefined,
			height: undefined,
		};

		if (typeof height === 'number') {
			dimensions.height = height;
		}

		if (typeof width === 'number') {
			dimensions.width = width;
		}

		eventService.postEventToParent(
			'COMMONNINJA_DIMENSIONS_UPDATE',
			this.pluginId,
			dimensions
		);
	}

	public updateViewerStyles(
		styles: CSSProperties = {},
		elmToUpdate?: 'wrapper' | 'iframe' | 'both'
	) {
		eventService.postEventToParent('COMMONNINJA_STYLES_UPDATE', this.pluginId, {
			styles,
			elmToUpdate,
		});
	}

	private openFrame({
		popupId,
		url,
		overlayStyles = {},
		iframeStyles = {},
	}: {
		popupId: string;
		url: string;
		overlayStyles: CSSProperties;
		iframeStyles: CSSProperties;
	}) {
		eventService.postEventToParent('COMMONNINJA_OPEN_POPUP', this.pluginId, {
			popupId,
			url,
			iframeStyles,
			overlayStyles,
		});
	}

	private updateFrameStyles({
		popupId,
		overlayStyles,
		iframeStyles,
	}: {
		popupId: string;
		overlayStyles?: CSSProperties;
		iframeStyles?: CSSProperties;
	}) {
		const styles: any = {};

		if (iframeStyles) {
			styles.iframeStyles = iframeStyles;
		}

		if (overlayStyles) {
			styles.overlayStyles = overlayStyles;
		}

		eventService.postEventToParent(
			'COMMONNINJA_UPDATE_POPUP_STYLES',
			this.pluginId,
			{
				popupId,
				...styles,
			}
		);
	}

	public openFrameModal(
		frameId: string,
		frameUrl: string,
		backgroundMode: boolean = false
	) {
		this.openFrame({
			popupId: frameId,
			url: frameUrl,
			overlayStyles: {
				display: backgroundMode ? 'none' : 'block',
				zIndex: 99999,
				height: '100%',
				width: '100%',
				position: 'fixed',
				top: '0',
				left: '0',
			},
			iframeStyles: {
				position: 'absolute',
				width: '100%',
				height: '100%',
				top: '0',
				left: '0',
			},
		});
	}

	public toggleFrameModal(frameId: string, show: boolean) {
		this.updateFrameStyles({
			popupId: frameId,
			overlayStyles: {
				display: show ? 'block' : 'none',
			},
		});
	}

	public openFrameDrawer(
		frameId: string,
		frameUrl: string,
		backgroundMode: boolean = false,
		direction: 'left' | 'right' = 'right'
	) {
		this.openFrame({
			popupId: frameId,
			url: frameUrl,
			overlayStyles: {
				display: backgroundMode ? 'none' : 'block',
				zIndex: 99999,
				position: 'fixed',
				left: '0',
				top: '0',
				width: '100%',
				height: '100%',
				background: 'rgba(0,0,0,0.85)',
				opacity: backgroundMode ? '0' : '1',
				transition: 'opacity 0.2s ease',
			},
			iframeStyles: {
				zIndex: 999,
				position: 'absolute',
				top: '0',
				[direction === 'left' ? 'left' : 'right']: '0',
				height: '100%',
				maxWidth: '100%',
				width: '440px',
				overflow: 'auto',
				boxShadow: '0 0 5px rgba(0,0,0,0.7)',
				opacity: backgroundMode ? '0' : '1',
				transition: 'all 0.2s ease 0.2s',
				background: '#fff',
				transform: backgroundMode
					? direction === 'right'
						? 'translateX(100%)'
						: 'translateX(-100%)'
					: 'translateX(0)',
			},
		});
	}

	public toggleFrameDrawer(
		frameId: string,
		show: boolean,
		direction: 'left' | 'right' = 'right'
	) {
		if (show) {
			this.updateFrameStyles({
				popupId: frameId,
				overlayStyles: {
					display: 'block',
				},
			});

			window?.setTimeout(() => {
				this.updateFrameStyles({
					popupId: frameId,
					overlayStyles: {
						opacity: '1',
					},
				});

				window?.setTimeout(() => {
					this.updateFrameStyles({
						popupId: frameId,
						iframeStyles: {
							opacity: '1',
							transform: 'translateX(0)',
						},
					});
				}, 200);
			}, 10);
		} else {
			this.updateFrameStyles({
				popupId: frameId,
				iframeStyles: {
					transform:
						direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)',
				},
			});

			window?.setTimeout(() => {
				this.updateFrameStyles({
					popupId: frameId,
					overlayStyles: {
						opacity: '0',
					},
					iframeStyles: {
						opacity: '0',
					},
				});

				window?.setTimeout(() => {
					this.updateFrameStyles({
						popupId: frameId,
						overlayStyles: {
							display: 'none',
						},
					});
				}, 200);
			}, 350);
		}
	}
}

export const eventHelper = new EventHelper();
