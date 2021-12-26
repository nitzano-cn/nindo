import React from 'react';

import { TChildren } from '../../types/plugin.types';

interface IContextMenuSectionProps {
  children: TChildren
  title?: string
  className?: string
}

export const ContextMenuSection = ({ title, children, className }: IContextMenuSectionProps) => {
  return (
    <>
      {title && <h4>{title}</h4>}
      <section className={`inner ${className || ''}`}>
        {children}
      </section>
    </>
  );
}