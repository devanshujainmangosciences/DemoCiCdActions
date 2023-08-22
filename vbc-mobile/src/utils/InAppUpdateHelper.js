import {Platform} from 'react-native';
import SpInAppUpdates, {
  IAUUpdateKind,
  IAUInstallStatus,
} from 'sp-react-native-in-app-updates';

export const checkForInAppUpdates = () => {
  // initisalise SpInAppUpdates
  const inAppUpdates = new SpInAppUpdates(
    false // isDebug
  );

  // checks for any update available on play store or app store and performs in app updates
  inAppUpdates.checkNeedsUpdate().then((result) => {
    if (result.shouldUpdate) {
      let updateOptions = {};
      if (Platform.OS === 'android') {
        // android only, on iOS the user will be promped to go to your app store page
        updateOptions = {
          updateType: IAUUpdateKind.FLEXIBLE,
        };
      }
      // setup listener, so when download finishes, start installation without navigating to play store
      inAppUpdates.addStatusUpdateListener((downloadStatus) => {
        if (downloadStatus.status === IAUInstallStatus.DOWNLOADED) {
          inAppUpdates.installUpdate();
          inAppUpdates.removeStatusUpdateListener((finalStatus) => {});
        }
      });
      inAppUpdates.startUpdate(updateOptions);
    }
  });
};
