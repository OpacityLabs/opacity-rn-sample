import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';

export const BackButtonHeader = () => {
  const {goBack} = useNavigation();

  return (
    <View style={tw`flex-row items-center justify-between m-4`}>
      <TouchableOpacity onPress={goBack} hitSlop={4}>
        <Text style={tw`text-white text-base mb-1`}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};