import React, { ComponentType, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

import './contextMenu.scss';

interface IContextMenuProps<T> {
  closeLink: string
  component?: ComponentType<T> | ReactElement
}

export const ContextMenu = ({ component, closeLink }: IContextMenuProps<any>) => {
  return (
    <aside className={`context-menu ${component ? 'is-opened' : ''}`}>
      {component}
      <NavLink title="Close" className="context-menu-toggler" to={closeLink}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </NavLink>
    </aside>
  );
}
