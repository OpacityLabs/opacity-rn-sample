import React from 'react';
import {Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useAppSelector } from '../../hooks/store';
import { connectionDataSelector } from '../../state/selectors';
import { BackButtonHeader } from '../../components/BackButtonHeader';

export const AccountDetailCard = () => {
  const connectionData = useAppSelector(connectionDataSelector);

  return (
    <SafeAreaView style={tw`flex-1 p-4 bg-black`}>
      <BackButtonHeader />
      <View
        style={tw`flex-1 bg-red-500 border rounded-xl opacity-70`}>
        <View style={tw`flex-1 justify-center p-10`}>
          <Text style={tw`text-white text-xl font-semibold mb-1`}>
            {connectionData?.username}
          </Text>
          <Text style={tw`text-white text-lg font-semibold mb-1`}>
            {connectionData?.email}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};