import React, { ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './toggler.scss';

interface TogglerProps {
  isChecked: boolean
  onChange: (event: ChangeEvent, isChecked: boolean) => void
  name?: string
  disabled?: boolean
  width?: number
  height?: number
}

export const Toggler = (props: TogglerProps) => {
  const { isChecked, name, disabled, width, height, onChange } = props;
  const togglerName = name || `toggle_${uuidv4()}`;
  const additionalProps: any = {};

  if (disabled) {
    additionalProps.disabled = true;
  }

  function inputChanged(event: ChangeEvent) {
    const elm = event.target as HTMLInputElement;
    onChange(event, elm.checked);
  }

  return (
    <div className="toggler">
      <input 
        type="checkbox" 
        id={togglerName} 
        onChange={inputChanged} 
        checked={isChecked} 
        {...additionalProps} 
      />
      <label 
        htmlFor={togglerName} 
        style={{
          width: width || 56,
          height: height || 30
        }}
        title={isChecked ? 'Disable' : 'Enable'}
      ></label>
    </div>
  );
};