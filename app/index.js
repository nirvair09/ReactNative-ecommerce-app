import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { fetchAllProducts } from "../src/api/products";
import ProductCard from "../src/components/ProductCard";
import { CartContext } from "../src/context/CartContext";

export default function Home() {
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();
    const { cart } = useContext(CartContext);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await fetchAllProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError(err.message || "Failed to load products");
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);


    useEffect(() => {

        const timer = setTimeout(() => {
            if (search.trim() === "") {
                setFilteredProducts(products)
            } else {
                const lower = search.toLowerCase();
                const filtered = products.filter((item) =>
                    item.title.toLowerCase().includes(lower));
                setFilteredProducts(filtered);
            }
        }, 300)

        return () => clearTimeout(timer);

    }, [search, products])

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading products...</Text>
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
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Products</Text>

                <Pressable onPress={() => router.push("/cart")}>
                    <Ionicons name="cart-outline" size={26} />

                    {cart.length > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{cart.length}</Text>
                        </View>
                    )}
                </Pressable>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search products..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                    clearButtonMode="while-editing"
                />
            </View>

            {/* PRODUCT LIST */}
            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <ProductCard product={item} />
                )}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#fff",
        elevation: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    badge: {
        position: "absolute",
        right: -6,
        top: -6,
        backgroundColor: "red",
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
    },
    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
    list: {
        padding: 8,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        color: "red",
        fontSize: 16,
    },
    searchContainer: {
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchInput: {
        backgroundColor: "#f0f0f0",
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
    },
});
