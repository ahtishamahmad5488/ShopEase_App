import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart, removeFromFavorite} from '../redux/Action';
import {useNavigation} from '@react-navigation/native';

const Favorite = () => {
  const cartItems = useSelector(state => state.favorite);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRemoveFromFavorite = id => {
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={styles.addToCartButton}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRemoveFromFavorite(item.id)}
          style={styles.removeButton}>
          <Image
            style={styles.deleteIcon}
            source={require('../images/deleteIcon.png')}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.backIcon}
            source={require('../images/arrowback.png')}
          />
        </TouchableOpacity>
        <Text style={styles.cartTitle}>Your Favorite Items</Text>
      </View>
      <View style={styles.productListContainer}>
        {cartItems.length > 0 ? (
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={renderProducts}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>
              Your Favorite Cart is Empty
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: 50,
  },
  header: {
    width: '100%',
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: '#ff6f6f',
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    height: 20,
    width: 20,
    tintColor: 'white',
  },
  cartTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  productListContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  flatList: {
    marginTop: 10,
  },
  productContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
  },
  productImage: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  productBrand: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: '#ff6f6f',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  addToCartButton: {
    backgroundColor: '#ff6f6f',
    borderRadius: 8,
    width: '70%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteIcon: {
    height: 30,
    width: 30,
    tintColor: '#ff6f6f',
  },
  emptyCartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  emptyCartText: {
    color: '#888',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Favorite;
