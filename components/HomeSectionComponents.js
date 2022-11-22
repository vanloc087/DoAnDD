import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";

const { width } = Dimensions.get("window");
const item_image_1 = require("../assets/item_image_1.png");
const item_image_2 = require("../assets/item_image_2.png");
const item_image_3 = require("../assets/item_image_3.png");
const item_image_4 = require("../assets/item_image_4.png");
const ProductItem = ({ image, name, price, discount }) => (
  <View style={styles.itemContainer}>
    <Image source={image} style={styles.itemImage} />
    <Text style={styles.itemName} numberOfLines={2}>
      {name}
    </Text>
    <Text style={styles.itemPrice}>{price}</Text>
    <Text style={styles.itemDiscount}>{discount}</Text>
  </View>
);

const HomeSectionComponent = (props) => {
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

  return (
    <View style={styles.sectionContainer}>
      {/*  */}
      <Text style={styles.sectionTitle}>{props.title}</Text>
      {/*  */}
      <Image source={props.banner} style={styles.sectionImage} />
      {/*  */}
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
      {/*  */}
      <ScrollView horizontal={true}>
        <View style={styles.listItemContainer}>
          {props.data.map((item) => (
            <TouchableOpacity>
              <ProductItem
                name={item.ten}
                image={item.hinhAnh.blue}
                price={item.giaDeXuat}
                discount={item.giaThuc}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/*  */}
      <TouchableOpacity style={styles.seeMoreContainer}>
        <Text style={styles.seeMoreText}>
          XEM THÊM {props.data.length} SẢN PHẨM {">>>"}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeSectionComponent;

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#2f2f2f",
    marginVertical: 12,
  },
  sectionImage: {
    width: width - 24,
    height: 130,
    borderRadius: 4,
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
  listItemContainer: {
    flexDirection: "row",
  },
  itemContainer: {
    width: 100,
    marginRight: 12,
    marginTop: 10,
  },
  itemImage: {
    width: 100,
    height: 120,
  },
  itemName: {
    height: 35,
    fontSize: 14,
    color: "#484848",
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 10,
    fontWeight: "1",
    color: "#2a2a2a",
    textDecorationLine: "line-through",
  },
  itemDiscount: {
    fontSize: 16,
    fontWeight: "500",
    color: "red",
  },
  //
  seeMoreContainer: {
    marginTop: 10,
    padding: 12,
    borderTopWidth: 0.6,
    borderTopColor: "#ededed",
    alignItems: "center",
  },
  seeMoreText: {
    color: "#0e45b4",
  },
});
