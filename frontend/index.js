/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//console.log('App name:', appName);
//console.log('App component:', App);

AppRegistry.registerComponent(appName, () => App);
