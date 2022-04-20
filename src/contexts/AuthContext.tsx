import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthService } from "../services/AuthService";
import { AuthData } from "../types/AppTypes";

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  login(userName: string, password: string);
  logout();
  getAccessToken();
  getUserId();
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized) {
        const authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(authData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const login = async (userName: string, password: string) => {
    const authData = await AuthService.login(userName, password);
    if (authData) {
      setAuthData(authData);
      try {
        await AsyncStorage.setItem("@AuthData", JSON.stringify(authData));
      } catch (error) {
        return error;
      }
    } else {
      return false;
    }
  };

  const logout = async () => {
    console.log(authData.refreshToken);
    await AuthService.logout(authData.refreshToken);
    setAuthData(null);
    try {
      await AsyncStorage.removeItem("@AuthData");
    } catch (error) {
      console.log(error);
    }
  };

  const getAccessToken = async () => {
    if (authData) {
      return authData.accessToken;
    } else {
      try {
        const authDataSerialized = await AsyncStorage.getItem("@AuthData");
        if (authDataSerialized) {
          const authData: AuthData = JSON.parse(authDataSerialized);
          return authData.accessToken;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  };

  const getUserId = async () => {
    if (authData) {
      return authData.userId;
    } else {
      try {
        const authDataSerialized = await AsyncStorage.getItem("@AuthData");
        if (authDataSerialized) {
          const authData: AuthData = JSON.parse(authDataSerialized);
          return authData.userId;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ authData, loading, login, logout, getAccessToken, getUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
