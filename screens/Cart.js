import React, { useState, useEffect } from "react";
import "intl";
import "intl/locale-data/jsonp/vi";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOURS, Items } from "../database/Database";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import listSanPham from "../data/sanpham";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const Cart = ({ navigation }) => {
  const [listOrder, setListOrder] = useState([]);
  const [itemTotal, setItemTotal] = useState(0);
  const [product, setProduct] = useState();
  const createData = async (setListOrder) => {
    let items = await AsyncStorage.getItem("cartItems");
    items = JSON.parse(items);
    let listTemp = [];
    if (items) {
      listSanPham.forEach((data) => {
        if (items.includes(data.id)) {
          listTemp.push({ data, amount: 1 });
        }
      });
    }
    setListOrder(listTemp);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    createData(setListOrder);
  }, []);

  useEffect(() => {
    setItemTotal(
      listOrder.reduce((partialSum, value) => {
        return partialSum + Number(value.amount * value.data.giaThuc);
      }, 0)
    );
  }, []);

  //get data from local DB by ID
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem("cartItems");
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      listSanPham.forEach((data) => {
        if (items.includes(data.id)) {
          productData.push({ data, amount: 1 });
          return;
        }
      });
      setProduct(productData);
      setItemTotal(
        listOrder.reduce((partialSum, value) => {
          return partialSum + Number(value.amount * value.data.giaThuc);
        }, 0)
      );

      // getTotal(productData);
    } else {
      setProduct(false);
      // getTotal(false);
    }
  };

  //get total price of all items in the cart
  // const getTotal = (productData) => {
  //   let total = 0;
  //   for (let index = 0; index < productData.length; index++) {
  //     let productPrice = productData[index].productPrice;
  //     total = total + productPrice;
  //   }
  //   setTotal(total);
  // };

  //remove data from Cart

  const removeItemFromCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }

        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        getDataFromDB();
      }
    }
  };

  //checkout

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem("cartItems");
    } catch (error) {
      return error;
    }
    setItemTotal(
      listOrder.reduce((partialSum, value) => {
        return 0;
      }, 0)
    );
    ToastAndroid.show("Items will be Deliverd SOON!", ToastAndroid.SHORT);
    navigation.navigate("Home");
  };
  // handle quanlity
  const handelQuantity = async (id, quantity) => {
    console.log(id);
    console.log(quantity);
    listOrder.forEach((x) => {
      if (x.data.id === id) {
        if (x.amount != 0) {
          x.amount = x.amount + quantity;
        }
      }
    });
    setItemTotal(
      listOrder.reduce((partialSum, value) => {
        console.log(value);
        return partialSum + Number(value.amount * value.data.giaThuc);
      }, 0)
    );
  };

  const renderProducts = (data, index) => {
    return (
      <View
        key={data.data.ten}
        style={{
          width: "100%",
          height: 100,
          marginVertical: 6,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: "30%",
            height: 100,
            padding: 5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}
          onPress={() => {
            navigation.navigate("DetailScreen", data.data);
          }}
        >
          <Image
            source={data.data.hinhAnh[0]}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{}}
            onPress={() => {
              navigation.navigate("DetailScreen", data.data);
            }}
          >
            <Text
              style={{
                fontSize: 14,
                maxWidth: "100%",
                maxHeight: 36,
                color: COLOURS.black,
                fontWeight: "600",
                letterSpacing: 1,
              }}
            >
              {data.data.ten}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                alignItems: "center",
                opacity: 0.6,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  maxWidth: "85%",
                  marginRight: 4,
                }}
              >
                {currencyFormatter.format(data.data.giaThuc)}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  fontWeight: "400",
                  maxWidth: "85%",
                  marginRight: 4,
                  textDecorationLine: "line-through",
                }}
              >
                ({currencyFormatter.format(data.data.giaDeXuat)})
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}
                onPress={() => handelQuantity(data.data.id, -1)}
              >
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </TouchableOpacity>
              <Text>{data.amount}</Text>
              <TouchableOpacity
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}
                onPress={() => handelQuantity(data.data.id, 1)}
              >
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data.data.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                  backgroundColor: COLOURS.backgroundLight,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative",
      }}
    >
      <ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: "400",
            }}
          >
            Giỏ hàng
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: COLOURS.black,
            fontWeight: "500",
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}
        >
          Sản phẩm đã chọn
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          {product ? product.map(renderProducts) : null}
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: "500",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Địa chỉ giao hàng
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    color: COLOURS.blue,
                    backgroundColor: COLOURS.backgroundLight,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                    borderRadius: 10,
                    marginRight: 18,
                  }}
                >
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    style={{
                      fontSize: 18,
                      color: COLOURS.blue,
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLOURS.black,
                      fontWeight: "500",
                    }}
                  >
                    Nhà riêng
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: "400",
                      lineHeight: 20,
                      opacity: 0.5,
                    }}
                  >
                    Giao Đến: Quận 1. P. Bến Nghé, Hồ Chí Minh
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{ fontSize: 22, color: COLOURS.black }}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: "500",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Phương thức thanh toán
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    color: COLOURS.blue,
                    backgroundColor: COLOURS.backgroundLight,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 12,
                    borderRadius: 10,
                    marginRight: 18,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "900",
                      color: COLOURS.blue,
                      letterSpacing: 1,
                    }}
                  >
                    VISA
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLOURS.black,
                      fontWeight: "500",
                    }}
                  >
                    Visa Classic
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: "400",
                      lineHeight: 20,
                      opacity: 0.5,
                    }}
                  >
                    ****-9092
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{ fontSize: 22, color: COLOURS.black }}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 40,
              marginBottom: 80,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: "500",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Chi tiết thanh toán
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.black,
                  opacity: 0.5,
                }}
              >
                Tổng tiền hàng
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: COLOURS.black,
                  opacity: 0.8,
                }}
              >
                {currencyFormatter.format(itemTotal)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 22,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.black,
                  opacity: 0.5,
                }}
              >
                Giảm giá
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: COLOURS.black,
                  opacity: 0.8,
                }}
              >
                đ 0
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.black,
                  opacity: 0.5,
                }}
              >
                Tổng thanh toán
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: COLOURS.black,
                }}
              >
                {itemTotal}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 10,
          height: "8%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => checkOut()}
          style={{
            width: "86%",
            height: "90%",
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: "uppercase",
            }}
          >
            Thanh Toán
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
