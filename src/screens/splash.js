import {View, Image, ImageBackground, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {deviceWidth, deviceHeight} from '../components/Dimensions';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, []);

  return (
    <View style={style.container}>
      <Image
        style={style.logoImage}
        source={require('../images/splash/logo.png')}
      />
      <Image
        style={style.DownImage}
        source={require('../images/splash/bottemImg1.png')}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
  },
  DownImage: {
    height: deviceHeight - 400,
    width: deviceWidth + 200,
    marginTop: 10,
    marginLeft: 30,
  },
  logoImage: {
    marginTop: 210,
  },
});
export default Splash;
