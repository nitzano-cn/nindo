import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPaintRoller } from '@fortawesome/free-solid-svg-icons';

import './backgroundPicker.scss';

interface IBackgroundPickerProps{
  onSelect: (selectedColor: string)=> void;
  selectedColor: string
}

export const BackgroundPicker = ({onSelect,selectedColor}: IBackgroundPickerProps) => {

  const [isPalleteOpen, setIsPalleteOpen] = useState(false)

  function handleOutsideClick(e: MouseEvent) {
    e.stopPropagation();
    
    const target = e.target as HTMLElement;
    
    if (target && !target.closest('.background-picker-wrapper')) {
      setIsPalleteOpen(false);
    }
  };
  
  function handlePalleteClick(e: any) {
    e.stopPropagation()
    setIsPalleteOpen(!isPalleteOpen)
  }

  function selectColor(e: any, color: string) {
    e.stopPropagation()
    onSelect(color)
  }
  
  useEffect(() => {
    window?.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window?.removeEventListener('mousedown', handleOutsideClick);
    }
  }, []);

  return ( 
    <>
      <div className="background-picker-wrapper">
        <div className={`backgorund-colors-container ${isPalleteOpen ? 'opened' : ''}`}>
          <div className={`background-color-picker white  ${selectedColor==='#fff' ? 'active' : ''}`} onClick={(e)=>selectColor(e, '#fff')}></div>
          <div className={`background-color-picker black ${selectedColor==='#000000' ? 'active' : ''}`} onClick={(e)=>selectColor(e, '#000000')}></div>
          <div className={`background-color-picker gray ${selectedColor==='#bababa' ? 'active' : ''}`} onClick={(e)=>selectColor(e, '#bababa')}></div>
          <div className={`transparent-backgorund ${selectedColor==='' ? 'active' : ''}`} onClick={(e)=>selectColor(e, '')}>
            <FontAwesomeIcon icon={faBan} />
          </div>
        </div>
        <div className={`brush-icon-container ${isPalleteOpen && 'active'}`} onClick={(e)=>handlePalleteClick(e)}>
          <FontAwesomeIcon icon={faPaintRoller} />
        </div>
      </div>
    </>
  )
}
