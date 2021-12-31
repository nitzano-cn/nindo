import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSignOutAlt,
	faCog,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { userService } from '../../services';
import { IUser } from '../../../external/types/user.types';

require('@commonninja/commonninja-auth-sdk');

const usersServiceUrl = process.env.REACT_APP_USERS_SERVICE_URL || '';

declare global {
	interface Window {
		CommonninjaAuthSDK: any;
	}
}

export interface IUserProps {
	user: IUser;
	componentType?: string;
	serviceName?: string;
	defaultAuthType?: 'login' | 'signup';
	allowLoginRedirect?: boolean;
	noUI?: boolean;
	postLoginCallback?: (user: IUser, triggered: boolean) => void;
	postLogoutCallback?: () => void;
	failedToAuthenticateCallback?: (errorMessage: string) => void;
}

export const User = (props: IUserProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [menuStatus, setMenuStatus] = useState<'closed' | 'opened'>('closed');
	const {
		user,
		defaultAuthType,
		allowLoginRedirect,
		noUI,
		postLoginCallback,
		postLogoutCallback,
		failedToAuthenticateCallback,
	} = props;

	function handleOutsideClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (
			menuStatus === 'opened' &&
			target &&
			!target.closest('.user-menu-wrapper')
		) {
			setMenuStatus('closed');
		}
	}

	async function getUserInfo(triggered: boolean) {
		setLoading(true);

		try {
			const res = await userService.getUserInfo();
			if (!res.success) {
				throw new Error('User is not logged in.');
			}

			if (postLoginCallback) {
				postLoginCallback(
					{
						...res.data,
						isPremium: res.data.role === 'admin' || res.data.subscription,
					},
					triggered
				);
			}
		} catch (e) {
			if (failedToAuthenticateCallback) {
				failedToAuthenticateCallback((e as Error).message);
			}
		}

		setLoading(false);
	}

	function openLogin(e: any): void {
		if (!allowLoginRedirect) {
			e.preventDefault();

			window?.CommonninjaAuthSDK.login(() => {
				getUserInfo(true);
			});
		}
	}

	function openSignup(e: any): void {
		if (!allowLoginRedirect) {
			e.preventDefault();

			window?.CommonninjaAuthSDK.signup(() => {
				getUserInfo(true);
			});
		}
	}

	async function logout(e: any) {
		e.preventDefault();

		try {
			await userService.logout();

			// window?.CommonninjaAuthSDK.logout();

			if (postLogoutCallback) {
				postLogoutCallback();
			}
		} catch (e) {
			console.error('Could not log out', e);
		}
	}

	function toggleMenu(e: any) {
		e.preventDefault();
		setMenuStatus(menuStatus === 'opened' ? 'closed' : 'opened');
	}

	function renderAuthLink() {
		if (defaultAuthType === 'signup') {
			return (
				<a className="open-auth" href="/signup" onClick={openSignup}>
					Sign Up
				</a>
			);
		}
		return (
			<a className="open-auth" href="/login" onClick={openLogin}>
				Log In
			</a>
		);
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (usersServiceUrl) {
				window.CommonninjaAuthSDK.baseUrl = usersServiceUrl;
			}
			window.CommonninjaAuthSDK.serviceName = props.serviceName;
			window.addEventListener('mousedown', handleOutsideClick);
		}

		getUserInfo(false);

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('mousedown', handleOutsideClick);
			}
		};
	}, []);

	if (noUI) {
		return <></>;
	}

	if (loading) {
		return (
			<div
				className="user-menu-wrapper"
				style={{ lineHeight: '1em', marginTop: '4px' }}
			>
				<SkeletonTheme baseColor="#171d22" highlightColor="#9ea9b6">
					<Skeleton width={60} height={15} />
				</SkeletonTheme>
			</div>
		);
	}

	if (!user.isAuthenticated) {
		return renderAuthLink();
	}

	return (
		<div className={`user-menu-wrapper ${menuStatus}`}>
			<span className="user-menu-toggler" onClick={toggleMenu}>
				<span
					title={user.fullName}
					className="thumbnail"
					style={{
						backgroundImage: user.thumbnail ? `url(${user.thumbnail})` : '',
					}}
				></span>
				<span>{user.fullName}</span>
				<FontAwesomeIcon icon={faChevronDown} />
			</span>
			<div className="user-menu">
				<a target="_self" href={`${usersServiceUrl}/user/dashboard`}>
					<FontAwesomeIcon icon={faCog} />
					<span>Dashboard</span>
				</a>
				<a href="/" className="openLogout" onClick={logout}>
					<FontAwesomeIcon icon={faSignOutAlt} />
					<span>Logout</span>
				</a>
			</div>
		</div>
	);
};
