import { useContext } from 'react';
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { CartContext } from '../src/context/CartContext';


export default function CartScreen() {
    const { cart, dispatch } = useContext(CartContext);

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    if (cart.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.empty}>Your cart is empty</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.price}>{item.price}</Text>
                        <Text style={styles.qty}>{item.quantity}</Text>

                        <View style={styles.qtyRow}>
                            <Pressable style={styles.qtyBtn}
                                onPress={() => dispatch({ type: "DECREASE_QUANTITY", product: item })}
                            >
                                <Text>-</Text>
                            </Pressable>

                            <Text style={styles.qty}>{item.quantity}</Text>
                            <Pressable style={styles.qtyBtn}
                                onPress={() => dispatch({ type: "INCREASE_QUANTITY", product: item })}
                            >
                                <Text>+</Text>
                            </Pressable>
                        </View>
                        <Pressable style={styles.removeBtn}
                            onPress={() => dispatch({ type: "REMOVE_FROM_CART", product: item })}
                        >
                            <Text style={styles.remove}>Remove from Cart</Text>
                        </Pressable>
                    </View>
                )}
            />
            <View style={styles.footer}>
                <Text style={styles.total}>
                    Total Amount: {totalAmount}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#fff',
        padding: 14,
        margin: 8,
        borderRadius: 6,
    },
    title: {
        fontSize: 14,
        marginBottom: 6,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    qtyBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderRadius: 4,
    },
    qty: {
        marginHorizontal: 12,
        fontSize: 16,
    },
    remove: {
        color: 'red',
        marginTop: 6,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        backgroundColor: '#fff',
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    empty: {
        fontSize: 16,
        color: '#555',
    },
});
