import React from "react";
import SplashScreen from "../pages/SplashScreen";
import WelcomeScreen from "../pages/WelcomeScreen";
import LoginScreen from "../pages/LoginScreen";
import InputSurveyScreen from "../pages/InputSurveyScreen";
import DashboardScreen from "../pages/DashboardScreen";
import ProfileScreen from "../pages/ProfileScreen";
import MainDashboardScreen from "../pages/MainDashboardScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "../navigation/BottomNavigation";

//context
import HistoryScreen from "../pages/HistoryScreen";
import FinalInputSurveyScreen from "../pages/FinalInputSurveyScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarHideOnKeyboard: true }}
      tabBar={(props) => <BottomNavigation {...props} />}
    >
      <Tab.Screen
        name="Dashboard"
        component={MainDashboardScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Survey"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="InputSurvey"
        component={InputSurveyScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Final Data"
        component={FinalInputSurveyScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    // <CredentialsContext.Consumer>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // </CredentialsContext.Consumer>
  );
};

export default Routes;
