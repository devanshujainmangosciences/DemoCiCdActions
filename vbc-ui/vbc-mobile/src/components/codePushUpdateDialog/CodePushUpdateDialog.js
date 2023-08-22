/**
 * Component to show Code Push update Dialog
 */
import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../../../i18n';
import codePush from 'react-native-code-push';
import {caculateCodePushProgress, measureConnectionSpeed} from 'utils';
import {ConfirmationModal} from 'components';
import {MINIMUM_INTERNET_SPEED_REQUIRED} from 'constants/appConstants';

const CodePushUpdateDialog = () => {
  const appState = useRef(AppState.currentState);
  const {t} = useTranslation(['sidebar']);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isUpdateMandatory, setIsUpdateMandatory] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [updateProgressPercent, setUpdateProgressPercent] = useState(0);
  const [sizeText, setSizeText] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [enableQuitButton, setEnableQuitButton] = useState(false);

  // code push checks for update and if any then shows the update permission modal
  const syncImmediate = async () => {
    // check for code push update only if network speed is more than 1 mbps
    codePush.checkForUpdate().then(async (update) => {
      if (update) {
        const updateMessageBasedOnNetworkSpeed = await codePushDialogMessage(
          update.isMandatory
        );
        setUpdateMessage(updateMessageBasedOnNetworkSpeed);
        setIsUpdateMandatory(update.isMandatory);
        setShowUpdateModal(true);
      }
    });
  };

  const codePushDialogMessage = async (isMandatoryUpdate) => {
    // calculate network speed in mbps
    const networkSpeed = await measureConnectionSpeed();

    /**
     * if network update is less then minimum threshold, then, show
     * message on button according to if update is mandatory or not,
     * else show as general message t('networkSlow'), also is in this case, if update
     * is mandatory, then show quit button also on click of which app will quit.
     */
    if (networkSpeed.speed > MINIMUM_INTERNET_SPEED_REQUIRED) {
      setEnableQuitButton(false);
      if (isMandatoryUpdate) return t('mandatoryUpdateRequired');
      else return t('updateRequired');
    } else {
      setEnableQuitButton(isMandatoryUpdate);
      return t('networkSlow');
    }
  };

  // called when user click on cancel button of the modal
  const onCancelUpdateModal = () => {
    setShowUpdateModal(false);
  };

  // called when code push is downloading an upate to show progress indicator
  var downloadProgressCallback = (progress) => {
    const {
      currProgress,
      partialSizeInMB,
      totalSizeInMb,
    } = caculateCodePushProgress(progress);
    setUpdateProgress(currProgress);
    setUpdateProgressPercent(
      ((progress.receivedBytes / progress.totalBytes) * 100).toFixed()
    );
    setSizeText(
      partialSizeInMB + ' ' + t('mb') + ' of ' + totalSizeInMb + ' ' + t('mb')
    );
  };

  // called when user clicks on the confirm button of the modal
  const onConfirmUpdateModal = () => {
    codePush.sync(
      {installMode: codePush.InstallMode.IMMEDIATE},
      (status) => {
        switch (status) {
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            setUpdateLoading(true);
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            setUpdateLoading(true);
            break;
          case codePush.SyncStatus.UPDATE_INSTALLED:
            setUpdateLoading(false);
            setShowUpdateModal(false);
            break;
        }
      },
      downloadProgressCallback
    );
  };

  // calls sync immediate function to check if there is any update or not with code push
  useEffect(() => {
    syncImmediate();
  }, []);

  // access app state to call code push check for update whenever app comes to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        syncImmediate();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ConfirmationModal
      isVisible={showUpdateModal}
      onConfirmedConfirmationModal={onConfirmUpdateModal}
      onCancelConfirmationModal={onCancelUpdateModal}
      title={updateMessage}
      hideCloseButton={isUpdateMandatory}
      loader={updateLoading}
      progress={updateProgress}
      progressPercent={updateProgressPercent}
      showProgress={updateLoading}
      sizeText={sizeText}
      enableQuitButton={enableQuitButton}
    />
  );
};

export default CodePushUpdateDialog;
