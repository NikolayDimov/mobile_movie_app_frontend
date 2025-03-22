import { View, Text, Image, ScrollView, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/usefetch";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import { getMovies } from "@/services/api";
import Movie from "./movieCard.static";
import MovieCard from "./movieCard";

export default function Index() {
    const router = useRouter();

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch<Movie[]>(getMovies);

    return (
        <View style={styles.container}>
            <Image source={images.bg} style={styles.bgImage} />

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                <Image source={icons.logo} style={styles.logo} />

                {moviesLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
                ) : moviesError ? (
                    <Text style={styles.errorText}>Error: {moviesError?.message}</Text>
                ) : (
                    <View style={styles.mainContent}>
                        <Text style={styles.sectionTitle}>Latest Movies</Text>
                        <FlatList
                            data={movies}
                            renderItem={({ item }) => (
                                <MovieCard
                                    title={item.title}
                                    description={item.description}
                                    releaseDate={item.releaseDate}
                                    genre={item.genre}
                                    image={item.image}
                                />
                            )}
                            keyExtractor={(item) => item.movieId ?? item.title} // Use movieId or fallback to title
                            numColumns={3}
                            columnWrapperStyle={styles.columnWrapper}
                            style={styles.latestMovies}
                            scrollEnabled={false}
                        />

                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2d2d2d",
    },
    bgImage: {
        position: "absolute",
        width: "100%",
        zIndex: 0,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    contentContainer: {
        minHeight: "100%",
        paddingBottom: 10,
    },
    logo: {
        width: 48,
        height: 40,
        marginTop: 80,
        marginBottom: 20,
        alignSelf: "center",
    },
    loader: {
        marginTop: 30,
        alignSelf: "center",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
    mainContent: {
        flex: 1,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        marginBottom: 10,
    },
    columnWrapper: {
        justifyContent: "flex-start",
        gap: 20,
        paddingRight: 5,
        marginBottom: 10,
    },
    latestMovies: {
        marginTop: 10,
        paddingBottom: 32,
    },
});
