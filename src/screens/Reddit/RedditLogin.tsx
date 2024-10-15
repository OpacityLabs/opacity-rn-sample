import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import tw from 'twrnc';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getResource, init} from '@opacity-labs/react-native-opacity';
import {useDispatch} from 'react-redux';
import {MOCK_CONNECTOR_LIST} from '../../utils/mockData';
import {setConnectionData} from '../../state/reducer';
import {MainStackParams} from '../../navigation';
import {apiKeySelector} from '../../state/selectors';
import {useAppSelector} from '../../hooks/store';

export const RedditLogin = () => {
  const {height} = useWindowDimensions();
  const navigation =
    useNavigation<NavigationProp<MainStackParams, 'AccountDetails'>>();
  const apiKey = useAppSelector(apiKeySelector);
  const dispatch = useDispatch();

  // @TODO: change reddit login to abstract the list and fetch the actual workflow id

  useEffect(() => {
    console.log('apiKey', apiKey);
    if (!apiKey) return;

    init(apiKey, false).catch(() => {
      console.error(`FAILED TO INITIALIZE SDK`);
    });
  }, []);

  const handleNavigation = async () => {
    try {
      // trigger sdk
      console.log('starting reddit login');
      const result = await getResource('reddit:read:account');

      console.log('finished reddit login');

      const parsedResult = JSON.parse(result.data);
      console.log({parsedResult});
      // dispatch to global state
      dispatch(
        setConnectionData({
          email: parsedResult.data.identity.email,
          username: parsedResult.data.identity.redditor.name,
        }),
      );
      navigation.navigate('AccountDetails');
    } catch (error) {
      console.log('Reddit account error:' + error);
    }
  };

  const connectorList = MOCK_CONNECTOR_LIST;

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`p-4`}>
        <Text style={tw`text-white text-base font-medium mb-2`}>
          Add a new account
        </Text>
        <Text style={tw`text-sm font-normal text-gray-500`}>
          You can add any account to Opacity using your login credentials.
        </Text>
        <FlatList
          style={tw`mt-4`}
          data={connectorList}
          renderItem={({item}) => (
            <TouchableOpacity
              style={tw`items-center flex-row h-20`}
              onPress={handleNavigation}>
              <View style={tw`flex-row flex-1 justify-between items-center`}>
                <View style={tw`items-center flex-row`}>
                  <Image source={item.icon} style={tw`size-12 mr-4`} />
                  <View>
                    <Text style={tw`mr-2 text-white text-sm font-medium`}>
                      {item.name}
                    </Text>
                    <Text style={tw`mr-2 text-gray-500 text-sm`}>
                      {item.slogan}
                    </Text>
                  </View>
                </View>
                <Image
                  source={require('../../../assets/icons/chevron-right.png')}
                  style={tw`size-4`}
                />
              </View>
            </TouchableOpacity>
          )}
          snapToAlignment="start"
          decelerationRate={'fast'}
          keyExtractor={item => item.id}
          snapToInterval={height}
        />
      </View>
    </SafeAreaView>
  );
};
