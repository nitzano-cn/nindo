import React from 'react';
import Select, { Props } from 'react-select';

import './select.scss';

interface INinjaSelectProps extends Props {
  mode: 'dark' | 'light'
}

export const NinjaSelect = (props: INinjaSelectProps) => {
  const { mode, ...restProps } = props;

  return (
    <Select 
      {...restProps}
      className={`ninja-select ${mode}`}
      classNamePrefix="ninja-select"
    />
  );
};