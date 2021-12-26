import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons'

import './copyInput.scss';

type CopyInputProps = {
  value: string
  inputType?: 'input' | 'textarea'
  postMessageText?: string
  className?: string
  buttonClassName?: string
  postMessageClassName?: string
  postMessageTimeout?: number
}

export const CopyInput = (props: CopyInputProps) => {
  const { value, postMessageText, inputType, className, buttonClassName, postMessageClassName, postMessageTimeout } = props;
  const [postMessage, setPostMessage] = useState<string>('');
  const inputRef = useRef<any>(null);

  function buttonClicked(e: any, fromButton: boolean = false) {
    e.preventDefault();

    if (!inputRef || !inputRef.current) {
      return;
    }

    inputRef.current.select();

    if (!fromButton) {
      return;
    }

    document?.execCommand?.('Copy');
    setPostMessage('Link Copied!');

    window?.setTimeout(() => {
      setPostMessage('');
    }, postMessageTimeout || 2000);
  }

  return (
    <div className={`copy-input ${className ? className : ''}`}>
      {
        inputType === 'textarea' ? 
        <textarea style={{ resize: 'none' }} ref={inputRef} readOnly onClick={buttonClicked} value={value}></textarea> :
        <input ref={inputRef} type="text" value={value} readOnly onClick={buttonClicked} />
      }
      <button className={`copy-input-button ${buttonClassName ? buttonClassName : ''}`} title="Copy to Clipboard" onClick={(e) => buttonClicked(e, true)}>
        <FontAwesomeIcon icon={faClipboard} />
      </button>
      {
        postMessage &&
        <div className={`copy-input-post-message ${postMessageClassName ? postMessageClassName : ''}`}>{postMessageText || 'Copied'}</div>
      }
    </div>
  );
};