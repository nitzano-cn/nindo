import React, { useState } from 'react';
import AceEditor from 'react-ace';

import { PluginWrapper } from '../../../internal/components/pluginWrapper/pluginWrapper.comp';
import { IPluginComp } from '../../types/plugin.types';
import { Button } from '../button/button.comp';

import './customCSSEditor.scss';

require('ace-builds/src-noconflict/mode-css');
require('ace-builds/src-noconflict/theme-xcode');
require('ace-builds/src-noconflict/ext-language_tools');
require('ace-builds/webpack-resolver');

interface CustomCSSEditor<T> {
  onUpdate: (newStyles: string) => void
  pluginComp: IPluginComp<T>
  css: string
  title?: string
  defaultStyles?: string
}

export const CustomCSSEditor = (props: CustomCSSEditor<any>) => {
  const { title, pluginComp, css, defaultStyles, onUpdate } = props;
  const [customCSS, setCustomCSS] = useState<string>(css || defaultStyles || '');
  
  function save() {
    const trimmedCSS = customCSS.trim();
    const css = defaultStyles === trimmedCSS ? '' : trimmedCSS;
    onUpdate(css);
  }

  function onChange(newValue: string) {
    setCustomCSS(newValue);
  }

  return (
    <React.Fragment>
      <h2>{title || 'Edit CSS'}</h2>
      <div className="custom-css-editor">
        <AceEditor
          placeholder="Enter Custom CSS"
          mode="css"
          theme="xcode"
          name="custom-css-editor"
          // onLoad={this.onLoad}
          onChange={onChange}
          fontSize={14}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          value={customCSS}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
        <div className="custom-css-preview">
          <style dangerouslySetInnerHTML={{ __html: customCSS }}></style>
          <PluginWrapper mode="editor" pluginComp={pluginComp} />
        </div>
      </div>
      <div className="buttons-wrapper center">
        <Button color="green" onClick={save}>Save</Button>
      </div>
    </React.Fragment>
  );
};