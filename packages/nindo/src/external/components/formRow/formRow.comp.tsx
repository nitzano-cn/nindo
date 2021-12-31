import React, { CSSProperties } from 'react';

import { TChildren } from '../../types/plugin.types';

import './formRow.scss';

type FormRowProps = {
  children: TChildren
  className?: string
  flow?: 'column' | 'row'
  style?: CSSProperties
}

export const FormRow = (props: FormRowProps) => {
  const { children, className, flow, style } = props;

  return (
    <div className={`form-row ${flow || ''} ${className || ''}`} style={style || {}}>
      {children}
    </div>
  );
};