/**
 * Defining react native's starting point
 * to the metro bundler.
 */
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {notificationService} from 'utils/PushNotificationHelper';

notificationService.configure(notificationService.onOpenNotification);

AppRegistry.registerComponent(appName, () => App);
