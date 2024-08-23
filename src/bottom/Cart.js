// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {useSelector} from 'react-redux';
// import {useDispatch} from 'react-redux';
// import {
//   increaseQuantity,
//   decreaseQuantity,
//   removeToCart,
// } from '../redux/Action';
// import {useNavigation} from '@react-navigation/native';

// const Cart = () => {
//   const navigation = useNavigation();
//   const cartItems = useSelector(state => state.reducer);
//   cartCount = cartItems.length;
//   const dispatch = useDispatch();

//   ///------Function Handle Remove / Increase / Decrease Quantity
//   const handleIncreaseQuantity = id => {
//     dispatch(increaseQuantity(id));
//   };
//   const handleDecreaseQuantity = id => {
//     dispatch(decreaseQuantity(id));
//   };
//   const handleRemoveToCart = id => {
//     dispatch(removeToCart(id));
//   };

//   ///---used to calculate prices of Items
//   const getTotalPrice = () => {
//     let total = 0;
//     cartItems.forEach(item => {
//       total = total + item.qty * item.price;
//     });
//     return total;
//   };

//   const renderProducts = ({item}) => (
//     <TouchableOpacity
//       style={styles.productContainer}
//       onPress={() => navigation.navigate('ProductDetails', {product: item})}>
//       <Image source={{uri: item.image}} style={styles.productImage} />
//       <Text numberOfLines={1} style={styles.productName}>
//         {item.name}
//       </Text>
//       <Text style={styles.productBrand}>{item.brand}</Text>
//       <Text style={{color: 'green', fontSize: 16, fontWeight: '600'}}>
//         {'Quantity: ' + item.qty}
//       </Text>
//       <Text style={{color: 'green', fontSize: 16, fontWeight: '600'}}>
//         {'Total: Rs ' + item.qty * item.price}
//       </Text>
//       <View style={{flexDirection: 'row'}}>
//         <TouchableOpacity
//           onPress={() => handleDecreaseQuantity(item.id)}
//           style={{
//             backgroundColor: 'green',
//             borderRadius: 8,
//             height: 26,
//             justifyContent: 'center',
//             alignItems: 'center',
//             paddingLeft: 10,
//             paddingRight: 10,
//           }}>
//           <Text style={{color: 'white'}}>-</Text>
//         </TouchableOpacity>
//         <Text
//           style={{
//             marginLeft: 10,
//             fontSize: 16,
//             fontWeight: '600',
//             color: 'black',
//             marginRight: 10,
//           }}>
//           {item.qty}
//         </Text>
//         <TouchableOpacity
//           onPress={() => handleIncreaseQuantity(item.id)}
//           style={{
//             backgroundColor: 'green',
//             borderRadius: 8,
//             height: 26,
//             justifyContent: 'center',
//             alignItems: 'center',
//             paddingLeft: 10,
//             paddingRight: 10,
//           }}>
//           <Text style={{color: 'white'}}>+</Text>
//         </TouchableOpacity>
//       </View>
//       <View
//         style={{
//           alignItems: 'center',
//           flexDirection: 'row',
//           marginTop: 5,
//         }}>
//         <TouchableOpacity
//           onPress={() => handleRemoveToCart(item.id)}
//           style={{
//             backgroundColor: '#ff6f6f',
//             borderRadius: 8,
//             height: 26,
//             justifyContent: 'center',
//             alignItems: 'center',
//             paddingLeft: 10,
//             paddingRight: 10,
//           }}>
//           <Text style={{color: 'white'}}>Remove To Cart</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView marginBottom={50}>
//       <View
//         style={{
//           width: '100%',
//           height: 60,
//           paddingRight: 10,
//           paddingLeft: 10,
//           backgroundColor: '#fac0ee',
//           elevation: 10,
//         }}>
//         <View style={{marginTop: 6}}>
//           {cartItems.length > 0 ? (
//             <View
//               style={{
//                 width: '100%',
//                 height: 50,
//                 backgroundColor: '#faebd7',

//                 borderRadius: 20,
//                 flexDirection: 'row',
//                 justifyContent: 'space-evenly',
//                 alignItems: 'center',
//               }}>
//               <View
//                 style={{
//                   width: '50%',
//                   height: '100%',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <Text style={{color: 'black', fontSize: 16, fontWeight: '800'}}>
//                   {'Added Items ' + ' (' + cartCount + ') '}
//                 </Text>
//                 <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
//                   {'Total:' + getTotalPrice()}
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   width: '50%',
//                   height: '100%',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('Reorder')}
//                   style={{
//                     width: '70%',
//                     height: 35,
//                     backgroundColor: 'green',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     borderRadius: 10,
//                   }}>
//                   <Text
//                     style={{
//                       color: 'white',
//                       textAlign: 'center',
//                       fontSize: 18,
//                       fontWeight: '800',
//                     }}>
//                     View Order
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ) : null}
//         </View>
//       </View>

//       <View>
//         {cartItems.length > 0 ? (
//           <FlatList
//             data={cartItems}
//             nestedScrollEnabled={true}
//             scrollEnabled={false}
//             keyExtractor={item => item.id}
//             renderItem={renderProducts}
//             numColumns={2}
//             columnWrapperStyle={{justifyContent: 'space-between'}}
//             style={{marginTop: 10}}
//             showsVerticalScrollIndicator={false}
//           />
//         ) : (
//           <View
//             style={{
//               justifyContent: 'center',
//               marginVertical: 280,
//               alignItems: 'center',
//             }}>
//             <Text
//               style={{
//                 color: 'black',
//                 fontSize: 30,
//                 fontWeight: '900',
//               }}>
//               Empty Cart
//             </Text>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   cartTitle: {
//     color: 'black',
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingRight: 80,
//   },
//   cartItemsStyle: {
//     width: '48%',
//     marginLeft: 10,
//     height: 300,
//     backgroundColor: 'white',
//     elevation: 5,
//     alignSelf: 'center',

//     borderRadius: 10,
//     flexDirection: 'column',

//     marginTop: 16,
//     alignItems: 'center',
//   },

//   image: {
//     width: 130,
//     height: 140,
//     borderRadius: 10,
//   },
//   productContainer: {
//     flex: 1,
//     alignItems: 'flex-start',
//     margin: 16,
//     marginBottom: 10,
//   },
//   productImage: {
//     width: 150,
//     height: 150,
//     borderRadius: 10,
//     backgroundColor: '#f0f0f0',
//   },
//   productName: {
//     marginTop: 6,
//     fontSize: 14,
//     fontWeight: '600',
//     color: 'black',
//   },
//   productPrice: {
//     marginTop: 2,
//     fontSize: 14,
//     color: 'black',
//   },

//   productBrand: {
//     marginTop: 2,
//     fontWeight: '500',
//     fontSize: 14,
//     color: 'black',
//   },
// });

// export default Cart;

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
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeToCart,
} from '../redux/Action';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.reducer);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = id => {
    dispatch(increaseQuantity(id));
  };
  const handleDecreaseQuantity = id => {
    dispatch(decreaseQuantity(id));
  };
  const handleRemoveToCart = id => {
    dispatch(removeToCart(id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.qty * item.price, 0);
  };

  const renderProducts = ({item}) => (
    <View style={styles.productContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', {product: item})}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text numberOfLines={1} style={styles.productName}>
          {item.name}
        </Text>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productPrice}>
          Total: Rs {item.qty * item.price}
        </Text>
      </TouchableOpacity>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => handleDecreaseQuantity(item.id)}
          style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.qty}</Text>
        <TouchableOpacity
          onPress={() => handleIncreaseQuantity(item.id)}
          style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => handleRemoveToCart(item.id)}
        style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {cartItems.length > 0 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Items: {cartItems.length}</Text>
          <Text style={styles.summaryText}>Total: Rs {getTotalPrice()}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Reorder')}
            style={styles.viewOrderButton}>
            <Text style={styles.viewOrderButtonText}>View Order</Text>
          </TouchableOpacity>
        </View>
      )}

      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          nestedScrollEnabled={true}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={renderProducts}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          style={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your Cart is Empty</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingBottom: 50,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    elevation: 4,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  viewOrderButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  viewOrderButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productList: {
    marginTop: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    margin: 8,
    elevation: 3,
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  productBrand: {
    fontSize: 12,
    color: '#777777',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: 'black',
  },
  removeButton: {
    backgroundColor: '#ff6f6f',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default Cart;
