import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Data from "../../data/user";

import GoBackComponent from "../../components/GoBackComponent";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const LoginOnPress = () => {
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].name == userName && Data[i].password == password) {
        navigation.navigate("HomeScreen", userName);
        return;
      }
    }
    Alert.alert("Thông báo!", "Đăng nhập thất bại.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/logo.png")} />

      <View style={styles.formLogin}>
        <View style={styles.inputComponent}>
          <MaterialIcons
            style={styles.iconLogin}
            name="person"
            size={27}
            color={"gray"}
          />
          <TextInput
            style={styles.inputLogin}
            placeholder="Tên đăng nhập"
            value={userName}
            onChangeText={(text) => {
              setUserName(text);
            }}
          />
        </View>

        <View style={styles.inputComponent}>
          <MaterialIcons
            style={styles.iconLogin}
            name="lock"
            size={27}
            color={"gray"}
          />
          <TextInput
            style={styles.inputLogin}
            secureTextEntry={true}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => {
            LoginOnPress();
          }}
        >
          <Text style={styles.textButton}>Đăng Nhập</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30 }}>
        <View style={styles.otherComponent}>
          <Text>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            <Text style={styles.textRegister}> Đăng ký.</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherComponent}>
          <Text>Bạn đã quên</Text>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.textRegister}> mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <GoBackComponent title="Đăng nhập" />
      <StatusBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "white",
  },

  formLogin: {
    width: "100%",
    height: 220,
    alignItems: "center",
  },

  inputComponent: {
    width: "90%",
    height: 55,
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "gray",
    borderRadius: 7,
    marginBottom: 10,
  },

  iconLogin: {
    marginHorizontal: 10,
  },

  inputLogin: {
    fontSize: 17,
    color: "#1E88E5",
    width: "80%",
  },

  buttonLogin: {
    width: "90%",
    height: 50,
    backgroundColor: "#1E88E5",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  textButton: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },

  registerButton: {
    alignItems: "center",
  },

  otherComponent: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  textRegister: {
    color: "#1E88E5",
    fontStyle: "italic",
  },
});

export default LoginScreen;
