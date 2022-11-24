import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import listSanPham from "../data/sanpham";
import GoBackComponent from "../components/GoBackComponent";
import { Searchbar } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ListProduct(data) {
  const navigation = useNavigation();
  let loai_id = data.route.params;
  const createListTemp = () => {
    let listTemp = new Array();
    if (loai_id.data == 1) {
      listSanPham.forEach((element) => {
        if (element.loai == "smartPhone" || element.loai == "ipad") {
          listTemp.push(element);
        }
      });
    } else if (loai_id.data == 2) {
      listSanPham.forEach((element) => {
        if (element.loai == "backupChanger" || element.loai == "headPhone") {
          listTemp.push(element);
        }
      });
    } else if (loai_id.data == 3) {
      listSanPham.forEach((element) => {
        if (element.loai == "watch") {
          listTemp.push(element);
        }
      });
    } else {
      listSanPham.forEach((element) => {
        if (
          element.ten.toLowerCase().includes(loai_id.toLowerCase()) ||
          element.loai.toLowerCase().includes(loai_id.toLowerCase())
        ) {
          listTemp.push(element);
        } else if (element.moTa.toLowerCase().includes(loai_id.toLowerCase())) {
          listTemp.push(element);
        }
      });
    }
    return listTemp;
  };
  let listTemp = createListTemp();
  const Item = ({ imgproduct, title, price, shortdescription }) => (
    <View
      style={{
        width: "100%",
        height: 130,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 2,
        backgroundColor: "#fff",
        flexDirection: "row",
      }}
    >
      <View style={{ width: 110, height: 110, marginLeft: 5 }}>
        <Image
          source={imgproduct}
          style={{ resizeMode: "contain", width: null, height: 100 }}
        />
      </View>

      <View>
        <Text style={{ fontSize: 17, marginHorizontal: 10, marginTop: 5 }}>
          {title}
        </Text>
        <Text
          style={{
            marginHorizontal: 10,
            marginBottom: 5,
            fontSize: 22,
            color: "red",
            fontWeight: "bold",
          }}
        >
          {shortdescription} đ
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginHorizontal: 10,
            fontStyle: "italic",
            textDecorationLine: "line-through",
          }}
        >
          {price} đ
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailScreen", item);
      }}
    >
      <Item
        imgproduct={item.hinhAnh[0]}
        title={item.ten}
        price={item.giaDeXuat}
        shortdescription={item.giaThuc}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "93%", height: "90%", marginTop: 50 }}>
        <FlatList
          style={{ width: "100%" }}
          data={listTemp}
          renderItem={renderItem}
          keyExtractor={(item) => item.ten}
        />
      </View>
      <GoBackComponent title={"Tất cả sản phẩm"}></GoBackComponent>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
});
