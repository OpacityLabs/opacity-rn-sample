/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

LogBox.ignoreLogs([
  'A props object containing a "key" prop is being spread into JSX:',
  'JSONValueNode: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
  'JSONArrow: Support',
]);
