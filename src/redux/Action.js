import firestore from '@react-native-firebase/firestore';
import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
  FETCH_SPECIFIC_CATEGORY_DATA,
  ADD_TO_CART,
  REMOVE_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_FAVORITE,
  REMOVE_FROM_FAVORITE,
} from './ActionType';

// Action to fetch categories from Firestore
export const fetchCategories = () => async dispatch => {
  try {
    const categoriesCollection = await firestore()
      .collection('Categories')
      .get();
    const categoriesData = categoriesCollection.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch({type: FETCH_CATEGORIES_SUCCESS, payload: categoriesData});
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Action to fetch products by category from Firestore
export const fetchProductsByCategory = () => async dispatch => {
  try {
    const productsCollection = await firestore().collection('Products').get();
    const productsData = productsCollection.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch({type: FETCH_PRODUCTS_BY_CATEGORY_SUCCESS, payload: productsData});
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

///-------For Specific range Price
// export const fetchProductsByPriceRange =
//   (minPrice, maxPrice) => async dispatch => {
//     try {
//       const productsSnapshot = await firestore()
//         .collection('products')
//         .where('categoryId', '==', categoryId)
//         .where('price', '>=', minPrice)
//         .where('price', '<=', maxPrice)
//         .get();

//       const products = productsSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       dispatch({
//         type: FETCH_PRODUCTS_BY_PRICE_RANGE,
//         payload: products,
//       });
//     } catch (error) {
//       console.error('Error fetching products by price range: ', error);
//     }
//   };

///-------For Specific Category Data
export const fetchProductSpecificCategory = categoryId => async dispatch => {
  try {
    const productsCollection = await firestore()
      .collection('Products')
      .where('category', '==', categoryId)
      .get();
    const productsData = productsCollection.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch({type: FETCH_SPECIFIC_CATEGORY_DATA, payload: productsData});
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    data: item,
  };
}

export function removeToCart(id) {
  return {
    type: REMOVE_TO_CART,
    id,
  };
}

export function increaseQuantity(id) {
  return {
    type: INCREASE_QUANTITY,
    id,
  };
}

export function decreaseQuantity(id) {
  return {
    type: DECREASE_QUANTITY,
    id,
  };
}

export function addToFavorite(item) {
  return {
    type: ADD_FAVORITE,
    data: item,
  };
}

export function removeFromFavorite(id) {
  return {
    type: REMOVE_FROM_FAVORITE,
    id,
  };
}
