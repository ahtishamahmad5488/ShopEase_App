import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {addToCart, removeFromFavorite} from '../redux/Action';
import {useNavigation} from '@react-navigation/native';

const Favorite = () => {
  const cartItems = useSelector(state => state.favorite);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const [favorite, setFavorite] = useState(true);

  const handleRemoveFromFavorite = id => {
    console.log('Removing item with id:', id);
    dispatch(removeFromFavorite(id));
  };
  const handleAddToCart = item => {
    dispatch(addToCart(item));
  };

  const renderProducts = ({item}) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetails', {product: item})}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <Text numberOfLines={1} style={styles.productName}>
        {item.name}
      </Text>
      <Text style={styles.productBrand}>{item.brand}</Text>
      <Text style={styles.productPrice}>Rs {item.price}</Text>
      <View
        style={{
          marginTop: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={{
            backgroundColor: '#ff6f6f',
            borderRadius: 8,
            width: '70%',
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRemoveFromFavorite(item.id)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 6,
          }}>
          <Image
            style={{
              height: 40,
              // tintColor: favorite == true ? '#ff6f6f' : '#c9c3c3',
              width: 40,
              marginTop: -6,
            }}
            source={require('../images/deleteIcon.png')}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{marginBottom: 50}}>
      <View>
        <View
          style={{
            width: '100%',
            height: 60,
            paddingRight: 20,
            paddingLeft: 20,
            backgroundColor: '#fac0ee',
            elevation: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image
                style={{height: 20, width: 20}}
                source={require('../images/arrowback.png')}
              />
            </TouchableOpacity>
            <Text style={styles.cartTitle}>Your Favorite Cart Items</Text>
          </View>
        </View>
        <View>
          {cartItems.length > 0 ? (
            <FlatList
              nestedScrollEnabled={true}
              scrollEnabled={false}
              data={cartItems}
              keyExtractor={item => item.id}
              renderItem={renderProducts}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              style={{marginTop: 10}}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                marginVertical: 280,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 30,
                  fontWeight: '900',
                }}>
                Empty favorite Cart
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cartTitle: {
    color: '#ff6f6f',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: 80,
  },
  productContainer: {
    flex: 1,
    alignItems: 'flex-start',
    margin: 16,
    marginBottom: 10,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  productName: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  productPrice: {
    marginTop: 2,
    fontSize: 14,
    color: 'black',
  },

  productBrand: {
    marginTop: 2,
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },
});

export default Favorite;
