import React, {useEffect, useState} from 'react';
import {getResource, init} from '@opacity-labs/react-native-opacity';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {apiKeySelector, platformsSelector} from '../../state/selectors';
import {OPACITY_PLATFORMS_URL} from '../../constants';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import {SafeAreaView} from 'react-native-safe-area-context';
import {sortBy} from 'lodash';
import {setPlatforms} from '../../state/reducer';
import {NavigationProp} from '@react-navigation/native';
import {MainStackParams} from '../../navigation';

interface Props {
  navigation: NavigationProp<MainStackParams, 'Platforms'>;
}

export const Platforms = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const apiKey = useAppSelector(apiKeySelector);
  const platforms = useAppSelector(platformsSelector);

  useEffect(() => {
    if (!apiKey) {
      console.error('Missing API key');
      return;
    }

    init(apiKey, false).catch(() => {
      console.error(`Failed to Initialize SDK`);
    });
  }, []);

  useEffect(() => {
    // Ignore if apiKey is not available
    if (!apiKey) return;

    (async () => {
      const response = await fetch(OPACITY_PLATFORMS_URL, {
        method: 'GET',
        headers: {
          'Authorization-Provider': 'opacity',
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('GET platforms failed');
      }

      dispatch(setPlatforms(sortBy(await response.json(), 'name')));
    })();
  }, [apiKey]);

  return (
    <View style={tw`flex-1 bg-[#06091C]`}>
      <SafeAreaView style={tw`flex-1 p-4`}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={tw`w-[143px] h-[24px] mb-4`}
        />
        <Text style={tw`text-white text-base font-medium mb-1`}>
          Available Platforms
        </Text>
        <Text style={tw`text-sm font-normal text-gray-500`}>
          You can bridge any account with Opacity using your login credentials.
        </Text>

        <View style={tw`flex-1 mt-4`}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {platforms.map(platform => (
              <Pressable
                key={platform.id}
                style={tw`items-center flex-row h-20`}
                onPress={() =>
                  navigation.navigate('Resources', {platformId: platform.id})
                }>
                <View style={tw`flex-row flex-1 justify-between items-center`}>
                  <View style={tw`items-center flex-row`}>
                    <Image
                      source={{uri: platform.logoUrl}}
                      style={tw`size-12 mr-4`}
                    />
                    <View style={tw`flex-1`}>
                      <Text style={tw`mr-2 text-white text-sm font-medium`}>
                        {platform.name}
                      </Text>
                      <Text style={tw`mr-2 text-gray-500 text-sm`}>
                        {platform.description}
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require('../../../assets/icons/chevron-right.png')}
                    style={tw`size-4`}
                  />
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};
