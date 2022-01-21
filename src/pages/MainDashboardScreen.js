import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";

import { LineChart } from "react-native-chart-kit";

import {
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryLegend,
} from "victory-native";

import { SIZES, FONTS, COLORS, VictoryCustomTheme } from "../constants";

const MainDashboardScreen = ({ navigation }) => {
  const [selectedData, setSelectedData] = useState({
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        data: [10, 20, 15, 40, 50, 45],
        // color: (opacity = 1) => "#ECEFF1", // optional
        strokeWidth: 2, // optional
        color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
      },
      {
        data: [0, 0, 0, 0, 0, 0],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
      },
    ],
    legend: ["Produksi", "Legend"],
  });

  const [selectedData2, setSelectedData2] = useState({
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        data: [10, 30, 40, 40, 50, 45],
        color: (opacity = 1) => "#ECEFF1", // optional
        strokeWidth: 2, // optional
      },
      {
        data: [0, 0, 0, 0, 0, 0],
        strokeWidth: 2,
        color: (opacity = 2) => `rgba(255,0,0, ${opacity})`, // optional
      },
    ],
    legend: ["Luas Tanam", "Legend"],
  });

  const [selectedData3, setSelectedData3] = useState({
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        data: [10, 30, 40, 40, 50, 45],
        color: (opacity = 1) => "#ECEFF1", // optional
        strokeWidth: 2, // optional
      },
      {
        data: [0, 0, 0, 0, 0, 0],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
      },
    ],
    legend: ["Yield", "Legend"],
  });

  const [currentMonth, setCurrentMonth] = useState([]);

  const scrollX = new Animated.Value(0);
  const numberOfCharts = [1, 2, 3];

  useFocusEffect(
    React.useCallback(() => {
      getdatagrafik1();
      getdatagrafik6();
      getdatagrafik2();
      getdatagrafik7();
      getdatagrafik3();
      getdatagrafik8();
      getdatacurrent();
    }, [])
  );

  // useEffect(() => {
  //   getdatagrafik1();
  //   getdatagrafik2();
  //   getdatagrafik3();
  //   getdatacurrent();
  //   // console.log("data dipilih :", selectedData);
  // }, []);

  const monthname = (bulan) => {
    return [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ][bulan - 1];
  };

  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        strokeWidth: 2,
        color: (opacity = 1) => "#ECEFF1",
      },
      {
        data: [0, 0, 0, 0, 0, 0],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255,251,71, ${opacity})`, // optional
      },
    ],
    legend: ["Produksi", "Hist"],
  };

  const data2 = {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        data: [10, 20, 15, 40, 50, 45],
        color: (opacity = 1) => "#ECEFF1", // optional
        strokeWidth: 2, // optional
      },
      {
        data: [0, 0, 0, 0, 0, 0],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255,251,71, ${opacity})`, // optional
      },
    ],
    legend: ["Luas Tanam", "Legend"],
  };

  const data3 = {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        data: [5, 20, 15, 40, 50, 60],
        color: (opacity = 1) => "#ECEFF1", // optional
        strokeWidth: 2, // optional
      },
      {
        data: [0, 0, 0, 0, 0, 0],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255,251,71, ${opacity})`, // optional
      },
    ],
    legend: ["Yield", "Legend"],
  };

  const getdatagrafik1 = () => {
    const url = "http://182.23.53.73:1340/apiuser/v1/getdashboard1";

    fetch(url).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const foundgrafik = isJson && (await response.json());
      // console.log("nama legend : ", foundgrafik[1].produksi[0]);

      if (!response.ok) {
        // get error message from body or default to response status
        // const error = (data && data.message) || response.status;
        // return Promise.reject(error);
        console.log("error getting data grafik");
        return;
      }

      // console.log("legend :", Object.keys(foundgrafik[2]));

      const count = foundgrafik.length;
      const datagrafik = [];
      const periodgrafik1 = [];

      for (var i = 0; i < count; i++) {
        datagrafik.push(foundgrafik[i].produksi);
        periodgrafik1.push(
          monthname(foundgrafik[i].bulan) + "-" + foundgrafik[i].tahun
        );
      }

      // const legendname = Object.keys(foundgrafik[0]);

      console.log("data grafik", datagrafik);
      // const datafinal = { ...data.datasets[0].data };
      // console.log(legendname[2].toString());

      data.datasets[0].data = datagrafik;
      console.log("dataset 2 : ", data.datasets[1].data);
      data.labels = periodgrafik1;
      // data.legend[0] = "Produksi";
      // data.legend = legendname[2];
      console.log("data", data);

      setSelectedData(data);
      // datafinal.datasets[0] = datagrafik;
      // datafinal.labels = periodgrafik1;

      // console.log("data final :", datafinal);

      // setSelectedDataPeriode(periodgrafik1);
    });
  };

  const getdatagrafik6 = () => {
    const url6 = "http://182.23.53.73:1340/apiuser/v1/getdashboard6";

    fetch(url6).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const foundgrafik6 = isJson && (await response.json());
      // console.log("nama legend : ", foundgrafik[1].produksi[0]);

      if (!response.ok) {
        // get error message from body or default to response status
        // const error = (data && data.message) || response.status;
        // return Promise.reject(error);
        console.log("error getting data grafik");
        return;
      }

      // console.log("legend :", Object.keys(foundgrafik[2]));

      const count = foundgrafik6.length;
      const datagrafik6 = [];
      const periodgrafik6 = [];

      for (var i = 0; i < count; i++) {
        datagrafik6.push(foundgrafik6[i].produksi);
        periodgrafik6.push(
          monthname(foundgrafik6[i].bulan) + "-" + foundgrafik6[i].tahun
        );
      }

      console.log("data grafik", datagrafik6);
      // const datafinal = { ...data.datasets[0].data };
      // console.log(legendname[2].toString());

      data.datasets[1].data = datagrafik6;
      data.labels = periodgrafik6;
      // data.legend[0] = "Produksi";
      // data.legend = legendname[2];
      console.log("data", data);

      setSelectedData(data);
      // datafinal.datasets[0] = datagrafik;
      // datafinal.labels = periodgrafik1;

      // console.log("data final :", datafinal);

      // setSelectedDataPeriode(periodgrafik1);
    });
  };

  const getdatagrafik2 = () => {
    const url = "http://182.23.53.73:1340/apiuser/v1/getdashboard2";

    fetch(url).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const foundgrafik2 = isJson && (await response.json());

      if (!response.ok) {
        // get error message from body or default to response status
        // const error = (data && data.message) || response.status;
        // return Promise.reject(error);
        console.log("error getting data grafik");
        return;
      }

      const count = foundgrafik2.length;
      const datagrafik2 = [];
      const periodgrafik2 = [];

      for (var i = 0; i < count; i++) {
        datagrafik2.push(foundgrafik2[i].luas_tanam);
        periodgrafik2.push(
          monthname(foundgrafik2[i].bulan) + "-" + foundgrafik2[i].tahun
        );
      }

      const legendname = Object.keys(foundgrafik2[0]);

      // const count = foundgrafik2.length;
      // const datagrafik2 = [];

      // for (var i = 0; i < count; i++) {
      //   datagrafik2.push({
      //     periode: monthname(foundgrafik2[i].bulan),
      //     luastanam: foundgrafik2[i].luas_tanam,
      //   });
      // }
      data2.datasets[0].data = datagrafik2;
      data2.labels = periodgrafik2;
      data2.legend[0] = "Luas Tanam";
      // data.legend = legendname[2];
      console.log("data 2 :", data2);

      setSelectedData2(data2);

      // setSelectedData2(datagrafik2);
    });
  };

  const getdatagrafik7 = () => {
    const url = "http://182.23.53.73:1340/apiuser/v1/getdashboard7";

    fetch(url).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const foundgrafik7 = isJson && (await response.json());

      if (!response.ok) {
        // get error message from body or default to response status
        // const error = (data && data.message) || response.status;
        // return Promise.reject(error);
        console.log("error getting data grafik");
        return;
      }

      const count = foundgrafik7.length;
      const datagrafik7 = [];
      const periodgrafik7 = [];

      for (var i = 0; i < count; i++) {
        datagrafik7.push(foundgrafik7[i].luas_tanam);
        periodgrafik7.push(
          monthname(foundgrafik7[i].bulan) + "-" + foundgrafik7[i].tahun
        );
      }

      // const legendname = Object.keys(foundgrafik2[0]);

      // const count = foundgrafik2.length;
      // const datagrafik2 = [];

      // for (var i = 0; i < count; i++) {
      //   datagrafik2.push({
      //     periode: monthname(foundgrafik2[i].bulan),
      //     luastanam: foundgrafik2[i].luas_tanam,
      //   });
      // }
      data2.datasets[1].data = datagrafik7;
      data2.labels = periodgrafik7;
      data2.legend[0] = "Luas Tanam";
      // data.legend = legendname[2];
      // console.log("data 2 :", data2);

      setSelectedData2(data2);

      // setSelectedData2(datagrafik2);
    });
  };

  const getdatagrafik3 = () => {
    const url = "http://182.23.53.73:1340/apiuser/v1/getdashboard5";

    fetch(url).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const foundgrafik3 = isJson && (await response.json());

      if (!response.ok) {
        // get error message from body or default to response status
        // const error = (data && data.message) || response.status;
        // return Promise.reject(error);
        console.log("error getting data grafik");
        return;
      }

      console.log("call API 3 :", foundgrafik3);

      const count = foundgrafik3.length;
      const datagrafik3 = [];
      const periodgrafik3 = [];

      for (var i = 0; i < count; i++) {
        datagrafik3.push(foundgrafik3[i].yield);
        periodgrafik3.push(
          monthname(foundgrafik3[i].bulan) + "-" + foundgrafik3[i].tahun
        );
      }

      const legendname = Object.keys(foundgrafik3[0]);

      // const count = foundgrafik2.length;
      // const datagrafik2 = [];

      // for (var i = 0; i < count; i++) {
      //   datagrafik2.push({
      //     periode: monthname(foundgrafik2[i].bulan),
      //     luastanam: foundgrafik2[i].luas_tanam,
      //   });
      // }
      // console.log("data API 3 :", foundgrafik3);
      data3.datasets[0].data = datagrafik3;
      data3.labels = periodgrafik3;
      // data3.legend[0] = "Yield";
      // data.legend = legendname[2];
      console.log("data 3 :", data3);

      setSelectedData3(data3);

      // setSelectedData2(datagrafik2);
    });
  };

  const getdatagrafik8 = () => {
    const url = "http://182.23.53.73:1340/apiuser/v1/getdashboard8";

    fetch(url).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const foundgrafik8 = isJson && (await response.json());

      if (!response.ok) {
        // get error message from body or default to response status
        // const error = (data && data.message) || response.status;
        // return Promise.reject(error);
        console.log("error getting data grafik");
        return;
      }

      // console.log("call API 3 :", foundgrafik3);

      const count = foundgrafik8.length;
      const datagrafik8 = [];
      const periodgrafik8 = [];

      for (var i = 0; i < count; i++) {
        datagrafik8.push(foundgrafik8[i].yield);
        periodgrafik8.push(
          monthname(foundgrafik8[i].bulan) + "-" + foundgrafik8[i].tahun
        );
      }

      // const legendname = Object.keys(foundgrafik3[0]);

      // const count = foundgrafik2.length;
      // const datagrafik2 = [];

      // for (var i = 0; i < count; i++) {
      //   datagrafik2.push({
      //     periode: monthname(foundgrafik2[i].bulan),
      //     luastanam: foundgrafik2[i].luas_tanam,
      //   });
      // }
      // console.log("data API 3 :", foundgrafik3);
      data3.datasets[1].data = datagrafik8;
      data3.labels = periodgrafik8;
      // data3.legend[0] = "Yield";
      // data.legend = legendname[2];
      // console.log("data 3 :", data3);

      setSelectedData3(data3);

      // setSelectedData2(datagrafik2);
    });
  };

  const getdatacurrent = () => {
    const url = "http://182.23.53.73:1340/apiuser/v1/getdashboard3";

    fetch(url).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const foundcurrent = isJson && (await response.json());

      if (!response.ok) {
        // get error message from body or default to response status
        // const error = (data && data.message) || response.status;
        // return Promise.reject(error);
        console.log("error getting data grafik");
        return;
      }
      console.log("data bawah : ", foundcurrent);
      const count = foundcurrent.length;
      const foundcurrentdata = [];

      for (var i = 0; i < count; i++) {
        foundcurrentdata.push({
          namakab: foundcurrent[i].nama_kab,
          namaprov: foundcurrent[i].nama_prov,
          produksi: foundcurrent[i].produksi,
          luastanam: foundcurrent[i].luas_tanam,
          yield: foundcurrent[i].yield,
        });
      }
      setCurrentMonth(foundcurrentdata);
    });
  };

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{ height: 30, marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {numberOfCharts.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp",
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderChart() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          alignItems: "center",
          borderRadius: SIZES.radius,
          backgroundColor: "white",
          ...styles.shadow,
        }}
      >
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          snapToInterval={SIZES.width - 40}
          showsHorizontalScrollIndicator={true}
          decelerationRate={0}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {numberOfCharts.map((item, index) => (
            <View
              tes={console.log(index)}
              key={`chart-${index}`}
              style={{
                marginLeft: index == 0 ? SIZES.base : 0,
              }}
            >
              <View
                style={{
                  marginTop: 20,
                }}
              >
                <LineChart
                  // tes={console.log(`${index}`)}
                  data={
                    `${index}` == 0
                      ? selectedData
                      : `${index}` == 1
                      ? selectedData2
                      : selectedData3
                  }
                  width={screenWidth - 40}
                  height={180}
                  yAxisSuffix={
                    `${index}` == 0 ? " Ton" : `${index}` == 1 ? " H" : ""
                  }
                  fontSize={8}
                  bezier
                  chartConfig={{
                    propsForLabels: { fontSize: 9 },
                    backgroundColor: "#8D0101",
                    backgroundGradientFrom: "#183086",
                    backgroundGradientTo: "#183086",
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 255) => "#ECEFF1",
                  }}
                  // yAxisLabel={"$ - "}
                  style={{ marginLeft: 4, marginRight: 5, borderRadius: 7 }}
                />
              </View>
            </View>
          ))}
        </Animated.ScrollView>
        {renderDots()}
      </View>
    );
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        width: 200,
        paddingVertical: SIZES.font,
        paddingHorizontal: SIZES.font,
        marginLeft: index == 0 ? SIZES.padding : 0,
        marginRight: SIZES.radius,
        borderRadius: 10,
        backgroundColor: COLORS.white,
      }}
      onPress={() => console.log(currentMonth)}
    >
      {/* Currency */}
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginLeft: SIZES.base }}>
          <Text style={{ ...FONTS.h2 }}>{item.namaprov}</Text>
          <Text style={{ ...FONTS.h3 }}>Kabupaten: {item.namakab}</Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
            Est Luas Tanam : {"\n"} {item.luastanam} Hektar
          </Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
            Est Produksi : {"\n"} {item.produksi} Ton
          </Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
            Avg Yield : {"\n"} {item.yield}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightGray1,
        paddingVertical: 40,
      }}
    >
      <StatusBar style="dark" />
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          DASHBOARD PREDIKSI PANEN
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingBottom: SIZES.font,
            backgroundColor: COLORS.white,
          }}
        >
          {renderChart()}
        </View>
        <View>
          <Text
            style={{
              marginLeft: SIZES.padding,
              color: COLORS.black,
              ...FONTS.h2,
            }}
          >
            Year To Date Prediksi Panen
          </Text>
          <FlatList
            contentContainerStyle={{ marginTop: SIZES.radius }}
            data={currentMonth}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.namaprov} + ${item.namakab} `}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
