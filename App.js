import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotificationScreen from "./screens/NotificationScreen";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import ProductInfo from "./screens/ProductInfo";
import Cart from "./screens/Cart";
import DetailScreen from "./screens/DetailScreen";
import ListProduct from "./screens/ListProduct";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TabNavigation = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          activeTintColor: "#157cdb",
          inactiveTintColor: "#262626",
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Trang chủ",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: "Giỏ hàng",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="shopping-cart" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarLabel: "Thông báo",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="notifications" size={26} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Cá nhân",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person" size={26} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen" component={TabNavigation} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
        <Stack.Screen name="MyCart" component={Cart} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="ListProduct" component={ListProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
