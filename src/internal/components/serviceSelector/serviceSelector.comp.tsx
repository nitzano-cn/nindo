import React, { useEffect, useState } from 'react';

import { NinjaSkeleton, NinjaSkeletonTheme } from '../../../external/components/skeleton/skeleton.comp';
import { pluginsList } from '../../../external/types/component.types';
import { IPricingModel } from '../../../external/types/plan.types';
import { H2, H4 } from '../heading/heading.comp';
import { NinjaIcon, SystemIcon } from '../../../external/components/icon/icon.comp';
import { getPluginNameByService } from '../../helpers';

import './serviceSelector.scss';

export const ServiceSelectorLoader = () => {
  return (
    <header>
      <hgroup className="page-titles center">
        <H2>
          <NinjaSkeletonTheme leadColor="#16171B">
            <NinjaSkeleton count={1} width={300} height={30} />
          </NinjaSkeletonTheme>
        </H2>
      </hgroup>
    </header>
  );
}

export const ServiceSelector = ({ planData, onChange, showServices }: { planData: IPricingModel, onChange: (serviceName: string) => void, showServices?: boolean }) => {
  const [serviceSelectorOpened, setServiceSelectorOpened] = useState<boolean>(false);

  useEffect(() => {
    function handleOutsideClick(e: any) {
      const target = e.target as HTMLElement;
  
      if (target && !target.closest('.service-selector')) {
        setServiceSelectorOpened(false);
      }
    }

    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    }
  }, []);

  return (
    <H2 className="center">
      <span>See Pricing for </span>
      <strong onClick={(e: any) => {
        e.stopPropagation();
        setServiceSelectorOpened(!serviceSelectorOpened);
      }}>
        <span>{getPluginNameByService(planData.services[0], planData.name)}</span>&nbsp;
        {
          showServices &&
          <>
            <SystemIcon type="chevron-down" size={24} />
            <div className={`service-selector ${serviceSelectorOpened ? 'opened' : ''}`}>
              {
                pluginsList.filter((l) => l.status === 'published').map((listing) => (
                  <div key={`plugin_listing_${listing.name}`} className="plugin-listing" onClick={() => onChange(listing.serviceName)}>
                    <NinjaIcon type={listing.iconClass as any} />
                    <H4>{listing.displayName}</H4>
                  </div>
                ))
              }
            </div>
          </>
        }
      </strong>
    </H2>
  );
}