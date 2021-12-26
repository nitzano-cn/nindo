import React, { useState } from 'react';

import { Button } from '../../../external/components/button/button.comp';
import { Popup } from '../../../external/components/popup/popup.comp';
import { ShadowHint } from '../../../external/components/shadowHint/shadowHint.comp';

import './templatesPopup.scss';

interface IPluginTemplatesPopupProps {
  closeCallback: () => void;
  pluginTemplates: IPluginTemplate[];
  onSelect: (data: any) => void;
}

export interface IPluginTemplate {
  id: string;
  name: string;
  data: any
  thumbnail?: string;
}

const blankTemplate: IPluginTemplate = {
  id: 'blank',
  name: 'Blank',
  data: null
}

export const TemplatesPopup = ({ pluginTemplates, closeCallback, onSelect }: IPluginTemplatesPopupProps) => {
  const [selected, setSelected] = useState<IPluginTemplate | null>({ ...blankTemplate });

  function save() {
    onSelect(selected?.data || null);
    closeCallback();
  }

  return (
    <Popup
      className={'templates-popup'}
      show={true}
      closeCallback={closeCallback}
    >
      <h2>Template Library</h2>
      <section>
        <p className="center">Save Time, Choose a Pre-Made Template:</p>
        <div className="templates-container">
          <ShadowHint direction="top" />
          <div className="templates-wrapper">
            {
              [{ ...blankTemplate }, ...pluginTemplates].map((template: IPluginTemplate) => (
                <div 
                  key={`template_${template.id}`} 
                  className={`template-item ${selected?.id === template.id ? 'selected': ''}`}
                  onClick={() => setSelected(selected?.id === template.id ? null : template)}
                >
                  <h4>{template.name}</h4>
                  <div className="img">
                    {
                      template.thumbnail &&
                      <img src={template.thumbnail} alt={template.name} />
                    }
                  </div>
                </div>
              ))
            }
          </div>
          <ShadowHint direction="bottom" />
        </div>
        <div className="buttons-wrapper">
          <Button color="green" onClick={save} disabled={!selected}>Select & Continue</Button>
        </div>
      </section>
    </Popup>
  );
};