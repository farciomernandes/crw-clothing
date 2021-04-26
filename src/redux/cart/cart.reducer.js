import CartActionTypes from './cart.types';
import { addItemToCart, removeItemToCart } from './cart.utils';

const INITTUAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITTUAL_STATE, action)=>{
    switch(action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }

        case CartActionTypes.ADD_ITEM:
            return {
                state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }

        case CartActionTypes.CLEAR_ITEM_FROM_CART:
                return {
                    ...state,
                    hidden: state.hidden,
                    cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
                }

        case CartActionTypes.REMOVE_ITEM:
                return {
                    ...state,
                    cartItems: removeItemToCart(state.cartItems, action.payload)
                }

        default:
            return state;
    }
}

export default cartReducer;