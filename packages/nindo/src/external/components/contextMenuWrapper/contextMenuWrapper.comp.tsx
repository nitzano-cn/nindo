import React from 'react';

import { TChildren } from '../../types/plugin.types';

interface IContextMenuWrapperProps {
	children: TChildren;
	className?: string;
}

export const ContextMenuWrapper = ({
	children,
	className,
}: IContextMenuWrapperProps) => {
	return <div className={`overflow-content ${className}`}>{children}</div>;
};
