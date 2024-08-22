import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {deviceWidth, deviceHeight} from '../components/Dimensions';
import React, {useState, useEffect, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  addToFavorite,
  fetchCategories,
  fetchProductsByCategory,
  fetchProductSpecificCategory,
  fetchProductsByPriceRange,
} from '../redux/Action';
import Loader from '../components/Loader';
import PriceSlider from '../components/Slider';

const Main = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const categories = useSelector(state => state.categories.categories);
  const featuredProducts = useSelector(state => state.products.products);

  const handleCategoryPress = category => {
    dispatch(fetchProductSpecificCategory(category));
    navigation.navigate('ProductList', {categoryId: category});
  };

  const handleAddToCart = item => {
    dispatch(addToCart(item));
  };
  const handleAddToFavorite = item => {
    dispatch(addToFavorite(item));
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories());
      await dispatch(fetchProductsByCategory());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const renderCategory = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        handleCategoryPress(item.id);
      }}>
      <View style={styles.categoryContainer}>
        <Image source={{uri: item.image}} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderProducts = ({item}) => (
    <View style={styles.productContainer}>
      <TouchableOpacity
        style={styles.productTouchable}
        onPress={() => navigation.navigate('ProductDetails', {product: item})}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
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
            position: 'absolute',
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
          <Image
            source={require('../images/myPic.png')}
            style={{height: 40, width: 40, borderRadius: 20}}
          />
        </View>
        <View style={{paddingVertical: 70, paddingHorizontal: 16}}>
          <Text style={{fontSize: 26, fontWeight: '600', color: 'black'}}>
            Make Your Shopping
          </Text>
          <View
            style={{
              borderRadius: 14,
              borderWidth: 1,
              placeholderTextColor: 'black',
              borderColor: 'black',
              marginTop: 16,
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 10,
            }}>
            <TouchableOpacity>
              <Image
                style={{height: 30, width: 30}}
                source={require('../images/search.png')}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#a6a5a6"
              style={{paddingHorizontal: 10, fontSize: 16}}
            />
          </View>
          <View>
            <View
              style={{paddingHorizontal: 4, paddingTop: 10, marginBottom: -10}}>
              <Text style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
                Select Category
              </Text>
            </View>
            <FlatList
              data={categories}
              keyExtractor={item => item.id}
              renderItem={renderCategory}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 20}}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginTop: 20,
              padding: 20,
              elevation: 1000,
              borderRadius: 10,
            }}>
            <View>
              <Text style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
                Select Price Range
              </Text>
            </View>
            <PriceSlider />
            <TouchableOpacity
              style={{
                width: 100,
                height: 30,
                backgroundColor: '#ff6f6f',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '800',
                }}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.featuredTitle}>Featured Products</Text>
            <FlatList
              ///------VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.
              nestedScrollEnabled={true}
              scrollEnabled={false}
              data={featuredProducts}
              keyExtractor={item => item.id}
              renderItem={renderProducts}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              style={{marginTop: 10}}
              showsVerticalScrollIndicator={false}
            />
            {loading && <Loader />}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Main;

const styles = StyleSheet.create({
  categoryContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  categoryName: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#fac0ee',
    borderRadius: 5,
    padding: 10,
  },

  featuredTitle: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: '600',
    color: 'black',
    marginTop: 20,
  },

  productContainer: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 6,
  },
  productTouchable: {
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
