import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {MainStackParams} from '../../navigation';
import {useAppSelector} from '../../hooks/store';
import {delay, isEqual, partialRight, sortBy} from 'lodash';
import {platformSelector} from '../../state/selectors';
import {Image, Pressable, Text, View} from 'react-native';
import tw from 'twrnc';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getResource} from '@opacity-labs/react-native-opacity';
import {Swing} from 'react-native-animated-spinkit';

interface Props {
  navigation: NavigationProp<MainStackParams, 'Resources'>;
  route: RouteProp<MainStackParams, 'Resources'>;
}

export const Resources = ({navigation, route}: Props) => {
  const {platformId} = route.params;
  const platform = useAppSelector(
    partialRight(platformSelector, platformId),
    isEqual,
  );

  // Flags
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleGetResources = async (resource: Resource) => {
    try {
      setIsLoading(true);

      const result = await getResource(resource.alias as any);
      navigation.navigate('Details', {
        platformId,
        resourceId: resource.id,
        payload: result,
      });
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (platform) return;
    navigation.goBack();
  }, [platform]);

  useEffect(() => {
    if (!isError) return;

    delay(() => setIsError(false), 3 * 1000);
  }, [isError]);

  if (!platform) {
    return null;
  }

  return (
    <>
      <View style={tw`flex-1 bg-[#06091C]`}>
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
          </View>
          <View style={tw`p-4 items-center justify-center mt-4`}>
            <Image source={{uri: platform.logoUrl}} style={tw`h-12 w-12`} />
            <Text style={tw`text-white text-lg font-medium mt-1`}>
              {platform.name}
            </Text>
          </View>
          <View style={tw`p-4`}>
            <Text style={tw`text-white text-base font-medium mb-1`}>
              Sample resources
            </Text>
            <Text style={tw`text-neutral-500 text-sm`}>
              Select a resource to view a sample response. You'll need to log
              into the platform to view the response.
            </Text>
          </View>
          <View style={tw`p-4 gap-y-8`}>
            {sortBy(platform.resources, 'name').map(resource => (
              <Pressable
                key={resource.id}
                onPress={() => handleGetResources(resource)}
                style={tw`flex-row items-center justify-between`}>
                <View>
                  <Text style={tw`text-white font-medium`}>
                    {resource.name}
                  </Text>
                  <Text style={tw`text-neutral-500 text-xs`}>
                    {resource.alias}
                  </Text>
                </View>

                <Image
                  style={tw`h-6 w-6`}
                  source={require('../../../assets/icons/chevron-right.png')}
                />
              </Pressable>
            ))}
          </View>
        </SafeAreaView>
      </View>

      {isLoading ? (
        <View
          style={tw`absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.2)] items-center justify-center`}>
          <Swing size={96} color="white" />
        </View>
      ) : null}

      {isError ? (
        <View
          style={tw`absolute bottom-16 left-4 right-4 items-center justify-center`}>
          <Pressable
            style={tw`bg-red-400 flex-row items-center py-2 px-3 rounded-full`}
            onPress={() => setIsError(false)}>
            <Image
              source={require('../../../assets/icons/error.png')}
              style={tw`h-4 w-4 mr-2`}
            />
            <Text style={tw`text-black text-xs`}>
              An error occurred. Unable to fetch data.
            </Text>
          </Pressable>
        </View>
      ) : null}
    </>
  );
};
