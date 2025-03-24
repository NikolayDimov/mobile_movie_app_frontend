import { View, Text, Image, ScrollView, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/usefetch";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import { getMovies } from "@/services/api";
import MovieCard from "../../../components/MovieCard/movieCard";

export default function Index() {
    const router = useRouter();

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(getMovies);

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
                                    movie_id={item.movie_id}
                                    title={item.title}
                                    release_date={item.release_date}
                                    image={item.image}
                                />
                            )}
                            keyExtractor={(item) => item.movie_id}
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
        backgroundColor: "#161622",
    },
    bgImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        zIndex: 0,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 10,
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
        marginTop: 40,
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
        color: "#ffffff",
        fontWeight: "bold",
        marginBottom: 12,
    },
    columnWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,

    },
    latestMovies: {
        marginTop: 8,
        paddingBottom: 64,
    },
});
