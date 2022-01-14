import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { COLORS, SIZES, FONTS, icons } from "../constants";
import ListCard from "./ListCard";

const SurveyHistory = ({ customContainerStyle, history }) => {
  //   const [data, setData] = useState(null);

  //   useEffect(() => {
  //     setData(history);
  //   });

  return (
    <View
      style={{
        marginTop: 10,
        marginHorizontal: SIZES.padding,
        padding: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...customContainerStyle,
      }}
    >
      <Text style={{ ...FONTS.h2 }}>Survey History</Text>
      <SafeAreaView>
        <FlatList
          contentContainerStyle={{ marginTop: SIZES.radius }}
          scrollEnabled={true}
          data={history}
          keyExtractor={(item) => `${item.tahun}+${item.bulan}`}
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
      </SafeAreaView>
    </View>
  );
};

export default SurveyHistory;
