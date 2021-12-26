import React, { Component, RefObject, CSSProperties, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { TChildren } from '../../types/plugin.types';

import './drawer.scss';

interface IPortalDrawerProps {
  className?: string
}

interface IDrawerProps {
  className?: string
  style?: CSSProperties
  show: boolean
  direction?: 'left' | 'right'
  showCloseButton?: boolean
  closeCallback: () => void
  children: TChildren
  refCallback?: string | ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined
}

const isSSR: boolean = typeof document === 'undefined';
let portalRoot: any = null;

if (!isSSR) {
  portalRoot = document.getElementById('drawer-portal') as HTMLDivElement;

  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'drawer-portal');
    document.body.append(portalRoot);
  }
}

class PortalDrawer extends Component<IPortalDrawerProps> {
  private el: HTMLElement;

  constructor(props: any) {
    super(props);
    
    const div = document?.createElement('div');
    div.className = props.className;
    this.el = div;
  }
  
  componentDidMount = () => {
    portalRoot.appendChild(this.el);
  }
  
  componentWillUnmount = () => {
    portalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export const Drawer = (props: IDrawerProps) => {
  const { className, style, show, direction = 'right', showCloseButton = true, closeCallback, children, refCallback } = props;
  const [fadedIn, setFadedIn] = useState<boolean>(false);
  const drawerStyle: CSSProperties = Object.assign({}, style || {});

  const closeDrawer = (e: any) => {
    e.preventDefault();
    closeCallback();
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const { show } = props;
    
    if (show && e.keyCode === 27) {
      closeDrawer(e);
    }
  }
  
  useEffect(() => {
    document?.addEventListener('keydown', handleKeyDown);

    return () => {
      document?.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  useEffect(() => {
    if (show) {
      window.setTimeout(() => {
        setFadedIn(true);
      }, 100);
    } else {
      setFadedIn(false);
    }
  }, [show]);

  return (
    show ?
    <PortalDrawer className={`drawer ${className || ''} ${direction}`}>
      <div className={`overlay ${fadedIn ? 'faded-in' : ''}`} onClick={(e: any) => closeDrawer(e)}></div>
      <div className={`drawer-content ${fadedIn ? 'faded-in' : ''}`} style={drawerStyle} ref={refCallback}>
        {children}
        {
          showCloseButton &&
          <button title="Close" className="close-drawer" onClick={(e: any) => closeDrawer(e)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        }
      </div>
    </PortalDrawer> :
    <></>
  );
};