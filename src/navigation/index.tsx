import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RedditLogin} from '../screens/Reddit';
import {AccountDetailCard} from '../screens/AccountDetails/AccountDetailCard';
import {Start} from '../screens/Start/Start';
import {useAppSelector} from '../hooks/store';
import {hasApiKeySelector} from '../state/selectors';
import {Platforms} from '../screens/Platforms';
import {Resources} from '../screens/Resources';
import {Details} from '../screens/Details';

export type MainStackParams = {
  RedditLogin: undefined;
  AccountDetails: undefined;
  Start: undefined;
  Platforms: undefined;
  Resources: {
    platformId: string;
  };
  Details: {
    platformId: string;
    resourceId: string;
    payload: any;
  };
};

const Stack = createNativeStackNavigator<MainStackParams>();

export const Navigation = () => {
  const hasApiKey = useAppSelector(hasApiKeySelector);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={hasApiKey ? 'Platforms' : 'Start'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Platforms" component={Platforms} />
        <Stack.Screen name="Resources" component={Resources} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="RedditLogin" component={RedditLogin} />
        <Stack.Screen name="AccountDetails" component={AccountDetailCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
