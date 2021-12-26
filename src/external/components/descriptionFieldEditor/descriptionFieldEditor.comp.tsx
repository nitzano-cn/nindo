import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IAppState } from '../../types/state.types';
import { descriptionUpdated } from '../../../internal/actions/plugin.actions';
import { FormLabel } from '../formLabel/formLabel.comp';
import { FormRow } from '../formRow/formRow.comp';
import { RichEditorWithImages } from '../richEditor/richEditor.comp';

export const DescriptionFieldEditor = ({ 
  currentValue, 
  richEditorMode, 
  maxCharacters, 
  imageUploadEnabled 
}: { 
  currentValue: string, 
  richEditorMode?: boolean, 
  maxCharacters?: number,
  imageUploadEnabled?: boolean
}) => {
  const { plugin } = useSelector((state: IAppState<any>) => ({
    plugin: state.plugin,
  }));
  const dispatch = useDispatch();
  
  function setPluginDescription(value = '') {
		dispatch(descriptionUpdated(value));
	}

  return (
    <FormRow flow={richEditorMode ? 'column' : 'row'}>
      <FormLabel>Description</FormLabel>
      {
        richEditorMode ?
        <RichEditorWithImages 
          html={currentValue || ''}
          onChange={(html: string) => setPluginDescription(html)}
          onKeyDown={(e) => {
            if ((currentValue || '').length > (maxCharacters || 1000) && e.key !== 'Backspace') {
              e.preventDefault();
            }
          }}
          pluginId={plugin.guid || ''}
          imageUploadEnabled={!!imageUploadEnabled}
        /> :
        <textarea
          value={currentValue || ''} 
          onChange={(e) => setPluginDescription(e.target.value)} 
        ></textarea>
      }
    </FormRow>
  );
}