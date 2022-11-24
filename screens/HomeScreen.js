import React from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import listSanPham from "../data/sanpham";
import { useNavigation } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeSectionComponent from "../components/HomeSectionComponents";
import { useState, useEffect } from "react";

const creatListDienThoai_Ipad = () => {
  let sanPhams = new Array();
  listSanPham.forEach((element) => {
    if (element.loai == "smartPhone" || element.loai == "ipad") {
      sanPhams.push(element);
    }
  });
  return sanPhams;
};
const creatListPhuKien = () => {
  let sanPhams = new Array();
  listSanPham.forEach((element) => {
    if (element.loai == "backupChanger" || element.loai == "headPhone") {
      sanPhams.push(element);
    }
  });
  return sanPhams;
};
const creatListSPKhac = () => {
  let sanPhams = new Array();
  listSanPham.forEach((element) => {
    if (element.loai == "watch") {
      sanPhams.push(element);
    }
  });
  return sanPhams;
};
const HomeScreen = () => {
  const [clickBtn1, setClickBtn1] = useState(true);
  const [clickBtn2, setClickBtn2] = useState(false);
  const [clickBtn3, setClickBtn3] = useState(false);
  const [clickBtn4, setClickBtn4] = useState(false);
  const [data, setData] = useState([]);

  const handelFilterData = (type) => {
    if (type === 3) {
      setData(listData);
    } else {
      setData(listData.filter((x) => x.type === type));
    }
  };

  const navigation = useNavigation();

  let listDienThoaiIpad = creatListDienThoai_Ipad();
  let listPhuKien = creatListPhuKien();
  let listSPKhac = creatListSPKhac();
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  const section_banner_sanphamchinh = require("../assets/section_banner.png");
  const section_banner_phukien = require("../assets/bannerphukien.gif");
  const section_banner_dongho = require("../assets/bannerdong_ho.webp");

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" />
      {/*  */}
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/logo.png")}
          />
          <Text style={styles.brand}>ĐiệnThoạiTốt</Text>
        </View>
        <View style={styles.headerInput}>
          <Searchbar
            style={styles.inputContainer}
            placeholder="Bạn cần tìm gì?"
            onChangeText={onChangeSearch}
            onIconPress={() => {
              navigation.navigate("ListProduct", searchQuery);
            }}
            value={searchQuery}
          />
          {/*  */}
          <TouchableOpacity
            style={styles.cartContainer}
            onPress={() => {
              navigation.navigate("MyCart");
            }}
          >
            <FontAwesome name="shopping-cart" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/*  */}
      <View style={styles.bodyContainer}>
        <ScrollView>
          <ScrollView horizontal={true}>
            <View style={styles.filterContainer}>
              <View>
                <TouchableOpacity
                  style={
                    clickBtn1 === true
                      ? styles.filterActiveButtonContainer
                      : styles.filterInactiveButtonContainer
                  }
                  onPress={() => {
                    setClickBtn1(true);
                    setClickBtn2(false);
                    setClickBtn3(false);
                    setClickBtn4(false);
                    // handelFilterData(3);
                  }}
                >
                  <Text
                    style={
                      clickBtn1 === true
                        ? styles.filterActiveText
                        : styles.filterInactiveText
                    }
                  >
                    Tất cả
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={
                    clickBtn2 === true
                      ? styles.filterActiveButtonContainer
                      : styles.filterInactiveButtonContainer
                  }
                  onPress={() => {
                    setClickBtn1(false);
                    setClickBtn2(true);
                    setClickBtn3(false);
                    setClickBtn4(false);
                    // handelFilterData(3);
                  }}
                >
                  <Text
                    style={
                      clickBtn2 === true
                        ? styles.filterActiveText
                        : styles.filterInactiveText
                    }
                  >
                    Điện thoại SmartPhone
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={
                    clickBtn3 === true
                      ? styles.filterActiveButtonContainer
                      : styles.filterInactiveButtonContainer
                  }
                  onPress={() => {
                    setClickBtn1(false);
                    setClickBtn2(false);
                    setClickBtn3(true);
                    setClickBtn4(false);
                    // handelFilterData(3);
                  }}
                >
                  <Text
                    style={
                      clickBtn3 === true
                        ? styles.filterActiveText
                        : styles.filterInactiveText
                    }
                  >
                    Máy tính bảng
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={
                    clickBtn4
                      ? styles.filterActiveButtonContainer
                      : styles.filterInactiveButtonContainer
                  }
                  onPress={() => {
                    setClickBtn1(false);
                    setClickBtn2(false);
                    setClickBtn3(false);
                    setClickBtn4(true);
                    // handelFilterData(3);
                  }}
                >
                  <Text
                    style={
                      clickBtn4 === true
                        ? styles.filterActiveText
                        : styles.filterInactiveText
                    }
                  >
                    Laptop
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <HomeSectionComponent
            data={listDienThoaiIpad}
            danhmuc={["Tất cả", "Điện thoại SmartPhone", "Máy tính Bảng"]}
            title={"Điện thoại - Máy tính bảng"}
            banner={section_banner_sanphamchinh}
            loai={1}
          />
          <HomeSectionComponent
            data={listPhuKien}
            danhmuc={["Tất cả", "Tai nghe", "Sạc dự phòng"]}
            title={"Phụ kiện"}
            banner={section_banner_phukien}
            loai={2}
          />
          <HomeSectionComponent
            data={listSPKhac}
            danhmuc={["Tất cả"]}
            title={"Sản phẩm khác"}
            banner={section_banner_dongho}
            loai={3}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 4,
    backgroundColor: "#1e88e5",
  },
  headerInput: {
    flexDirection: "row",
    backgroundColor: "#1e88e5",
  },
  brand: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
    paddingHorizontal: 2,
    borderRadius: 2,
    height: 35,
  },
  inputText: {
    color: "#969696",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
  },
  cartContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  //
  bodyContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  //
  filterContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  filterActiveButtonContainer: {
    backgroundColor: "#242424",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 10,
  },
  filterInactiveButtonContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderColor: "#5a5a5a",
    borderWidth: 1,
    marginRight: 10,
  },
  filterActiveText: {
    color: "#fff",
  },
  filterInactiveText: {
    color: "#5a5a5a",
  },
  //
});

export default HomeScreen;
