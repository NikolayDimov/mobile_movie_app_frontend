import { View, Text, Image, StyleSheet } from "react-native";
import Movie from "./movieCard.static";

const MovieCard: React.FC<Movie> = ({
    title,
    description,
    releaseDate,
    genre,
    image,
}) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.releaseDate}>{releaseDate}</Text>
            <Text style={styles.genre}>{genre}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 100,
        margin: 5,
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        alignItems: "center",
    },
    image: {
        width: 80,
        height: 120,
        borderRadius: 8,
    },
    title: {
        fontWeight: "bold",
        marginTop: 8,
    },
    description: {
        marginTop: 4,
        fontSize: 12,
        color: "#777",
    },
    releaseDate: {
        fontSize: 10,
        color: "#aaa",
    },
    genre: {
        fontSize: 12,
        color: "#555",
    },
});

export default MovieCard;
