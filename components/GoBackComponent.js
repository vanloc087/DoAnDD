import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const GoBackComponent = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.goBackComponent}>
      <Text style={styles.textTitle}>{title}</Text>
      <TouchableOpacity
        style={{ width: 45 }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <MaterialIcons
          style={styles.icon}
          name="left"
          size={25}
          color={"white"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GoBackComponent;

const styles = StyleSheet.create({
  goBackComponent: {
    width: "100%",
    height: 45,
    backgroundColor: "#1E88E5",
    position: "absolute",
    alignItems: "center",
    flexDirection: "row",
  },

  icon: {
    marginLeft: 7,
  },

  textTitle: {
    width: "100%",
    position: "absolute",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
