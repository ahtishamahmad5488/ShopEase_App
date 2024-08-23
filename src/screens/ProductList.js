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
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector(state => state.specific.specific);

  const handleAddToCart = item => {
    dispatch(addToCart(item));
  };
  const handleAddToFavorite = item => {
    setFavoriteIcon(prevState => ({
      ...prevState,
      [item.id]: !prevState[item.id], // Toggle the state for the specific item
    }));
    dispatch(addToFavorite(item));
  };

  useEffect(() => {
    if (categoryId) {
      const fetchData = async () => {
        await dispatch(fetchProductSpecificCategory(categoryId));
        setLoading(false);
      };
      fetchData();
    }
  }, [categoryId, dispatch]);

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
            style={{
              height: 30,
              width: 30,
              tintColor: favoriteIcon[item.id] ? '#ff6f6f' : '#c9c3c3',
            }}
            source={require('../images/favoriteFilled.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.headerIcon}
            source={require('../images/arrowback.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product List</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.innerContainer}>
          {loading ? (
            <Loader />
          ) : (
            <FlatList
              nestedScrollEnabled={true}
              scrollEnabled={false}
              data={products}
              keyExtractor={item => item.id}
              renderItem={renderProduct}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fac0ee',
    height: 60,
    elevation: 5,
  },
  headerIcon: {
    height: 24,
    width: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
  headerSpacer: {
    width: 24, // Match the width of the icon to keep the title centered
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    padding: 16,
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
