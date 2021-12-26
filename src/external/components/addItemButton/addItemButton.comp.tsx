import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../button/button.comp';

import './addItemButton.scss';

interface IAddItemButtonProps {
  onClick: () => void
  title?: string
}

export const AddItemButton = ({ onClick, title }: IAddItemButtonProps) => {
  return (
    <Button className="add-item-button" onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} />
      <span> {title || 'Add an Item'}</span>
    </Button>
  );
}
