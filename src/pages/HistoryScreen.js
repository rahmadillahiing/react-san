import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import HeaderBar from "../components/HeaderBar";
import { StatusBar } from "expo-status-bar";
import { COLORS, SIZES, FONTS } from "../constants";

import SurveyHistory from "../components/SurveyHistory";

const HistoryScreen = ({ navigation, route }) => {
  const [selectData, setSelectData] = useState(route.params);

  function renderItem() {
    // console.log("selectdata :", selectData);
    return (
      <SurveyHistory
        customContainerStyle={{ ...styles.shadow }}
        history={selectData}
      />
    );
  }

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <StatusBar style="dark" />
      <View style={{ marginTop: 40, marginLeft: 40 }}>
        <HeaderBar />
      </View>

      <View
        style={{
          flex: 1,
          paddingBottom: 130,
          marginTop: 20,
          marginLeft: 5,
        }}
      >
        {renderItem()}
      </View>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
});
