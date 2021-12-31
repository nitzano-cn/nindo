import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLink, faStar } from '@fortawesome/free-solid-svg-icons';

import { Popup } from '../../../external/components/popup/popup.comp';
import { CopyInput } from '../../../external/components/copyInput/copyInput.comp';
import { Button } from '../../../external/components/button/button.comp';
import { PremiumOpener } from '../../../external/components/premiumOpener/premiumOpener.comp';
import { FormRow } from '../../../external/components/formRow/formRow.comp';
import { exportService } from '../../services';
import { IPlugin, TChildren } from '../../../external/types/plugin.types';
import { SystemIcon } from '../../../external/components/icon/icon.comp';
import { notificationHelper } from '../../../external/helpers/notification.helper';

import './exportMenu.scss';

export interface IExtraMenuItem {
  name: string
  links: {
    children: TChildren
    isPremium?: boolean
  }[]
}

interface ExportMenuProps {
  plugin: IPlugin<any>
  shareUrl: string
  canUserExport?: boolean
  hideExportMenu?: boolean
  hideShareMenu?: boolean
  extraMenuItems?: IExtraMenuItem[]
};

export const ExportMenu = (props: ExportMenuProps) => {
  const { plugin, shareUrl, canUserExport, hideExportMenu, hideShareMenu, extraMenuItems } = props;
  const { guid, name } = plugin;
  const [exporting, setExporting] = useState<boolean>(false);
  const [linkPopupOpened, setLinkPopupOpened] = useState<boolean>(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const pdfLinkRef = useRef<HTMLAnchorElement>(null);
  
  async function fetchJobStatus(jobId: number, notificationId: string) {
    const startTime = Date.now();

    try {
      const jobStatus = await exportService.getJobStatus(jobId);

      if (!jobStatus.success) {
        notificationHelper.hide(notificationId);

        notificationHelper.error({
          title: 'Could not export plugin',
          position: 'tc',
          autoDismiss: 3,
        });
        return;
      }

      const status = jobStatus.data.status;

      if (status === 'processing') {
        const timeDiff = 1500 - (Date.now() - startTime);

        return window.setTimeout(() => { 
          fetchJobStatus(jobId, notificationId);
        }, timeDiff);
      } else if (status === 'error') {
        throw new Error();
      }

      notificationHelper.hide(notificationId);

      notificationHelper.success({
        title: 'Great Success!',
        message: 'Download will start automatically.',
        position: 'tc',
        autoDismiss: 3,
      });
      
      if (linkRef.current) {
        linkRef.current.href = jobStatus.data.imageUrl;
        linkRef.current.download = `${Date.now()}`;
        linkRef.current.click();
      }
    } catch (e) {
      notificationHelper.hide(notificationId);

      notificationHelper.error({
        title: 'Could not export plugin',
        position: 'tc',
        autoDismiss: 3,
      });
    }

    setExporting(false);

    return;
  };

  async function exportPlugin(exportType: 'image' | 'pdf') {
    if (!guid) {
      notificationHelper.info({
        title: 'This option will be available after saving the plugin.',
        position: 'tc',
        autoDismiss: 4.5,
      });
      return;
    }

    if (!canUserExport) {
      notificationHelper.removeAll();
      notificationHelper.warning({
        title: '✭ Premium Feature',
        message: 'Your current plan doesn\'t support the export feature.',
        children: <PremiumOpener>Upgrade your account now!</PremiumOpener>,
        position: 'tc',
        autoDismiss: 4,
      });
      return;
    }

    if (exporting) {
      return;
    }

    setExporting(true);

    const uid = 'plugin-export';
    notificationHelper.info({
      title: 'Exporting Plugin',
      message: 'That might take a few seconds...',
      position: 'tc',
      autoDismiss: 0,
      uid
    });

    try {
      const job = await exportService.createExportJob(guid, exportType);
      
      if (job.success && job.data.jobId) {
        fetchJobStatus(job.data.jobId, uid);
      } else {
        throw new Error();        
      }
    } catch (e) {
      notificationHelper.hide(uid);

      notificationHelper.error({
        title: 'Could not export plugin',
        position: 'tc',
        autoDismiss: 3,
      });
    }
  }

  function share(shareType: 'facebook' | 'twitter' | 'email') {
    if (!guid) {
      notificationHelper.info({
        title: 'This option will be available after saving the plugin.',
        position: 'tc',
        autoDismiss: 4.5,
      });
      return;
    }
    
    let url = shareUrl;

    switch (shareType) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${shareUrl}&via=CommonNinja&text=${name} - Powered by Common Ninja`;
        break;
      case 'email':
        url = `mailto:mail@host.com?subject=${name} - Powered by Common Ninja&body=${shareUrl}`;
        break;
    }

    const left = 20;
    const top = 20;
    const popup = window.open(url, '', 'scrollbars=no,height=400,width=500,left=' + left + ',top=' + top + '');
    if (popup && window.focus) {
      popup.focus();
    }
  }

  function linkShare() {
    if (!guid) {
      notificationHelper.info({
        title: 'This option will be available after saving the plugin.',
        position: 'tc',
        autoDismiss: 4.5,
      });
      return;
    }

    setLinkPopupOpened(true);
  }
  
  return (
    <div className="export-menu">
      <ul>
        {
          extraMenuItems?.map((topLink, idx) => (
            <li key={`topLink_${idx}`}>
              <span>{topLink.name}</span>
              <ul>
                {
                  topLink.links.map((link, ldx) => (
                    <li key={`link_${idx}_${ldx}`}>
                      {
                        link.isPremium &&
                        <FontAwesomeIcon icon={faStar} title="Premium feature" />
                      }
                      {link.children}
                    </li>
                  ))
                }
              </ul>
            </li>
          ))
        }
        {
          !hideExportMenu &&
          <li>
            <span>Export</span>
            <ul>
              <li onClick={() => exportPlugin('image')}>
                <FontAwesomeIcon icon={faStar} title="Premium feature" />
                Export to Image
                <a style={{ display: 'none' }} ref={linkRef} href={`/export/${guid}`} download="">Download</a>
              </li>
              <li onClick={() => exportPlugin('pdf')}>
                <FontAwesomeIcon icon={faStar} title="Premium feature" />
                Export to PDF
                <a style={{ display: 'none' }} ref={pdfLinkRef} href={`/export/${guid}`} download="">Download</a>
              </li>
            </ul>
          </li>
        }
        {
          !hideShareMenu &&
          <li>
            <span>Share</span>
            <ul>
              <li onClick={() => linkShare()}>
                <FontAwesomeIcon icon={faLink} title="Share via Link" />
                Share via Link
              </li>
              <li onClick={() => share('facebook')}>
                <SystemIcon type={'facebook'} title="Share on Facebook" size={16} />
                Share on Facebook
              </li>
              <li onClick={() => share('twitter')}>
                <SystemIcon type={'twitter'} title="Share on Twitter" size={16} />
                Share on Twitter
              </li>
              <li onClick={() => share('email')}>
                <FontAwesomeIcon icon={faEnvelope} title="Share on Email" />
                Share on Email
              </li>
            </ul>
          </li>
        }
      </ul>
      <Popup
        className={'share-link-popup'}
        show={linkPopupOpened}
        closeCallback={() => setLinkPopupOpened(false)}
      >
        <React.Fragment>
          <h2>Share Your Plugin</h2>
          <section>
            <p className="center">Use the link below to share your plugin:</p>
            <FormRow>
              <CopyInput 
                value={shareUrl}
                className="form-row"
                buttonClassName="button green"
                postMessageText="Link Copied!"
              />
            </FormRow>
            <div className="buttons-wrapper">
              <Button onClick={() => setLinkPopupOpened(false)}>
                Close
              </Button>
            </div>
          </section>
        </React.Fragment>
      </Popup>
    </div>
  );
};