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

// import {useNavigation} from '@react-navigation/native';

// const Reorder = () => {
//   const navigation = useNavigation();
//   const cartItems = useSelector(state => state.reducer);
//   const dispatch = useDispatch();

//   const getTotalPrice = () => {
//     let total = 0;
//     cartItems.forEach(item => {
//       total = total + item.qty * item.price;
//     });
//     return total;
//   };
//   const getTotalItems = () => {
//     let totalItems = 0;
//     cartItems.forEach(item => {
//       totalItems += item.qty;
//     });
//     return totalItems;
//   };

//   return (
//     <ScrollView>
//       <View style={{flex: 3}}>
//         <View
//           style={{
//             width: '100%',
//             height: 60,
//             paddingRight: 20,
//             paddingLeft: 20,
//             backgroundColor: '#fac0ee',
//             elevation: 10,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               paddingTop: 20,
//             }}>
//             {/* Navigate to Back Screen */}
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.goBack();
//               }}>
//               <Image
//                 style={{height: 20, width: 20}}
//                 source={require('../images/arrowback.png')}
//               />
//             </TouchableOpacity>
//             <Text style={style.cartTitle}>Your Order List</Text>
//           </View>
//         </View>
//         <View>
//           {cartItems.length > 0 ? (
//             <FlatList
//               data={cartItems}
//               nestedScrollEnabled={true}
//               scrollEnabled={false}
//               renderItem={({item}) => {
//                 return (
//                   <View style={style.cartItemsStyle}>
//                     <Image style={style.image} source={{uri: item.image}} />
//                     <View style={{padding: 10}}>
//                       <Text numberOfLines={1} style={style.itemName}>
//                         {item.name}
//                       </Text>
//                       <Text
//                         style={{
//                           color: 'black',
//                           fontSize: 16,
//                           fontWeight: '600',
//                         }}>
//                         {item.brand}
//                       </Text>
//                       <Text
//                         style={{
//                           color: 'green',
//                           fontSize: 16,
//                           fontWeight: '600',
//                         }}>
//                         {'Quantity: ' + item.qty}
//                       </Text>
//                       <Text
//                         style={{
//                           color: 'green',
//                           fontSize: 16,
//                           fontWeight: '600',
//                         }}>
//                         {'Total: Rs ' + item.qty * item.price}
//                       </Text>

//                       <View
//                         style={{
//                           alignItems: 'center',
//                           flexDirection: 'row',
//                           marginTop: 5,
//                         }}>
//                         {/* <TouchableOpacity
//                           onPress={() => handleRemoveToCart(item)}
//                           style={{
//                             backgroundColor: 'red',
//                             borderRadius: 8,
//                             height: 26,
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             paddingLeft: 10,
//                             paddingRight: 10,
//                           }}>
//                           <Text style={{color: 'white'}}>Remove To Cart</Text>
//                         </TouchableOpacity> */}
//                       </View>
//                     </View>
//                   </View>
//                 );
//               }}
//             />
//           ) : (
//             <View
//               style={{
//                 justifyContent: 'center',
//                 marginVertical: 280,
//                 alignItems: 'center',
//               }}>
//               <Text
//                 style={{
//                   color: 'black',
//                   fontSize: 30,
//                   fontWeight: '900',
//                 }}>
//                 Empty Cart
//               </Text>
//             </View>
//           )}
//         </View>
//       </View>
//       {cartItems.length > 0 ? (
//         <View style={style.footerContainer}>
//           <View style={style.footerItem}>
//             <Text style={style.footerText}>Total Items:</Text>
//             <Text style={style.footerText}>{getTotalItems()}</Text>
//           </View>
//           <View style={style.footerItem}>
//             <Text style={style.footerText}>Total Price:</Text>
//             <Text style={style.footerText}>Rs {getTotalPrice()}</Text>
//           </View>
//           <View style={style.footerItem}>
//             <Text style={style.footerText}>Shipping:</Text>
//             <Text style={style.footerText}>Rs 0</Text>
//           </View>
//           <View style={style.footerItem}>
//             <Text style={[style.footerText, {fontWeight: 'bold'}]}>
//               Grand Total:
//             </Text>
//             <Text style={[style.footerText, {fontWeight: 'bold'}]}>
//               Rs {getTotalPrice()}
//             </Text>
//           </View>
//           <TouchableOpacity style={style.checkoutButton}>
//             <Text style={style.checkoutButtonText}>Proceed to Checkout</Text>
//           </TouchableOpacity>
//         </View>
//       ) : null}
//     </ScrollView>
//   );
// };

// const style = StyleSheet.create({
//   cartTitle: {
//     color: '#ff6f6f',
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingRight: 80,
//   },
//   cartItemsStyle: {
//     width: '90%',
//     height: 100,
//     backgroundColor: 'white',
//     elevation: 5,
//     alignSelf: 'center',
//     margin: 5,
//     marginTop: 5,
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//   },
//   itemName: {
//     color: 'black',
//     fontSize: 18,
//     fontWeight: '800',
//     width: 180,
//   },
//   footerContainer: {
//     width: '100%',
//     padding: 20,
//     backgroundColor: 'white',
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30,
//     elevation: 10,
//   },
//   footerItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   footerText: {
//     color: 'black',
//     fontSize: 18,
//   },
//   checkoutButton: {
//     backgroundColor: '#ff6f6f',
//     borderRadius: 10,
//     paddingVertical: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   checkoutButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Reorder;

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

import {useNavigation} from '@react-navigation/native';

const Reorder = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.reducer);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    let total = 0;
    cartItems.forEach(item => {
      total = total + item.qty * item.price;
    });
    return total;
  };

  const getTotalItems = () => {
    let totalItems = 0;
    cartItems.forEach(item => {
      totalItems += item.qty;
    });
    return totalItems;
  };

  return (
    <ScrollView style={style.container}>
      <View style={style.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.backButton}>
          <Image
            style={style.backIcon}
            source={require('../images/arrowback.png')}
          />
        </TouchableOpacity>
        <Text style={style.cartTitle}>Your Order List</Text>
      </View>

      <View style={style.cartContainer}>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            nestedScrollEnabled={true}
            scrollEnabled={false}
            renderItem={({item}) => (
              <View style={style.cartItemsStyle}>
                <Image style={style.image} source={{uri: item.image}} />
                <View style={style.itemDetails}>
                  <Text numberOfLines={1} style={style.itemName}>
                    {item.name}
                  </Text>
                  <Text style={style.itemBrand}>{item.brand}</Text>
                  <Text style={style.itemQuantity}>
                    {'Quantity: ' + item.qty}
                  </Text>
                  <Text style={style.itemTotal}>
                    {'Total: Rs ' + item.qty * item.price}
                  </Text>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={style.emptyCartContainer}>
            <Text style={style.emptyCartText}>Empty Cart</Text>
          </View>
        )}
      </View>

      {cartItems.length > 0 && (
        <View style={style.footerContainer}>
          <View style={style.footerItem}>
            <Text style={style.footerText}>Total Items:</Text>
            <Text style={style.footerValue}>{getTotalItems()}</Text>
          </View>
          <View style={style.footerItem}>
            <Text style={style.footerText}>Total Price:</Text>
            <Text style={style.footerValue}>Rs {getTotalPrice()}</Text>
          </View>
          <View style={style.footerItem}>
            <Text style={style.footerText}>Shipping:</Text>
            <Text style={style.footerValue}>Rs 0</Text>
          </View>
          <View style={[style.footerItem, style.footerTotal]}>
            <Text style={style.footerTextBold}>Grand Total:</Text>
            <Text style={style.footerTextBold}>Rs {getTotalPrice()}</Text>
          </View>
          <TouchableOpacity style={style.checkoutButton}>
            <Text style={style.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    width: '100%',
    height: 60,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#fac0ee',
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    height: 20,
    width: 20,
  },
  cartTitle: {
    color: '#ff6f6f',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginLeft: -20, // Align title in center
  },
  cartContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  cartItemsStyle: {
    width: '90%',
    height: 120,
    backgroundColor: 'white',
    elevation: 5,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemDetails: {
    paddingLeft: 10,
    flex: 1,
  },
  itemName: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 5,
    width: '80%',
  },
  itemBrand: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  itemQuantity: {
    color: 'green',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  itemTotal: {
    color: 'green',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyCartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 150,
  },
  emptyCartText: {
    color: 'black',
    fontSize: 30,
    fontWeight: '900',
  },
  footerContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  footerText: {
    color: 'black',
    fontSize: 18,
  },
  footerValue: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  footerTotal: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    marginTop: 10,
  },
  footerTextBold: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#ff6f6f',
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Reorder;
