import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IAppState, IPluginComp, IPluginLoaderComp, IUser } from '../../../external/types';
import { AppHeader } from '../appHeader/appHeader.comp';
import { PluginLoader } from '../pluginLoader/pluginLoader.comp';
import { PluginWrapper } from '../pluginWrapper/pluginWrapper.comp';
import * as userActions from '../../actions/user.actions';

import './galleryPage.scss';

export const GalleryPage = (props: {
	pluginComp: IPluginComp<any>;
	pluginLoaderComp?: IPluginLoaderComp;
}) => {
	const { user } = useSelector((state: IAppState<any>) => ({
		user: state.user,
	}));
	const dispatch = useDispatch();
	const {pluginComp, pluginLoaderComp, ...otherProps } = props;

	return (
		<>
			<AppHeader
				componentName="Common Ninja"
				anonymousUser={false}
				userProps={{
					user,
					postLoginCallback: (user: IUser) => {
						dispatch(userActions.loggedIn(user));
					},
					postLogoutCallback: () => {
						dispatch(userActions.logout());
					},
				}}
			/>
			<div className="gallery-page">
				<PluginLoader
					pluginComp={<PluginWrapper mode="viewer" pluginComp={pluginComp} />}
					pluginLoaderComp={pluginLoaderComp}
					{...otherProps}
				/>
			</div>
		</>
	);
};
