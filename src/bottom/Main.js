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
import {deviceWidth} from '../components/Dimensions';
import React, {useState, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  addToFavorite,
  fetchCategories,
  fetchProductsByCategory,
  fetchProductSpecificCategory,
  fetchProductsByPriceRange, // Add this action Set Price Range
} from '../redux/Action';
import Loader from '../components/Loader';
import PriceSlider from '../components/Slider';

const Main = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [favoriteIcon, setFavoriteIcon] = useState(false);

  const categories = useSelector(state => state.categories.categories);
  const featuredProducts = useSelector(state => state.products.products);
  const [selectedRange, setSelectedRange] = useState([0, 100000]); // Initial range state

  const handleCategoryPress = category => {
    dispatch(fetchProductSpecificCategory(category));
    navigation.navigate('ProductList', {categoryId: category});
  };

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
  const handlePriceRangeChange = range => {
    setSelectedRange(range);
  };

  const handleApplyPress = () => {
    dispatch(fetchProductsByPriceRange(selectedRange[0], selectedRange[1]));
    navigation.navigate('SpecificRangeList', {
      minPrice: selectedRange[0],
      maxPrice: selectedRange[1],
    });
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
    <TouchableOpacity onPress={() => handleCategoryPress(item.id)}>
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

      <View style={styles.actionsContainer}>
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerIcon}
          source={require('../images/apps.png')}
        />
        <Image
          source={require('../images/myPic.png')}
          style={styles.profilePic}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Make Your Shopping</Text>

        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Image
              style={styles.searchIcon}
              source={require('../images/search.png')}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#a6a5a6"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Select Category</Text>
          <FlatList
            data={categories}
            keyExtractor={item => item.id}
            renderItem={renderCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryList}
          />
        </View>

        <View style={styles.priceRangeSection}>
          <Text style={styles.sectionTitle}>Select Price Range</Text>
          <PriceSlider onValuesChangeFinish={handlePriceRangeChange} />
          <TouchableOpacity
            onPress={handleApplyPress}
            style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuredProductsSection}>
          <Text style={styles.featuredTitle}>Featured Products</Text>
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
            data={featuredProducts}
            keyExtractor={item => item.id}
            renderItem={renderProducts}
            numColumns={2}
            columnWrapperStyle={styles.productListWrapper}
            style={styles.productList}
            showsVerticalScrollIndicator={false}
          />
          {loading && <Loader />}
        </View>
      </View>
    </ScrollView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
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
    position: 'absolute',
    top: 0,
  },
  headerIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  content: {
    paddingVertical: 70,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 16,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  searchIcon: {
    height: 30,
    width: 30,
  },
  searchInput: {
    paddingHorizontal: 10,
    fontSize: 16,
    flex: 1,
  },
  categorySection: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    paddingHorizontal: 4,
  },
  categoryList: {
    marginTop: 10,
  },
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
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  priceRangeSection: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  applyButton: {
    width: 100,
    height: 40,
    backgroundColor: '#ff6f6f',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  applyButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  featuredProductsSection: {
    marginTop: 20,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
    marginLeft: 5,
  },
  productList: {
    marginTop: 10,
  },
  productListWrapper: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    margin: 4,
  },
  productTouchable: {
    alignItems: 'flex-start',
  },
  productImage: {
    width: 145,
    height: 145,
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
    color: '#ff6f6f',
  },
  productBrand: {
    marginTop: 3,
    fontWeight: '500',
    fontSize: 12,
    color: '#8a8a8a',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  addToCartButton: {
    backgroundColor: '#ff6f6f',
    borderRadius: 8,
    width: '66%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontWeight: '600',
  },
  favoriteButton: {
    paddingLeft: 10,
  },
  favoriteIcon: {
    height: 38,
    width: 38,
  },
});
