import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SetProfileScreen from "./screens/SetProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import TripPlanScreen from "./screens/TripPlanScreen";
import PlanningScreen from "./screens/PlanningScreen";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import activ from "./reducers/activ";
import tripper from "./reducers/tripper";


const store = configureStore({
  reducer: { user, activ, tripper },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TripPlan" component={TripPlanScreen} />
          <Stack.Screen name="Planning" component={PlanningScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="SetProfile" component={SetProfileScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
