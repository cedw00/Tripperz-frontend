import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import LoginScreen from "./screens/LoginScreen";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SetProfileScreen from "./screens/SetProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import ResultScreen from "./screens/ResultScreen";
import TripPlanScreen from "./screens/TripPlanScreen";
import PlanningScreen from "./screens/PlanningScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import activ from "./reducers/activ";
import tripper from "./reducers/tripper";




const store = configureStore({
  reducer: { user, activ, tripper },
});

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Message"/>
      <DrawerItem label="Logout"/>
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="SetProfile" component={SetProfileScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="TripPlan" component={TripPlanScreen} />
          <Stack.Screen name="Planning" component={PlanningScreen} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
