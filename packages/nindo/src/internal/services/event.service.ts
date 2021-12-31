import { HttpService } from '../../external/services/http.service';

declare global {
	interface Window {
		mixpanel: any;
	}
}

export type TEventName =
	| 'COMMONNINJA_PLUGIN_LOADED'
	| 'COMMONNINJA_PLUGIN_REQUESTED_DATA'
	| 'COMMONNINJA_DIMENSIONS_UPDATE'
	| 'COMMONNINJA_STYLES_UPDATE'
	| 'COMMONNINJA_PARENT_WINDOW_SCROLL'
	| 'COMMONNINJA_ENGAGEMENT_EVENT'
	| 'COMMONNINJA_PERFORMANCE_EVENT'
	| 'COMMONNINJA_OPEN_POPUP'
	| 'COMMONNINJA_UPDATE_POPUP_STYLES'
	| 'COMMONNINJA_UPDATE_POPUP_URL'
	| 'COMMONNINJA_CLOSE_POPUP'
	| 'COMMONNINJA_DISPATCH_ACTION_TO_FRAME'
	| 'COMMONNINJA_ADD_WATERMARK';

export enum ClientEvent {
	INSTALL = 'INSTALL',
	REQUEST = 'REQUEST',
	IMPRESSION = 'IMPRESSION',
	VIEW = 'VIEW',
}

export enum EngagementEvent {
	CLICK = 'click',
	HOVER = 'hover',
	SCROL = 'scroll',
}

export enum EventGroupType {
	CLIENT = 'client',
	ENGAGEMENT = 'engagement',
	PERFORMANCE = 'performance',
}

const baseUrl: string = process.env.REACT_APP_PLUGIN_API_URL || '';

class EventService extends HttpService {
	private reportedEvents: string[] = [];

	constructor() {
		super();

		if (typeof window === 'undefined') {
			return;
		}
	}

	public reportEvent(
		groupType: EventGroupType,
		eventType: ClientEvent | EngagementEvent,
		compId: string | null,
		eventData?: any
	) {
		if (!compId || !groupType || !eventType) {
			return;
		}

		// Client and performance events can only be reported once
		// Engagement events might be reported multiple times
		if (
			groupType === EventGroupType.CLIENT ||
			groupType === EventGroupType.PERFORMANCE
		) {
			// If this event was already reported, don't report again
			if (this.reportedEvents.includes(eventType)) {
				return;
			}
			this.reportedEvents.push(eventType);
		}

		let otherQueryParams: string = '';

		if (eventData && typeof eventData === 'object') {
			for (const key in eventData) {
				const value: string =
					typeof eventData[key] === 'object'
						? JSON.stringify(eventData[key])
						: eventData[key];
				otherQueryParams += `&${key}=${value}`;
			}
		}

		this.makeRequest(
			`${baseUrl}/api/v1/event/report/${compId}?groupType=${groupType}&eventType=${eventType}${otherQueryParams}`,
			{},
			false
		).catch(() => {});
	}

	private reportEngagementEvent(compId: string, data: any) {
		const eventData = {
			eventVersion: data.version || '',
			// link, button, conversion, vote, rate, game, participant
			eventSubType: data.eventSubType,
			// Could be either an id of an entity, or a path (f.e: plan_:id_cell_:id)
			// It depends on the plugin
			entityPath: data.entityPath,
		};

		this.reportEvent(
			EventGroupType.ENGAGEMENT,
			data.eventType,
			compId,
			eventData
		);
	}

	private reportPerformanceEvent(compId: string, data: any) {
		this.reportEvent(EventGroupType.PERFORMANCE, data.eventType, compId, {
			value: data.value,
		});
	}

	private reportClientEvent(compId: string, eventType: ClientEvent) {
		this.reportEvent(EventGroupType.CLIENT, eventType, compId);
	}

	public postEventToParent(
		eventName: TEventName,
		compId: string | null,
		eventData?: any
	) {
		if (!compId) {
			return;
		}

		// If not in an iframe
		if (window?.self === window?.top) {
			switch (eventName) {
				case 'COMMONNINJA_PLUGIN_REQUESTED_DATA':
					// No INSTALL events in a non-iframe env
					this.reportClientEvent(compId, ClientEvent.REQUEST);
					break;
				case 'COMMONNINJA_PLUGIN_LOADED':
					// Since it's not an iframe, impression and view will be together
					this.reportClientEvent(compId, ClientEvent.IMPRESSION);
					this.reportClientEvent(compId, ClientEvent.VIEW);
					break;
				case 'COMMONNINJA_ENGAGEMENT_EVENT':
					this.reportEngagementEvent(compId, eventData);
					break;
				case 'COMMONNINJA_PERFORMANCE_EVENT':
					this.reportPerformanceEvent(compId, eventData);
					break;
			}
			return;
		}

		const messageData: any = {
			type: eventName,
			compId,
		};

		if (eventData) {
			switch (eventName) {
				case 'COMMONNINJA_DIMENSIONS_UPDATE':
					messageData.height = eventData.height;
					messageData.width = eventData.width;
					break;
				case 'COMMONNINJA_STYLES_UPDATE':
					messageData.styles = eventData.styles;
					messageData.elmToUpdate = eventData.elmToUpdate;
					break;
				case 'COMMONNINJA_ENGAGEMENT_EVENT':
					messageData.eventType = eventData.eventType;
					messageData.eventSubType = eventData.eventSubType;
					messageData.entityPath = eventData.entityPath;
					break;
				case 'COMMONNINJA_ADD_WATERMARK':
					messageData.url = eventData.url;
					messageData.html = eventData.html;
					break;
				case 'COMMONNINJA_PERFORMANCE_EVENT':
					break;
				case 'COMMONNINJA_PLUGIN_LOADED':
				case 'COMMONNINJA_PLUGIN_REQUESTED_DATA':
					break;
				case 'COMMONNINJA_OPEN_POPUP':
				case 'COMMONNINJA_CLOSE_POPUP':
				case 'COMMONNINJA_UPDATE_POPUP_STYLES':
				case 'COMMONNINJA_UPDATE_POPUP_URL':
					messageData.popupId = eventData.popupId;
					messageData.url = eventData.url || '';
					messageData.overlayStyles = eventData.overlayStyles || {};
					messageData.iframeStyles = eventData.iframeStyles || {};
					break;
				case 'COMMONNINJA_DISPATCH_ACTION_TO_FRAME':
					messageData.frameId = eventData.frameId;
					messageData.actionData = eventData.action;
					break;
				default:
					break;
			}
		}

		window.parent.postMessage(messageData, '*');
	}

	public reportMixpanelEvent(name: string, props?: any) {
		if (!window?.mixpanel) {
			return;
		}

		window.mixpanel.track(name, props || {});
	}
}

export const eventService = new EventService();
