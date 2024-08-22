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
  FETCH_PRODUCTS_BY_PRICE_RANGE,
} from './ActionType';

const initialCategoryState = {
  categories: [],
};
const initialProductState = {
  products: [],
};

const initialSpecificCategoryState = {
  products: [],
};

export const categoriesReducer = (state = initialCategoryState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export const productsReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        products: action.payload, // Update products state
      };
    default:
      return state;
  }
};

// export const specificReducer = (state = [], action) => {
//   switch (action.type) {
//     case FETCH_PRODUCTS_BY_PRICE_RANGE:
//       return {
//         ...state,
//         specificRange: action.payload, // Update the state with the fetched products
//       };
//     // other cases...
//     default:
//       return state;
//   }
// };

export const specificCategoryProductReducer = (
  state = initialSpecificCategoryState,
  action,
) => {
  switch (action.type) {
    case FETCH_SPECIFIC_CATEGORY_DATA:
      return {
        ...state,
        specific: action.payload, // Update products state
      };
    default:
      return state;
  }
};

export const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.find(item => item.id === action.data.id);
      if (existingItem) {
        // Item already in cart, increase quantity
        return state;
      } else {
        // New item, add to cart
        return [...state, {...action.data, qty: 1}];
      }

    case REMOVE_TO_CART:
      return state.filter(item => item.id !== action.id);

    case INCREASE_QUANTITY:
      return state.map(item =>
        item.id === action.id ? {...item, qty: item.qty + 1} : item,
      );

    case DECREASE_QUANTITY:
      return state
        .map(item =>
          item.id === action.id ? {...item, qty: item.qty - 1} : item,
        )
        .filter(item => item.qty > 0); // Remove item if quantity goes to 0

    default:
      return state;
  }
};

export const addFavoriteReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      const existFavoriteItem = state.find(item => item.id === action.data.id);
      if (existFavoriteItem) {
        // Item already in cart, increase quantity
        return state;
      } else {
        // New item, add to cart
        return [...state, {...action.data}];
      }
    case REMOVE_FROM_FAVORITE:
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};
