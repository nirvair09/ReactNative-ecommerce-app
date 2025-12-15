import { createContext } from "react";

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

            // add new product
            return [...state, { ...action.product, quantity: 1 }];
        }
    }
}


export function CartProvider({ children }) {
    return (
        <CartContext.Provider >
            {children}
        </CartContext.Provider>
    );
}