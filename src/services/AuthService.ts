import API from "../../Api";
import { AuthData, RegistrationData } from "../types/AppTypes";

const login = (userName: string, password: string) => {
  return API.post("auth/login", { userName: userName, password: password })
    .then((res) => {
      return {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        userName: res.data.userName,
        userId: res.data.userId,
      } as AuthData;
    })
    .catch((err) => console.log(err));
};

const logout = (refreshToken: string) => {
  return API.post("auth/logout", { refreshToken: refreshToken }).catch((err) =>
    console.log(err)
  );
};

const register = (data: RegistrationData) => {
  return API.post("auth/register", {
    email: data.email,
    userName: data.userName,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
  }).catch((err) => console.log(err));
};

export const AuthService = {
  login,
  logout,
  register,
};
