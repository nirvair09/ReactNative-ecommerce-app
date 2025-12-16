import { StyleSheet, View } from "react-native";

export default function ProductSkeleton() {
    return (
        <View style={styles.card}>
            <View style={styles.image} />
            <View style={styles.lineShort} />
            <View style={styles.lineLong} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 6,
        padding: 10,
        borderRadius: 8,
    },
    image: {
        height: 120,
        backgroundColor: "#e0e0e0",
        borderRadius: 4,
        marginBottom: 10,
    },
    lineShort: {
        height: 10,
        width: "60%",
        backgroundColor: "#e0e0e0",
        borderRadius: 4,
        marginBottom: 6,
    },
    lineLong: {
        height: 10,
        width: "90%",
        backgroundColor: "#e0e0e0",
        borderRadius: 4,
    },
});
