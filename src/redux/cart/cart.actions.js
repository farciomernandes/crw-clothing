import CartActionTypes from './cart.types';

//There is no need to send a payload because this method has a Boolean result
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItem = item =>({
  //Type is literally tells which reducer or method, this function should use
  type: CartActionTypes.ADD_ITEM,
  payload: item
  //Payload is literally all data should be saved
})

export const removeItem = item =>({
  type: CartActionTypes.REMOVE_ITEM,
  payload: item
})

export const clearItemFromCart = item =>({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item
})

export const clearCart = () =>({
  type: CartActionTypes.CLEAR_CART,
})