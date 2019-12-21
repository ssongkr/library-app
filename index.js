import { AppRegistry } from 'react-native';
import App from './App';
import bgMessaging from './sources/modules/bgMessaging';

AppRegistry.registerComponent('SejongLibraryProject', () => App);
// Current main application

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line

console.disableYellowBox = true;

