import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../utils/Colors";
import { windowWidth } from "../utils/Dimensions";

const ListItem = ({ title, subTitle, tahun, bulan }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        {/* <Image
          source={photo}
          style={{width: 55, height: 55, borderRadius: 10, marginRight: 8}}
        /> */}
        <View style={(style.label, { width: windowWidth - 50 })}>
          <Text
            style={{
              color: "#333",
              // fontFamily: 'Roboto-Medium',
              fontSize: 14,
            }}
          >
            Tahun : {tahun}
          </Text>
          <Text
            style={{
              color: "#333",
              // fontFamily: 'Roboto-Medium',
              fontSize: 14,
            }}
          >
            Bulan : {bulan}
          </Text>

          <Text
            style={{
              color: "#333",
              // fontFamily: 'Roboto-Medium',
              fontSize: 14,
            }}
          >
            Produksi : {subTitle}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: "#333",
              // fontFamily: 'Roboto-Medium',
              fontSize: 14,
              // textTransform: "uppercase",
            }}
          >
            Estimasi Luas Tanam : {title}
          </Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          />
        </View>
      </View>

      {/* <TouchableOpacity
        style={{
          backgroundColor: "#0aada8",
          padding: 10,
          width: 100,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "Roboto-Medium",
            fontSize: 14,
          }}
        >
          {isFree == "Yes" && "Play"}
          {isFree == "No" && price}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default ListItem;

const style = StyleSheet.create({
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontWeight: "500",
  },
});
