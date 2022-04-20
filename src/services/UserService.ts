import API from "../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const listUsers = (page?: number, limit?: number) => {
  const getAccessToken = async () => {
    try {
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized) {
        const authData = JSON.parse(authDataSerialized);
        return authData.accessToken;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const accessToken = getAccessToken();
  return API.get("user", {
    params: { page: page ?? null, limit: limit ?? null },
    headers: { Authorization: `Basic ${accessToken}` },
  });
};

export const UserService = {
  listUsers,
};
