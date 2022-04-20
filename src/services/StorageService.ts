import AsyncStorage from "@react-native-async-storage/async-storage";

const StorageService = {
  async getItem(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.log(error);
    }
  },

  async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  },

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  },
};

export default StorageService;
