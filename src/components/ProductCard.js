import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

export default function ProductCard({ product }) {
    const router = useRouter();
    return (
        <Pressable style={styles.card}
            onPress={() => router.push(`/product/${product.id}`)}>
            <Image
                source={{ uri: product.image }}
                style={styles.image}
                resizeMode="contain" />
            <Text numberOfLines={2} style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>₹ {product.price}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 6,
        padding: 10,
        borderRadius: 8,
        elevation: 3, // Android shadow
    },
    image: {
        height: 120,
        width: '100%',
    },
    title: {
        fontSize: 14,
        marginVertical: 6,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
