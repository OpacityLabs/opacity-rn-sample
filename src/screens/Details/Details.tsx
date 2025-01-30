import {NavigationProp, RouteProp} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import tw from 'twrnc';
import {MainStackParams} from '../../navigation';
import {useAppSelector} from '../../hooks/store';
import {isEqual, partialRight} from 'lodash';
import {platformSelector, resourceSelector} from '../../state/selectors';
import JSONTree from 'react-native-json-tree';

const theme = {
  scheme: 'Gray',
  author: 'Claude',
  base00: '#06091C',
  base01: '#585858',
  base02: '#626262',
  base03: '#6C6C6C',
  base04: '#7A7A7A',
  base05: '#8E8E8E',
  base06: '#A2A2A2',
  base07: '#BABABA',
  base08: '#D0D0D0',
  base09: '#C2C2C2',
  base0A: '#D6D6D6',
  base0B: '#E0E0E0',
  base0C: '#EAEAEA',
  base0D: '#F0F0F0',
  base0E: '#F6F6F6',
  base0F: '#FFFFFF',
};

interface Props {
  navigation: NavigationProp<MainStackParams, 'Details'>;
  route: RouteProp<MainStackParams, 'Details'>;
}

export const Details = ({navigation, route}: Props) => {
  const {platformId, resourceId, payload} = route.params;
  console.log(payload.data);

  const platform = useAppSelector(
    partialRight(platformSelector, platformId),
    isEqual,
  );
  const resource = useAppSelector(
    partialRight(resourceSelector, platformId, resourceId),
    isEqual,
  );

  if (!platform || !resource) {
    return null;
  }

  return (
    <View style={tw`flex-1 bg-[#06091C]`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={tw`flex-1`}>
          <View style={tw`flex-row items-center justify-between px-4`}>
            <Pressable
              style={tw`h-8 w-8 items-center justify-center`}
              onPress={navigation.goBack}>
              <Image
                source={require('../../../assets/icons/chevron-left.png')}
                style={tw`h-6 w-6`}
              />
            </Pressable>

            <View style={tw`flex-1 items-center justify-center`}>
              <Text style={tw`text-white`}>Details</Text>
            </View>

            <View style={tw`h-8 w-8`} />
          </View>
          <View style={tw`p-4 items-center justify-center mt-4`}>
            <Image source={{uri: platform.logoUrl}} style={tw`h-12 w-12`} />
            <Text style={tw`text-white text-lg font-medium mt-1`}>
              {platform.name}
            </Text>
          </View>

          <View style={tw`p-4 w-full`}>
            <View
              style={tw`bg-[#06091C] border border-[#4E4E4E] min-h-[320px] rounded-2xl p-2`}>
              <View style={tw`p-2 overflow-hidden`}>
                <JSONTree data={payload} theme={theme} invertTheme={false} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};
