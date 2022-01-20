import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import ListCard from "./ListCard";

const SurveyHistory = ({ customContainerStyle, history }) => {
  //   const [data, setData] = useState(null);
  const [luastanam, setLuastanam] = useState(0);
  const [produksitanam, setProduksitanam] = useState(0);
  const [yieldtanam, setYieldtanam] = useState(0);
  const [namaprov, setNamaprov] = useState("");
  useEffect(() => {
    hitungtotal(history);
  });

  const hitungtotal = (history) => {
    const hitung = history.length;
    let luas = 0;
    let produksi = 0;
    let yieldd = 0;
    // console.log("history :", history[1].estimasi_luas_tanam);
    let namaprov = "";

    for (var i = 0; i < hitung; i++) {
      luas += parseInt(history[i].estimasi_luas_tanam);
      produksi += parseInt(history[i].produksi);
      yieldd += parseInt(history[i].yield);
      namaprov = history[0].nama_prov;
    }
    yieldd = yieldd / hitung;
    setLuastanam(luas);
    setProduksitanam(produksi);
    setYieldtanam(yieldd);
    setNamaprov(namaprov);
  };

  return (
    <View>
      <StatusBar style="dark" />
      <View
        style={{ marginVertical: 15, alignItems: "center", marginTop: -20 }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>History</Text>
        <Text style={{ fontSize: 16 }}>Provinsi : {namaprov} </Text>
        <Text style={{ fontSize: 16 }}>
          Total Luas Tanam : {luastanam} Hektar{" "}
        </Text>
        <Text style={{ fontSize: 16 }}>
          Total Produksi : {produksitanam} Ton{" "}
        </Text>
        <Text style={{ fontSize: 16 }}>Yield : {yieldtanam} </Text>
      </View>

      <SafeAreaView
        style={{
          marginTop: 10,
          marginHorizontal: SIZES.padding,
          padding: 10,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          ...customContainerStyle,
        }}
      >
        {/* <Text style={{ ...FONTS.h2 }}>Survey History</Text> */}
        <View>
          <FlatList
            style={{ height: 530, flexGrow: 0 }}
            contentContainerStyle={{ marginTop: SIZES.radius }}
            scrollEnabled={true}
            data={history}
            keyExtractor={(item) =>
              `${item.tahun}+${item.bulan}+${item.nama_kec}`
            }
            renderItem={({ item }) => <ListCard dataList={item} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: COLORS.lightGray,
                  }}
                ></View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SurveyHistory;
