/**
 * Helper file for handling Push notifications
 * Register for notification and handle notification click
 */

import AsyncStorageKeys from 'constants/AsyncStorageKeys';
import PushNotification from 'react-native-push-notification';
import {storeInAsyncStorage} from './HelperFunctions';
import * as RootNavigation from '../navigation/RootNavigation';

class NotificationService {
  configure = (onOpenNotification) => {
    PushNotification.configure({
      onRegister: async function (token) {
        await storeInAsyncStorage(
          AsyncStorageKeys.DEVICE_TOKEN,
          JSON.stringify(token)
        );
      },
      onNotification: function (notification) {
        notification.userInteraction = true;
        if (onOpenNotification) {
          setTimeout(() => {
            onOpenNotification(notification);
          }, 1000);
        }
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      // IOS ONLY
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // Should the initial notification be popped automatically
      popInitialNotification: true,
      requestPermissions: true,
    });
  };
  // called when user clicks on the notification
  onOpenNotification = async (notify) => {
    if (notify?.data?.componentName) {
      switch (notify?.data?.componentName) {
        case 'patientProfile': {
          RootNavigation.navigate('MyProfile');
          break;
        }
        case 'patientLoanApplication': {
          RootNavigation.navigate('VbcProgram');
          break;
        }
        case 'patientApplicants': {
          RootNavigation.navigate('VbcProgram', {
            screen: 'Applicants',
            initial: false,
          });
          break;
        }
        case 'patientFinancialInformation': {
          RootNavigation.navigate('Others', {
            screen: 'MyFinancialInformation',
            initial: false,
          });
          break;
        }
        case 'applicantStartLoan': {
          RootNavigation.navigate('ApplicantCompleteApplicationStep1');
          break;
        }
        case 'applicantApplicationOverview': {
          RootNavigation.navigate('ApplicantOverview');
          break;
        }
        default: {
          return null;
        }
      }
    }
  };
}

export const notificationService = new NotificationService();
