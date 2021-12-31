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
  const Component = component;

  return (
    <aside className={`context-menu ${component ? 'is-opened' : ''}`}>
      {
        Component &&
        (
          typeof Component === 'function' ?
          <Component {...{}} /> :
          React.cloneElement(Component, {})
        )
      }
      <NavLink title="Close" className="context-menu-toggler" to={closeLink}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </NavLink>
    </aside>
  );
}
