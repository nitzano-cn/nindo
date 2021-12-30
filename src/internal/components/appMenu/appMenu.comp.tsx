import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import { TChildren } from '../../../external/types/plugin.types';
import { PremiumOpener } from '../../../external/components/premiumOpener/premiumOpener.comp';
import { Button } from '../../../external/components/button/button.comp';
import { UpgradePopup } from '../upgradePopup/upgradePopup.comp';
import { IAppMenuLink } from '../../../external/types/appMenu.types';
import { eventService, pluginService } from '../../services';
import { useQuery } from '../../../external/hooks/query.hook';
import { TPlatform } from '../../../external/types/editor.types';

import './appMenu.scss';

interface AppMenuProps {
  links: IAppMenuLink[]
  serviceName?: string  
  showPremiumButton?: boolean
  onPremiumPopupOpenerClick?: (e: any) => void
  userIsAuthenticated?: boolean  
  children?: TChildren
  vendor?: TPlatform
};

export const AppMenu = (props: AppMenuProps) => {
  const { 
    links, 
    children, 
    serviceName, 
    onPremiumPopupOpenerClick, 
    showPremiumButton, 
    userIsAuthenticated,
    vendor,
  } = props;
  const query = useQuery();
  const [upgradePopupOpened, setUpgradePopupOpened] = useState<boolean>(false);

  function getBadgeValue(badge?: string | number): string {
    if (!badge) {
      return '';
    }

    if (typeof badge === 'string') {
      return badge;
    }

    const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

    // what tier? (determines SI symbol)
    const tier = Math.log10(badge) / 3 | 0;

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = badge / scale;

    // format number and add suffix
    return scaled.toFixed(0) + suffix + (scaled > 1000 ? '+' : '');
  }
  
  return (
    <aside className="main-menu">
      <div className="inner">
        {
          links.map((link) => (
            <NavLink exact={typeof link.exact === 'undefined' ? true : link.exact} to={`${link.url}?${query.toString()}`} activeClassName="active" key={`menu_link_${link.name}`}>
              {
                link.icon &&
                <FontAwesomeIcon icon={link.icon} />
              }
              <span>
                {link.name}
                {
                  typeof link.badge !== 'undefined' &&
                  <strong className="badge" title={`${link.badge}`}>{getBadgeValue(link.badge)}</strong>
                }
              </span>
            </NavLink>
          ))
        }
        {
          children && 
          children
        }
        {
          showPremiumButton &&
          <div className="premium-popup-opener-wrapper">
            <PremiumOpener>
              <Button mode="primary">
                <FontAwesomeIcon icon={faStar} />
                <span> Upgrade to Premium</span>
              </Button>
            </PremiumOpener>
          </div>
        }
        <div 
          id="premium-popup-opener" 
          onClick={(e: any) => {
            eventService.reportMixpanelEvent('Upgrade to premium', { serviceName: pluginService.serviceName, authenticated: userIsAuthenticated });

            if (onPremiumPopupOpenerClick) {
              onPremiumPopupOpenerClick(e);
            } else {
              setUpgradePopupOpened(true);
            }
          }}
        ></div>
        <UpgradePopup 
          serviceName={serviceName || ''} 
          show={upgradePopupOpened}
          className="upgrade-popup"
          closeCallback={() => setUpgradePopupOpened(false)}
          vendor={vendor}
        />
      </div>
    </aside>
  );
};