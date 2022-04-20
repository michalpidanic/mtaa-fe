import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { useAuth } from "../contexts/Auth";
import { Loading } from "../components/Loading";

export const Router = () => {
  const { authData, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {authData ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
