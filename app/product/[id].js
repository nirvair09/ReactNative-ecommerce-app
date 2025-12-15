
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { fetchProductById } from '../../src/api/products';
import { CartContext } from '../../src/context/CartContext';
export default function ProductDetails() {
    const { dispatch } = useContext(CartContext);
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProduct() {

            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => {
                    if (router.canGoBack()) {
                        router.back();
                    } else {
                        router.replace('/');
                    }
                }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
            </View>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text>{product.title}</Text>
            <Pressable style={styles.addButton}
                onPress={() =>
                    dispatch({ type: "ADD_TO_CART", product })
                }
            >
                <Text style={styles.addButtonText}>Add to Cart</Text>
            </Pressable>
            <Text style={styles.price}>₹ {product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    image: {
        height: 250,
        width: '100%',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        color: '#2e7d32',
        marginBottom: 16,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 12,
    },
    addButton: {
        backgroundColor: '#2874f0',
        padding: 14,
        borderRadius: 6,
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },


});
