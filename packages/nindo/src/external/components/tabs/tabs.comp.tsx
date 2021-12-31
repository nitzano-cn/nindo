import React, { useState } from 'react';

import { TChildren } from '../../types/plugin.types';

import './tabs.scss';

interface ITabsProps {
	items: ITab[];
	resolveTabComp: (activeTabId: string | number) => TChildren;
}

interface ITab {
	id: string | number;
	name?: string;
}

export const Tabs = ({ items, resolveTabComp }: ITabsProps) => {
	const [activeTab, setActiveTab] = useState<ITab>(
		items[0] || { id: '', name: '' }
	);

	return (
		<div className="tabs-wrapper">
			<header className="tabs">
				{items.map((tab, idx) => (
					<button
						key={`tab_${idx}`}
						className={`tab-trigger ${activeTab.id === tab.id ? 'active' : ''}`}
						onClick={() => setActiveTab(tab)}
					>
						{tab.name || tab.id}
					</button>
				))}
			</header>
			<div className="active-tab">{resolveTabComp(activeTab.id)}</div>
		</div>
	);
};
