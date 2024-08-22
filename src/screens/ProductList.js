// ProductList.js
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  addToCart,
  addToFavorite,
  fetchProductSpecificCategory,
} from '../redux/Action';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';

const ProductList = ({route}) => {
  const {categoryId} = route.params;
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector(state => state.specific.specific);

  const handleAddToCart = item => {
    dispatch(addToCart(item));
  };
  const handleAddToFavorite = item => {
    dispatch(addToFavorite(item));
  };

  useEffect(() => {
    if (categoryId) {
      const fetchData = async () => {
        await dispatch(fetchProductSpecificCategory(categoryId)); // Fetch products
        setLoading(false); // Stop the loader after fetching data
      };
      fetchData();
    }
  }, [categoryId, dispatch]);

  const renderProduct = ({item}) => (
    <View style={{flex: 1, paddingBottom: 20}}>
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => navigation.navigate('ProductDetails', {product: item})}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productPrice}>Rs {item.price}</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAddToFavorite(item)}
          style={styles.favoriteButton}>
          <Image
            style={styles.favoriteIcon}
            source={require('../images/favoriteFilled.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView>
      <View style={{flex: 1, padding: 16}}>
        <Text style={styles.title}>Products</Text>
        {loading ? (
          <Loader /> // Show the loader while data is being fetched
        ) : (
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderProduct}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  productContainer: {
    flex: 1,
    alignItems: 'flex-start',
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
    marginTop: 3,
    fontSize: 14,
    color: 'black',
  },
  productBrand: {
    marginTop: 3,
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },
  addToCartButton: {
    backgroundColor: '#ff6f6f',
    borderRadius: 8,
    width: '66%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  addToCartText: {
    color: 'white',
  },
  favoriteButton: {
    paddingLeft: 10,
  },
  favoriteIcon: {
    height: 38,
    width: 38,
  },
});
