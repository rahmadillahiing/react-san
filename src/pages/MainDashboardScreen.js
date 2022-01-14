import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
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
        color: (opacity = 1) => "#ECEFF1", // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Produksi"],
  });

  const [selectedDataPeriode, setSelectedDataPeriode] = useState([]);
  const [selectedData2, setSelectedData2] = useState({
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        data: [10, 30, 40, 40, 50, 45],
        color: (opacity = 1) => "#ECEFF1", // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Luas Tanam"],
  });
  const [currentMonth, setCurrentMonth] = useState([]);

  const scrollX = new Animated.Value(0);
  const numberOfCharts = [1, 2];

  useEffect(() => {
    getdatagrafik1();
    getdatagrafik2();
    getdatacurrent();
    // console.log("data dipilih :", selectedData);
  }, []);

  const monthname = (bulan) => {
    return [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
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
        data: [10, 20, 15, 40, 50, 45],
        color: (opacity = 1) => "#ECEFF1", // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Produksi"],
  };

  const data2 = {
    labels: ["Jan", "Feb", "March", "April", "May", "June"],
    datasets: [
      {
        data: [10, 20, 15, 40, 50, 45],
        color: (opacity = 1) => "#ECEFF1", // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Luas Tanam"],
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
        periodgrafik1.push(monthname(foundgrafik[i].bulan));
      }

      const legendname = Object.keys(foundgrafik[0]);

      // for (var i = 0; i < datagrafik.length; i++) {
      //   periodgrafik1.push(foundgrafik[i].periode);
      // }
      // const datafinal = {
      //   labels: periodgrafik1,
      //   datasets: [
      //     {
      //       data: datagrafik,
      //       // color: (opacity = 1) => "#ECEFF1", // optional
      //       // strokeWidth: 2, // optional
      //     },
      //   ],
      //   // legend: "produksi",
      // };

      console.log("data grafik", datagrafik);
      // const datafinal = { ...data.datasets[0].data };
      console.log(legendname[2].toString());

      data.datasets[0].data = datagrafik;
      data.labels = periodgrafik1;
      data.legend[0] = "Produksi";
      // data.legend = legendname[2];
      // console.log(data);

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
        periodgrafik2.push(monthname(foundgrafik2[i].bulan));
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
      // console.log("data 2 :", data);

      setSelectedData2(data2);

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

      const count = foundcurrent.length;
      const foundcurrentdata = [];

      for (var i = 0; i < count; i++) {
        foundcurrentdata.push({
          namaprov: foundcurrent[i].nama_prov,
          produksi: foundcurrent[i].produksi,
          luastanam: foundcurrent[i].luas_tanam,
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
                  data={`${index}` == 0 ? selectedData : selectedData2}
                  width={screenWidth - 40}
                  height={180}
                  chartConfig={{
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#183086",
                    backgroundGradientTo: "#183086",
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 255) => "#ECEFF1",
                  }}
                  // yAxisLabel={"$ - "}
                  style={{ marginLeft: 5, marginRight: 5, borderRadius: 7 }}
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
        width: 180,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding,
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
          <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
            Luas Tanam : {item.luastanam} Hektar
          </Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
            Produksi : {item.produksi} Ton
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
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>DASHBOARD</Text>
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingBottom: SIZES.padding,
            backgroundColor: COLORS.white,
          }}
        >
          {renderChart()}
        </View>
        <View style>
          <Text
            style={{
              marginLeft: SIZES.padding,
              color: COLORS.black,
              ...FONTS.h2,
            }}
          >
            Data Bulan Berjalan
          </Text>
          <FlatList
            contentContainerStyle={{ marginTop: SIZES.base }}
            data={currentMonth}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.namaprov}`}
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
