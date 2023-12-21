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
import TripsScreen from "./screens/TripsScreen";
import TopDestionationsScreen from './screens/TopDestinationsScreen';
import LoadingScreen from "./screens/LoadingScreen";
import UpdateTripScreen from "./screens/UpdateTripScreen"
import ActivitiesResultScreen from './screens/ActivitiesResultScreen';

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import activ from "./reducers/activ";
import tripper from "./reducers/tripper";
import search from './reducers/search';
import trips from './reducers/trips';
import activSearch from './reducers/activSearch';

const store = configureStore({
  reducer: { user, activ, tripper, search, trips, activSearch },
});

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Parameters"/>
      <DrawerItem label="Help"/>
      <DrawerItem label="Contact us"/>
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerActiveBackgroundColor: 'skyblue',
        drawerInactiveBackgroundColor: '#FFFFFF',
        drawerLabelStyle: {
          color: '#000000',
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerShown: false,
      })}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Trips" component={TripsScreen} />
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
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="TopDestionations" component={TopDestionationsScreen} />
          <Stack.Screen name="TripPlan" component={TripPlanScreen} />
          <Stack.Screen name="Planning" component={PlanningScreen} />
          <Stack.Screen name="UpdateTrip" component={UpdateTripScreen} />
          <Stack.Screen name="ActivitiesResult" component={ActivitiesResultScreen} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}