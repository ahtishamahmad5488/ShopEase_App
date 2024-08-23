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
  fetchProductsByPriceRange,
} from '../redux/Action';
import Loader from '../components/Loader';
import {useNavigation} from '@react-navigation/native';

const SpecificRangeList = ({route}) => {
  const {minPrice, maxPrice} = route.params;
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Access products from the specificReducer (mapped to `range`)
  const products = useSelector(state => state.range.specificRange);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductsByPriceRange(minPrice, maxPrice));
      setLoading(false);
    };
    fetchData();
  }, [minPrice, maxPrice, dispatch]);

  const handleAddToCart = item => {
    dispatch(addToCart(item));
  };

  const handleAddToFavorite = item => {
    dispatch(addToFavorite(item));
  };

  const renderProduct = ({item}) => (
    <View style={styles.productWrapper}>
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => navigation.navigate('ProductDetails', {product: item})}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productPrice}>Rs {item.price}</Text>
      </TouchableOpacity>
      <View style={styles.actionButtons}>
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
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Products</Text>
        {loading ? (
          <Loader />
        ) : (
          <FlatList
            scrollEnabled={false}
            nestedScrollEnabled={true}
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={renderProduct}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default SpecificRangeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    marginBottom: 20,
  },
  productWrapper: {
    flex: 1,
    paddingBottom: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 2,
    elevation: 5,
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    color: '#ff6f6f',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addToCartButton: {
    backgroundColor: '#ff6f6f',
    borderRadius: 8,
    width: '70%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    height: 40,
    width: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});