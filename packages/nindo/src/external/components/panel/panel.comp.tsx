import React, { useState, useEffect, useRef, CSSProperties } from 'react';

import { TChildren } from '../../types/plugin.types';
import { SystemIcon } from '../icon/icon.comp';

import './panel.scss';

interface PanelProps {
	titleComponent: TChildren;
	onToggle?: (isActive: boolean) => void;
	togglerComponent?: TChildren;
	children?: TChildren;
	collapsedGroups?: boolean;
	panelProps?: any;
	openedByDefault?: boolean;
	accordionMode?: boolean;
}

export const Panel = (props: PanelProps) => {
	const content = useRef<any>(null);
	const {
		titleComponent,
		togglerComponent,
		openedByDefault,
		onToggle,
		children,
		collapsedGroups,
		panelProps,
		accordionMode = true,
	} = props;
	const [panelActive, setPanelActive] = useState<boolean>(
		openedByDefault || false
	);
	const [height, setHeight] = useState<number>(
		panelActive ? content?.current?.scrollHeight : 0
	);
	const [isVisible, setIsVisible] = useState<boolean>(openedByDefault || false);
	const panelRef = useRef<any>();
	const styles: CSSProperties = {
		maxHeight: `${height}px`,
	};

	useEffect(() => {
		onToggle?.(panelActive);

		setHeight(!panelActive ? 0 : content.current.scrollHeight);

		if (!panelActive) {
			setIsVisible(false);
		} else {
			if (accordionMode && !openedByDefault) {
				// Close other panels
				const openedPanels =
					panelRef.current.parentElement.querySelectorAll('.active.visible');
				openedPanels.forEach((elm: any) => {
					elm.querySelector('header')?.click();
				});
			}
			window.setTimeout(() => setIsVisible(true), 200);
		}
	}, [panelActive]);

	useEffect(() => {
		if (content?.current && panelActive) {
			setHeight(content.current.scrollHeight);
		}
	}, [children]);

	useEffect(() => {
		if (typeof collapsedGroups === 'boolean') {
			setPanelActive(collapsedGroups);
		}
	}, [collapsedGroups]);

	return (
		<div
			className={`panel ${panelActive ? 'active' : ''} ${
				isVisible ? 'visible' : ''
			}`}
			{...(panelProps || {})}
			ref={panelRef}
		>
			<header onClick={() => setPanelActive(!panelActive)}>
				{titleComponent}
				{togglerComponent ? (
					togglerComponent
				) : (
					<SystemIcon type="chevron-down" />
				)}
			</header>
			<section ref={content} style={styles}>
				<div className="inner">{panelActive && children && children}</div>
			</section>
		</div>
	);
};
