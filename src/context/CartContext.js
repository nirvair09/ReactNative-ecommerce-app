import { createContext, useReducer } from "react";

console.log('CartContext - useReducer defined:', !!useReducer);


export const CartContext = createContext();

function cartReducer(state, action) {

    switch (action.type) {
        case 'ADD_TO_CART': {
            const existing = state.find(
                (item) => item.id === action.product.id
            );

            if (existing) {
                // increase quantity
                return state.map((item) =>
                    item.id === action.product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            console.log(state);
            // add new product
            return [...state, { ...action.product, quantity: 1 }];
        };

        case "REMOVE_FROM_CART": {
            return state.filter((item) => item.id !== action.id);
        }

        case "DECREASE_QUANTITY": {
            return state.map((item) =>
                item.id === action.id ?
                    { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0);
        }

        case "INCREASE_QUANTITY": {
            return state.map((item) =>
                item.id === action.id ?
                    { ...item, quantity: item.quantity + 1 } : item);
        }

        case "CLEAR_CART": {
            return [];
        }

        default: return state;
    }


}


export function CartProvider({ children }) {
    console.log('CartProvider rendering');
    const [cart, dispatch] = useReducer(cartReducer, [])

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}