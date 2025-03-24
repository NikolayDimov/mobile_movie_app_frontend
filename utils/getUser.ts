import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/context/AuthContext.static";

export const getUser = async (): Promise<User | null> => {
    try {
        const userString = await AsyncStorage.getItem("user");

        if (userString) {
            const user = JSON.parse(userString);
            if (user && user.access_token) {
                return user;
            }
        }
        return null;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};
