import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { images } from "@/constants/images";

const Profile = () => {
    const { user, logout } = useAuth();
    const email = user?.email;

    return (
        <View style={styles.container}>
            <Image
                source={images.bg}
                style={styles.backgroundImage}
                resizeMode="cover"
            />

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Profile</Text>
                {email ? (
                    <Text style={styles.email}>Email: {email}</Text>
                ) : (
                    <Text style={styles.email}>Loading...</Text>
                )}
                <View style={styles.buttonContainer}>
                    <Button title="Logout" onPress={logout} color="#AB8BFF" />
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#FFFFFF",
    },
    email: {
        fontSize: 18,
        marginBottom: 20,
        color: "#FFFFFF",
    },
    buttonContainer: {
        width: '60%',
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 20,
    }

});

export default Profile;
