import React from "react";

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/LoginScreen';
import SignUp from './src/screens/SignupScreen';
import Main from './src/screens/MainScreen';

import { enableScreens } from 'react-native-screens';

enableScreens(); // 성능 향상 및 화면 전환 최적화

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} /> */}
         <Stack.Screen name="Login" component={Login}  />
         <Stack.Screen name="SignUp" component={SignUp} />
         <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
