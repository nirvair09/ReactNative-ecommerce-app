import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useReducer } from "react";
// console.log('CartContext - useReducer defined:', !!useReducer);


export const CartContext = createContext();

const STORAGE_KEY = "cart";

function cartReducer(state, action) {


    switch (action.type) {

        case 'SET_CART': {
            return action.payload;
        }

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
            return state.filter((item) => item.id !== action.product.id);
        }

        case "DECREASE_QUANTITY": {
            return state.map((item) =>
                item.id === action.product.id ?
                    { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0);
        }

        case "INCREASE_QUANTITY": {
            return state.map((item) =>
                item.id === action.product.id ?
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
    const [cart, dispatch] = useReducer(cartReducer, []);

    useEffect(() => {
        async function loadCart() {
            try {
                const storedData = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedData) {
                    dispatch({
                        type: "SET_CART",
                        payload: JSON.parse(storedData),
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

        loadCart();
    }, []);


    useEffect(() => {
        async function saveCart() {
            try {
                await AsyncStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(cart)
                );
            } catch (error) {
                console.log("Failed to save cart", error);
            }
        };

        saveCart();
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}