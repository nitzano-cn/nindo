import React from 'react';

import { Popup } from '../../../external/components/popup/popup.comp';
import { TSiteBuilderVendor } from '../../../external/types/editor.types';
import { IUser } from '../../../external/types/user.types';
import { VendorUpgrade } from '../vendorUpgrade/vendorUpgrade.comp';

import './vendorUpgradePopup.scss';

interface IVendorUpgradePopupProps {
  user: IUser
  serviceName: string
  closeCallback: () => void
  vendor: TSiteBuilderVendor | null
}

export const VendorUpgradePopup = ({ vendor, user, closeCallback, serviceName }: IVendorUpgradePopupProps) => {
  return (
    <Popup
      show={!!vendor}
      closeCallback={closeCallback}
      className="vendor-upgrade-popup"
    >
      <VendorUpgrade 
        serviceName={serviceName}
        user={user}
        vendor={vendor}
      />
    </Popup>
  );
}