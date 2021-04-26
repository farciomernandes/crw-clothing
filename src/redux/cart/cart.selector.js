import { createSelector } from 'reselect';


//Search you state from redux
const selectCart = state => state.cart;

//It receives the entire object and stores only a part.
export const selectCartItems = createSelector(
    //Use in order the created. Example: selectCart and selectUser... createSelector([selectCart, selectUser])
    [selectCart],
    (cart) => cart.cartItems
)

export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
)

//It receives the object and applies a reduction method, which does not trigger the update in the redux cycle.
export const selectCartItemsCount = createSelector(
    //The parameters obtained in this function are distributed to the previous functions.
    [selectCartItems],
    cartItems=> cartItems.reduce((accumulatedQuantity, cartItem)=> accumulatedQuantity + cartItem.quantity, 0)   
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartTotal=> cartTotal.reduce((accumulatedQuantity, cartTotal)=> accumulatedQuantity + (cartTotal.quantity * cartTotal.price) , 0)
)