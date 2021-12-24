import React from 'react';

import { InternalComp } from '../../../internal/components';

import './button.scss';

export interface ButtonProps {
  label: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button>
      {props.label}
      <InternalComp />
    </button>
  );
};