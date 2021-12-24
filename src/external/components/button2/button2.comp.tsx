import React from 'react';

import './button2.scss';

export interface ButtonProps2 {
  label: string;
}

export const Button2 = (props: ButtonProps2) => {
  return <button>{props.label}</button>;
};