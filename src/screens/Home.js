import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {deviceHeight, deviceWidth} from '../components/Dimensions';
import React, {useState} from 'react';
import Main from '../bottom/Main';
import Reorder from '../bottom/Reorder';
import Account from '../bottom/Account';
import Cart from '../bottom/Cart';
import Favorite from '../bottom/Favorite';
import {useSelector} from 'react-redux';

const Home = () => {
  [selectedTab, setSelectedTab] = useState(0);
  const cartItem = useSelector(state => state.reducer);
  const cartCount = cartItem.length;
  return (
    <View style={{flex: 1}}>
      {selectedTab == 0 ? (
        <Main />
      ) : selectedTab == 1 ? (
        <Reorder />
      ) : selectedTab == 2 ? (
        <Cart />
      ) : selectedTab == 3 ? (
        <Favorite />
      ) : (
        <Account />
      )}

      <View
        style={{
          width: deviceWidth,
          height: 60,
          backgroundColor: '#fac0ee',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          alignItems: 'center',
          flexDirection: 'row',
          bottom: 0,
          position: 'absolute',
          justifyContent: 'space-between',
          elevation: 5,
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(1);
          }}
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 30,
              tintColor: selectedTab == 1 ? 'white' : null,
              width: 30,
            }}
            source={require('../images/BottemNavigation/reorder.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(2);
          }}
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#ff6f6f',
              height: 16,
              width: 16,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 6,
            }}>
            <Text style={{fontSize: 14, alignItems: 'center', color: 'white'}}>
              {cartCount}
            </Text>
          </View>
          <Image
            style={{
              height: 30,
              width: 30,
              marginBottom: 14,
              tintColor: selectedTab == 2 ? 'white' : null,
            }}
            source={require('../images/BottemNavigation/shopping_cart.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(0);
          }}
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 30,
              width: 30,
              tintColor: selectedTab == 0 ? 'white' : null,
            }}
            source={require('../images/BottemNavigation/home.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(3);
          }}
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 30,
              width: 30,
              tintColor: selectedTab == 3 ? 'white' : null,
            }}
            source={require('../images/favoriteFilled.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(4);
          }}
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 30,
              width: 30,
              tintColor: selectedTab == 4 ? 'white' : null,
            }}
            source={require('../images/BottemNavigation/account.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
