import React, { ComponentType, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from '../../../external/types/state.types';
import { IEditorSectionProps } from '../../../external/types';
import { dataUpdated } from '../../actions/plugin.actions';

import './contextMenu.scss';

interface IContextMenuProps<T> {
  closeLink: string
  component?: ComponentType<T> | ReactElement
}

export const ContextMenu = ({ component, closeLink }: IContextMenuProps<any>) => {
  const { plugin, user } = useSelector((state: IAppState<any>) => ({
    plugin: state.plugin,
    user: state.user,
  }));
  const dispatch = useDispatch();
  const Component = component;
  const componentData: IEditorSectionProps<any> = {
    pluginData: plugin,
    user,
    updateData: (updatedData) => {
      dispatch(dataUpdated(updatedData));
    }
  };

  return (
    <aside className={`context-menu ${component ? 'is-opened' : ''}`}>
      {
        Component &&
        (
          typeof Component === 'function' ?
          <Component {...componentData}  /> :
          React.cloneElement(Component, componentData)
        )
      }
      <NavLink title="Close" className="context-menu-toggler" to={closeLink}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </NavLink>
    </aside>
  );
}
