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
import { useNavigation } from "@react-navigation/native";
import "intl";
import "intl/locale-data/jsonp/vi";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
const { width } = Dimensions.get("window");
const ProductItem = ({ image, name, price, discount }) => (
  <View style={styles.itemContainer}>
    <Image source={image} style={styles.itemImage} />
    <Text style={styles.itemName} numberOfLines={2}>
      {name}
    </Text>
    <Text style={styles.itemPrice}> {currencyFormatter.format(price)}</Text>
    <Text style={styles.itemDiscount}>
      {" "}
      {currencyFormatter.format(discount)}
    </Text>
  </View>
);

const HomeSectionComponent = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.sectionContainer}>
      {/*  */}
      <Text style={styles.sectionTitle}>{props.title}</Text>
      {/*  */}
      <Image source={props.banner} style={styles.sectionImage} />
      {/*  */}

      {/*  */}
      <ScrollView horizontal={true}>
        <View style={styles.listItemContainer}>
          {props.data.map((item) => (
            <TouchableOpacity
              key={item.ten}
              onPress={() => {
                navigation.navigate("DetailScreen", item);
              }}
            >
              <ProductItem
                name={item.ten}
                image={item.hinhAnh[0]}
                price={item.giaDeXuat}
                discount={item.giaThuc}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/*  */}
      <TouchableOpacity
        style={styles.seeMoreContainer}
        onPress={() => {
          navigation.navigate("ListProduct", { data: props.loai });
        }}
      >
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
