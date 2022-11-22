import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  StatusBar,
  Alert
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Data from "../../data/user";

import GoBackComponent from "../../components/GoBackComponent";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkValidUserName, setCheckValidUserName] = useState(false);
  const [checkValidPass, setCheckValidPass] = useState(false);

  const RegisterOnPress = () => {
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].name != userName) {
        var item = {
          id: Data[i].id + 1,
          name: userName,
          password: password,
          email: email
        }
        Data.push(Data, item);
        navigation.navigate('HomeScreen');
        return;
      }
    }
    Alert.alert('Thông báo!', 'Đăng ký thất bại.');
  };

  const handleCheckEmail = (text) => {
    let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

    setEmail(text);
    if (regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const handleCheckUserName = (text) => {
    let regex = /^[A-Za-z0-9_\.]{6,32}$/;

    setUserName(text);
    if (regex.test(text)) {
      setCheckValidUserName(false);
    } else {
      setCheckValidUserName(true);
    }
  };

  const handleCheckPass = (text) => {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    setPassword(text);
    if (regex.test(text)) {
      setCheckValidPass(false);
    } else {
      setCheckValidPass(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.formRegis}>
        <View style={styles.inputComponent}>
          <MaterialIcons
            style={styles.iconRegis}
            name="person"
            size={27}
            color={"gray"}
          />
          <TextInput
            style={styles.inputRegis}
            placeholder="Tên đăng nhập"
            value={userName}
            onChangeText={(text) => { handleCheckUserName(text) }}
          />
        </View>
        {checkValidUserName ?
          (<Text style={{ color: 'red', fontStyle: 'italic', width: '90%', height: 37 }}>Tên đăng nhập từ 6-32 ký tự bao gồm các ký tự chữ cái, chữ số, dấu gạch dưới, dấu chấm</Text>) :
          (<Text style={{ width: '90%', height: 10 }}> </Text>)
        }

        <View style={styles.inputComponent}>
          <MaterialIcons
            style={styles.iconRegis}
            name="email"
            size={27}
            color={"gray"}
          />
          <TextInput
            style={styles.inputRegis}
            placeholder="Email"
            value={email}
            onChangeText={(text) => { handleCheckEmail(text) }}
          />
        </View>
        {checkValidEmail ?
          (<Text style={{ color: 'red', fontStyle: 'italic', width: '90%', height: 25 }}>Email không hợp lệ</Text>) :
          (<Text style={{ width: '90%', height: 10 }}> </Text>)
        }

        <View style={styles.inputComponent}>
          <MaterialIcons
            style={styles.iconRegis}
            name="lock"
            size={27}
            color={"gray"}
          />
          <TextInput
            style={styles.inputRegis}
            secureTextEntry={true}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={(text) => { handleCheckPass(text) }} />
        </View>
        {checkValidPass ?
          (<Text style={{ color: 'red', fontStyle: 'italic', width: '90%', height: 25 }}>Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái và một số</Text>) :
          (<Text style={{ width: '90%', height: 10 }}> </Text>)
        }

        {userName == '' || email == '' || password == '' || checkValidEmail == true
          || checkValidPass == true || checkValidUserName == true ?
          (<TouchableOpacity disabled style={styles.buttonLoginDis} >
              <Text style={styles.textButton}>Đăng Ký</Text>
            </TouchableOpacity>) 
          :
          (<TouchableOpacity style={styles.buttonLogin} onPress={() => { RegisterOnPress() }}>
              <Text style={styles.textButton}>Đăng Ký</Text>
            </TouchableOpacity>)
        }
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={styles.otherComponent}>
          <Text>Bạn đã có tài khoản?</Text>
          <TouchableOpacity style={styles.registerButton} onPress={()=>{navigation.goBack()}}>
            <Text style={styles.textRegister}> Đăng nhập.</Text>
          </TouchableOpacity>
        </View>
      </View>

      <GoBackComponent title='Đăng Ký' />
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

  formRegis: {
    width: "100%",
    height: 290,
    alignItems: "center",
    marginTop: 100
  },

  inputComponent: {
    width: "90%",
    height: 55,
    borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "gray",
    borderRadius: 7,
  },

  iconRegis: {
    marginHorizontal: 10,
  },

  inputRegis: {
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

  buttonLoginDis: {
    width: "90%",
    height: 50,
    backgroundColor: "#c2c2c2",
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

export default RegisterScreen;
