import React from 'react';
import SplashScreen from '../pages/SplashScreen';
import WelcomeScreen from '../pages/WelcomeScreen';
import LoginScreen from '../pages/LoginScreen';
import InputSurveyScreen from '../pages/InputSurveyScreen';
import DashboardScreen from '../pages/DashboardScreen';
import ReportScreen from '../pages/ReportScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from '../navigation/BottomNavigation';

//context
import { CredentialsContext } from '../components/CredentialContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MainApp = () => {
    return(
    <Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
        <Tab.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false}} />
        <Tab.Screen name="InputSurvey" component={InputSurveyScreen} options={{headerShown: false}} />
        <Tab.Screen name="Report" component={ReportScreen} options={{headerShown: false}} />
    </Tab.Navigator>
    );
}

const Routes = () => {
    return (
        // <CredentialsContext.Consumer>
                <NavigationContainer>
                    <Stack.Navigator 
                        initialRouteName="Splash"
                    >
                        <Stack.Screen name="MainApp" component={MainApp} options={{headerShown: false}} />
                        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}  />
                        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
                        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                    </Stack.Navigator>
                </NavigationContainer>            
        // </CredentialsContext.Consumer>
    );
};

export default Routes ;