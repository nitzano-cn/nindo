import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IAppMenuLink {
	url: string;
	name: string;
	id?: string;
	badge?: string | number;
	icon?: IconProp;
	exact?: boolean;
}
