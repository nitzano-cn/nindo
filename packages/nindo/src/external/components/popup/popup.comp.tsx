import React, { Component, RefObject, CSSProperties, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { TChildren } from '../../types/plugin.types';

import './popup.scss';

interface IPortalPopupProps {
  className?: string
}

interface IPopupProps {
  className?: string
  style?: any
  show: boolean
  closeCallback: any
  children: TChildren
  refCallback?: string | ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined
}

const isSSR: boolean = typeof document === 'undefined';
let portalRoot: any = null;

if (!isSSR) {
  portalRoot = document.getElementById('popup-portal') as HTMLDivElement;

  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'popup-portal');
    document.body.append(portalRoot);
  }
}

const inIframe = (): boolean => {
  if (isSSR) {
    return false;
  }
  try {
    return window?.self !== window?.top;
  } catch (e) {
    return true;
  }
}

let parentTopScroll: number = 0;
let parentWindowHeight: number = 0;

// Listen to messages from Common Ninja SDK
if (inIframe()) {
  window?.addEventListener('message', (e) => {
    try {
      const message = JSON.parse(e.data);
  
      switch(message.type) {
        case 'COMMONNINJA_PARENT_WINDOW_SCROLL':
          parentTopScroll = message.fromTop;
          if (message.windowHeight) {
            parentWindowHeight = message.windowHeight;
          }
          break;
        default:
      }
    } catch(e) {}
  });
}

class PortalPopup extends Component<IPortalPopupProps> {
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

export const Popup = (props: IPopupProps) => {
  const { className, style, show, closeCallback, children, refCallback } = props;
  const [fadedIn, setFadedIn] = useState<boolean>(false);
  const popupStyle: CSSProperties = Object.assign({}, style || {});

  const handleKeyDown = (e: KeyboardEvent) => {
    const { show, closeCallback } = props;
    
    if (show && e.keyCode === 27) {
      closeCallback(e);
    }
  }
  
  // If popup is inside of an iframe, 
  // and the iframe is bigger than the viewport, set a relative to parent top position
  if (inIframe()) {
    const margin = 20;

    try {
      if (typeof window !== 'undefined' && window !== null) {
        if (window?.top?.innerHeight && window?.self.innerHeight > window?.top?.innerHeight) {
          const scrollTop = window?.top.pageYOffset || window?.top.document?.documentElement.scrollTop;
          popupStyle.top = `${scrollTop + margin}px`;
          popupStyle.transform = 'translateX(-50%)';
          if (parentWindowHeight) {
            popupStyle.maxHeight = parentWindowHeight;
          }
        }
      }
    } catch (e) {
      // console.log('Could not set top position to popup.', e.message);
      // Fallback to post messaging method
      if (window?.self.innerHeight > parentWindowHeight) {
        const scrollTop = parentTopScroll < 0 ? Math.abs(parentTopScroll) : 0;
        popupStyle.top = `${scrollTop + margin}px`;
        popupStyle.transform = 'translateX(-50%)';
        if (parentWindowHeight) {
          popupStyle.maxHeight = parentWindowHeight;
        }
      }
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
    <PortalPopup className={`popup ${className || ''}`}>
      <div className={`overlay ${fadedIn ? 'faded-in' : ''}`} onClick={(e: any) => closeCallback(e)}></div>
      <div className={`popup-content ${fadedIn ? 'faded-in' : ''}`} style={popupStyle} ref={refCallback}>
        {children}
        <button title="Close" className="close-popup" onClick={(e: any) => closeCallback(e)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </PortalPopup> :
    <></>
  );
};