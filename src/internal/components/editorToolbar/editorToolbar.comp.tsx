import React, { ReactChild, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt, faRedoAlt } from '@fortawesome/free-solid-svg-icons';

import { IUser } from '../../../external/types/user.types';
import { TChildren } from '../../../external/types/plugin.types';
import { Button } from '../../../external/components/button/button.comp';
import { Popup } from '../../../external/components/popup/popup.comp';
import { PreviewPopup } from '../previewPopup/previewPopup.comp';
import { eventService, pluginService } from '../../services';
import { redo, undo } from '../../actions';

import './editorToolbar.scss';

type EditorToolbarProps = {
  saving: boolean
  hasError: boolean
  user: IUser
  plugin: any
  nameUpdatedCallback: (newName: string) => void
  saveCallback: () => void
  previewPath: string
  showHistoryButtons?: TChildren
  extraButtons?: TChildren
  defaultPluginName?: string
  children?: ReactChild
}

export const EditorToolbar = (props: EditorToolbarProps) => {
  const { user, plugin, saving, previewPath, hasError, saveCallback, nameUpdatedCallback, defaultPluginName, children, extraButtons, showHistoryButtons } = props;
  const [changeNamePopupOpened, setChangeNamePopupOpened] = useState<boolean>(false);
  const [previewPopupOpened, setPreviewPopupOpened] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(plugin.name);
  const dispatch = useDispatch();
  const { history } = useSelector(
		(state: any) => ({
			history: state.editor.history,
		})
	);

  function openAuthWindow() {
    const authBtn = document.querySelector('.open-auth') as HTMLElement;
    
    if (authBtn) {
      authBtn.click();
    }
  }

  function save(checkName: boolean = true) {
    if (saving) {
      return;
    }

    if (!user.isAuthenticated) {
      openAuthWindow();
      return;
    }

    // Only check name for create mode
    if (checkName && !plugin.guid && plugin.name === defaultPluginName) {
      setChangeNamePopupOpened(true);
      return;
    }

    // Report event
    eventService.reportMixpanelEvent('Save changes', { 
      serviceName: pluginService.serviceName, 
      authenticated: user.isAuthenticated 
    });

    saveCallback();
  }

  function changeName(newName: string) {
    // Set new name
    nameUpdatedCallback(newName);

    // Close popup
    setChangeNamePopupOpened(false);

    // Save
    save(false);
  }

  function undoCallback(e: any) {
    e.preventDefault();
    dispatch(undo());
  }

  function redoCallback(e: any) {
    e.preventDefault();
    dispatch(redo());
  }

  return (
    <div className="editor-toolbar">
      {children ? children : <span></span>}
      {
        !hasError &&
        <div className="buttons-wrapper">
          {
            saving && 
            <span>Saving Changes...</span>
          }
          {
            showHistoryButtons &&
            <div className="history">
              <button title="Undo" disabled={history.activeIndex <= 0} onClick={undoCallback}>
                <FontAwesomeIcon icon={faUndoAlt} />
              </button>
              <button title="Redo" disabled={history.items.length === 0 || history.activeIndex >= history.items.length - 1} onClick={redoCallback}>
                <FontAwesomeIcon icon={faRedoAlt} />
              </button>
            </div>
          }
          <Button onClick={() => setPreviewPopupOpened(true)}>Preview</Button>
          {extraButtons && extraButtons}
          <Button 
            className="save-button" 
            color="green" 
            mode="major" 
            onClick={() => {
              save(true);
            }}
          >Save Changes</Button>
        </div>
      }

      {/* Preview plugin popup */}
      <PreviewPopup 
        plugin={plugin}
        closeCallback={() => setPreviewPopupOpened(false)}
        previewPath={previewPath}
        show={previewPopupOpened}
      />

      {/* Set a name for default bracket popup */}
      <Popup
        show={changeNamePopupOpened}
        className="change-name-popup"
        closeCallback={() => setChangeNamePopupOpened(false)}
      >
        <h2>Set a Name For Your Plugin</h2>
        <section>
          <p className="center">How would you like to name your plugin?</p>
          <input type="text" maxLength={300} value={tempName} onChange={(e) => setTempName(e.target.value)} />
          <div className="buttons-wrapper center">
            <Button mode="major" onClick={() => changeName(tempName)}>Set Name</Button>
          </div>
        </section>
      </Popup>
    </div>
  );
}
