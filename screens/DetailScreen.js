import "intl";
import "intl/locale-data/jsonp/vi";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  FlatList,
  Animated,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import { COLOURS, Items } from "../database/Database";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Ionicons from "react-native-vector-icons/Ionicons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

function DetailScreen(item) {
  const navigation = useNavigation();
  var data = item.route.params;
  let productType =
    data.loai === "smartPhone"
      ? "Điện Thoại"
      : data.loai === "ipad"
      ? "Máy Tính Bảng"
      : data.loai === "headphone"
      ? "Tai Nghe"
      : "Sạc Dự Phòng";

  const Item = ({ productImage }) => (
    <View style={styles.productImage}>
      <Image source={data.hinhAnh[0]} style={styles.productImageThumb} />
      <Text style={styles.productImageAlt}>Ảnh minh họa</Text>
    </View>
  );

  const [product, setProduct] = useState({});

  const width = Dimensions.get("window").width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     getDataFromDB();
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  //get product data by productID

  // const getDataFromDB = async () => {
  //   for (let index = 0; index < Items.length; index++) {
  //     if (Items[index].id == productID) {
  //       await setProduct(Items[index]);
  //       return;
  //     }
  //   }
  // };

  //add to cart

  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("HomeScreen");
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("HomeScreen");
      } catch (error) {
        return error;
      }
    }
  };

  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={item}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Product Info */}
        <View style={styles.productInfo}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 12,
                width: 45,
                marginLeft: 10,
                marginTop: 10,
              }}
            />
          </TouchableOpacity>
          <FlatList
            data={data.hinhAnh}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              marginTop: 32,
            }}
          >
            {data.hinhAnh.map((data, index) => {
              let opacity = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.2, 1, 0.2],
                extrapolate: "clamp",
              });
              return (
                <Animated.View
                  key={index}
                  style={{
                    width: "16%",
                    height: 2.4,
                    backgroundColor: COLOURS.black,
                    opacity,
                    marginHorizontal: 4,
                    borderRadius: 100,
                  }}
                ></Animated.View>
              );
            })}
          </View>
          <View style={styles.price}>
            <View>
              <Text style={styles.salePrice}>
                {currencyFormatter.format(data.giaThuc)}
              </Text>
              <Text style={styles.originPrice}>
                {currencyFormatter.format(data.giaDeXuat)}
              </Text>
            </View>
          </View>
          <Text style={styles.name}>{data.ten}</Text>
        </View>

        {/* Delivery Info */}
        <View style={styles.deliveryInfo}>
          <Text style={styles.delivery}>
            Giao Đến: Quận 1. P. Bến Nghé, Hồ Chí Minh
          </Text>
        </View>

        {/* Shop Info */}
        <View style={styles.shopInfo}>
          <Image style={styles.shopAvatar} source={data.hinhAnh[0]} />
          <Text style={styles.shopName}>{data.hangSanXuat}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            justifyContent: "space-evenly",
          }}
        >
          <Button style={styles.shopAction} title="Xem Shop" />
          <Button style={styles.shopAction} title="Theo Dõi" />
        </View>

        {/* Product Detail */}
        <View style={styles.productDetail}>
          <View style={styles.productDetailRow}>
            <Text style={styles.productDetailTitle}>Loại</Text>
            <Text style={styles.productDetailValue}>{productType}</Text>
          </View>
          <View style={styles.productDetailRow}>
            <Text style={styles.productDetailTitle}>Ngày Sản Xuất</Text>
            <Text style={styles.productDetailValue}>
              {data.ngaySanXuat + ""}
            </Text>
          </View>
          <View style={styles.productDetailRow}>
            <Text style={styles.productDetailTitle}>Hãng Sản Xuất</Text>
            <Text style={styles.productDetailValue}>{data.hangSanXuat}</Text>
          </View>
        </View>

        {/* Product Description */}
        <View style={styles.productDescription}>
          <Text style={styles.productDescriptionTitle}>Mô Tả Sản Phẩm</Text>
          <Text style={styles.productDescriptionValue}>{data.moTa}</Text>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          height: "8%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            addToCart(data.id);
          }}
          style={styles.addToCart}
        >
          <Text style={styles.addToCartTitle}>
            {/* {product.isAvailable ? "Add to cart" : "Not Avialable"} */}
            Mua ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  productInfo: {
    marginTop: 0,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  thumbnail: {
    width: windowWidth,
    height: windowHeight * 0.45,
    resizeMode: "contain",
  },
  price: {
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#33ccff",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  originPrice: {
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 30,
    color: "#ffffff",
    textDecorationLine: "line-through",
  },
  salePrice: {
    fontWeight: "bold",
    fontSize: 28,
    lineHeight: 36,
    color: "#ffffff",
  },
  name: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: "500",
    marginVertical: 20,
    marginHorizontal: 15,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowRadius: 5,
  },
  deliveryInfo: {
    width: windowWidth,
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  delivery: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  shopInfo: {
    width: windowWidth,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  shopAvatar: {
    marginHorizontal: 10,
    marginVertical: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  shopName: {
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
    marginHorizontal: 10,
  },
  shopAction: {
    margin: 10,
  },
  productDetail: {
    backgroundColor: "#ffffff",
    width: "100%",
    marginTop: 10,
  },
  productDetailRow: {
    flexDirection: "row",
  },
  productDetailTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "bold",
    minWidth: 125,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  productDetailValue: {
    flex: 1,
    fontSize: 18,
    lineHeight: 20,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  productDescription: {
    backgroundColor: "#ffffff",
    width: "100%",
    marginTop: 10,
    paddingBottom: 80,
  },
  productDescriptionTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "500",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  productDescriptionValue: {
    fontSize: 15,
    lineHeight: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  addToCart: {
    borderRadius: 15,
    width: "90%",
    backgroundColor: "#0043F9",
  },
  addToCartTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 15,
    marginHorizontal: 15,
    textAlign: "center",
  },
  productImageThumb: {
    width: windowWidth,
    height: windowHeight * 0.45,
    resizeMode: "contain",
  },
  productImage: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  productImageAlt: {
    fontStyle: "italic",
    fontSize: 15,
    textAlign: "center",
  },
});
