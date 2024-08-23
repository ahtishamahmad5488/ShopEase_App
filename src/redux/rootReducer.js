import {combineReducers} from 'redux';
import {
  reducer,
  categoriesReducer,
  productsReducer,
  specificCategoryProductReducer,
  specificReducer,
  addFavoriteReducer,
} from './Reducer';

export default combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  specific: specificCategoryProductReducer,
  reducer,
  favorite: addFavoriteReducer,
  range: specificReducer, // This is correct
});
