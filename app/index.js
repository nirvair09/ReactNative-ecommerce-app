import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

import ProductSkeleton from "../components/ProductSkeleton";
import { fetchAllProducts } from "../src/api/products";
import ProductCard from "../src/components/ProductCard";
import { CartContext } from "../src/context/CartContext";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = [
        "all",
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing",
    ];

    const router = useRouter();
    const { cart } = useContext(CartContext);

    /* ---------------- FETCH PRODUCTS ---------------- */
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

    /* ---------------- SEARCH + CATEGORY FILTER ---------------- */
    useEffect(() => {
        const timer = setTimeout(() => {
            let result = products;

            // Category filter
            if (selectedCategory !== "all") {
                result = result.filter(
                    (item) => item.category === selectedCategory
                );
            }

            // Search filter
            if (search.trim() !== "") {
                const lower = search.toLowerCase();
                result = result.filter((item) =>
                    item.title.toLowerCase().includes(lower)
                );
            }

            setFilteredProducts(result);
        }, 300);

        return () => clearTimeout(timer);
    }, [search, selectedCategory, products]);

    /* ---------------- LOADING / ERROR ---------------- */
    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Products</Text>
                </View>
                <FlatList
                    data={Array.from({ length: 8 })}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={2}
                    renderItem={() => <ProductSkeleton />}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
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

    /* ---------------- UI ---------------- */
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

            {/* CATEGORY BAR */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryWrapper}
                contentContainerStyle={styles.categoryContainer}
            >
                {categories.map((cat) => (
                    <Pressable
                        key={cat}
                        onPress={() => setSelectedCategory(cat)}
                        style={[
                            styles.categoryPill,
                            selectedCategory === cat && styles.categoryActive,
                        ]}
                    >
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={[
                                styles.categoryText,
                                selectedCategory === cat && styles.categoryTextActive,
                            ]}
                        >
                            {cat}
                        </Text>

                    </Pressable>
                ))}
            </ScrollView>

            {/* SEARCH */}
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
                renderItem={({ item }) => <ProductCard product={item} />}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text>No products found</Text>
                    </View>
                }
            />
        </View>
    );
}

/* ---------------- STYLES ---------------- */
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

    categoryWrapper: {
        backgroundColor: "#fff",
    },
    categoryContainer: {
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    categoryPill: {
        width: 120,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#eee",
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
    },

    categoryActive: {
        backgroundColor: "#2874f0",
    },
    categoryText: {
        fontSize: 12,
        color: "#333",
        textAlign: "center",
    },

    categoryTextActive: {
        color: "#fff",
        fontWeight: "bold",
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
});
