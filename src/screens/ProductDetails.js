import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {deviceHeight, deviceWidth} from '../components/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {addToCart, addToFavorite} from '../redux/Action';

const ProductDetails = ({route}) => {
  const {product} = route.params;
  const cartItem = useSelector(state => state.reducer);
  const cartCount = cartItem.length;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(false);

  const handleAddToCart = item => {
    dispatch(addToCart(item));
  };
  const handleAddToFavorite = item => {
    dispatch(addToFavorite(item));
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: deviceWidth,
          height: 60,
          backgroundColor: '#fac0ee',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingRight: 10,
          paddingLeft: 10,

          borderBottomRightRadius: 10,

          borderBottomLeftRadius: 10,
          elevation: 15,
        }}>
        <Image
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: 'white',
          }}
          source={require('../images/apps.png')}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
              width: 90,
              marginRight: 10,
              backgroundColor: 'orange',
              borderRadius: 10,
              borderColor: 'black',
              borderWidth: 1,
            }}>
            <Text style={styles.countItem}>{cartCount}</Text>
            <Image style={styles.img} source={require('../images/card.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Image source={{uri: product.image}} style={styles.productImage} />
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productBrand}>{product.brand}</Text>
        <Text style={styles.productPrice}>Rs {product.price}</Text>
        <Text style={styles.productDescription}>{product.discription}</Text>
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => handleAddToCart(product)}
            style={{
              backgroundColor: '#ff6f6f',
              borderRadius: 8,
              width: '80%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Add To Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFavorite(true), handleAddToFavorite(product);
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: 50,
                tintColor: favorite == true ? '#ff6f6f' : '#c9c3c3',
                width: 50,
              }}
              source={require('../images/favoriteFilled.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: deviceHeight,
    backgroundColor: '#ffe8ff',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  productBrand: {
    fontSize: 22,
    color: 'gray',
    fontWeight: '600',
    marginVertical: 6,
  },
  productPrice: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  productDescription: {
    fontSize: 18,
    color: 'black',
    marginTop: 6,
  },
  countItem: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  img: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
});
export default ProductDetails;
