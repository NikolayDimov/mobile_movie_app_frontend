import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Movie from '../../components/MovieCard/movieCard.static'

const MovieCard: React.FC<Movie> = ({ movie_id, title, release_date, image }) => {
    const movieYear = release_date?.split("-")[0];
    console.log('movieCard - mvie id', movie_id);

    return (
        <Link href={`/movies/${movie_id}`} asChild>
            <TouchableOpacity style={styles.card}>
                <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>

                <View style={styles.detailsRow}>
                    <Text style={styles.year}>{movieYear}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "30%",
        margin: 8,
        backgroundColor: "#1a1a1a",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 8,
    },
    title: {
        fontWeight: "bold",
        marginTop: 8,
        fontSize: 14,
        color: "#fff",
        textAlign: "center",
    },
    detailsRow: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginTop: 4,
    },
    year: {
        fontSize: 12,
        color: "#aaa",
    },
    genre: {
        fontSize: 12,
        color: "#aaa",
        textTransform: "uppercase",
    },
});

export default MovieCard;
