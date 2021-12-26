import React from 'react';

import './tooltip.scss';

type TooltipProps = {
  content: string
  direction?: 'bottom' | 'left' | 'right' | 'top'
  pointer?: string
  width?: number
}

export const Tooltip = (props: TooltipProps) => {
  const { pointer, content, direction, width } = props;

  return (
    <span className="tooltip">
      <span className="tooltip-pointer">{pointer || '?'}</span>
      <span className={`tooltip-content ${direction || 'top'}`} style={{ width: `${width || 200}px` }} dangerouslySetInnerHTML={{ __html: content }}></span>
    </span>
  );
};