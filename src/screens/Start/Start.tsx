import React, {useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import tw from 'twrnc';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParams} from '../../navigation';
import {useAppDispatch} from '../../hooks/store';
import {setApiKeyState} from '../../state/reducer';

export const Start = () => {
  const navigation =
    useNavigation<NavigationProp<MainStackParams, 'RedditLogin'>>();
  const [apiKey, setApiKey] = useState('');
  const dispatch = useAppDispatch();

  const handleNavigation = async () => {
    dispatch(setApiKeyState(apiKey));
    navigation.navigate('Platforms');
  };

  return (
    <ImageBackground
      style={tw`flex-1`}
      source={require('../../../assets/backgrounds/start.png')}>
      <SafeAreaView style={tw`flex-1`}>
        <View style={tw`flex-1 items-center justify-center pb-24 px-4`}>
          <Image
            style={tw`h-[32px] w-[191px]`}
            source={require('../../../assets/images/logo.png')}
          />
          <View>
            <Text style={tw`text-neutral-500 mt-2 mb-6`}>Lorem ipsum</Text>
          </View>

          <View
            style={tw`h-12 px-4 mb-2 flex-row w-full border border-gray-900 rounded-full bg-[#06091C]`}>
            <TextInput
              placeholderTextColor={'#CACACA'}
              placeholder="Enter your API key"
              value={apiKey}
              onChangeText={setApiKey}
              style={tw`text-white`}
            />
          </View>
          <Pressable
            style={tw.style(
              `items-center justify-center h-12 w-full rounded-full text-sm`,
              apiKey.length ? 'bg-[#4FB5FF]' : 'bg-neutral-500',
            )}
            disabled={!apiKey}
            onPress={handleNavigation}>
            <View style={tw`flex-row flex-1 justify-between items-center`}>
              <Text style={tw`text-black text-sm`}>Next</Text>
            </View>
          </Pressable>

          <View style={tw`mt-4 w-full`}>
            <Text style={tw`text-sm text-neutral-300 text-center`}>
              This sample app requires an API key.{' '}
              <Text style={tw`text-sm text-neutral-300 underline`}>
                Get one here
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
