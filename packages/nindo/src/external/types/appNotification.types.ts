export interface IAppNotification {
	title?: string | JSX.Element | undefined;
	message?: string | JSX.Element | undefined;
	level?: "error" | "warning" | "info" | "success" | undefined;
	position?: "tr" | "tl" | "tc" | "br" | "bl" | "bc" | undefined;
	autoDismiss?: number | undefined;
	dismissible?: 'both' | 'button' | 'click' | 'hide' | 'none' | boolean | undefined;
	children?: React.ReactNode | undefined;
	uid?: number | string | undefined;
}
