import React, { useEffect, useRef } from 'react';

import { TSiteBuilderVendor } from '../../../external/types/editor.types';
import { useQuery } from '../../../external/hooks/query.hook';
import { Popup } from '../../../external/components/popup/popup.comp';

import './upgradePopup.scss';

declare global {
  interface Window { CommonninjaAuthSDK: any; }
}

interface IUpgradePopupProps {
  serviceName: string
  show: boolean
  closeCallback: any
  className?: string
  vendor?: TSiteBuilderVendor
}

export const UpgradePopup = (props: IUpgradePopupProps) => {
  const { serviceName, show, closeCallback, className, vendor } = props;
  const query = useQuery();  
  const wrapperRef: any = useRef();
  let popupUrl = `pricing/${serviceName}`;

  if (vendor) {
    popupUrl = `v/${vendor}/${popupUrl}?${query.toString()}`;
  }

  useEffect(() => {
    if (show) {
      if (wrapperRef.current) {
        window?.CommonninjaAuthSDK.embedDashboardView(wrapperRef.current, popupUrl);
      }
    }
  }, [show]);

  return (
    <Popup
      show={show}
      closeCallback={closeCallback}
      className={className}
    >
      <section id="commonninja-dashboard-iframe-wrapper" ref={wrapperRef}></section>
    </Popup>
  );
}
