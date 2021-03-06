import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SIZES, FONTS, COLORS, icons } from "../constants";

const ListCard = ({ dataList }) => {
  const {
    tahun,
    bulan,
    estimasi_luas_tanam,
    produksi,
    nama_kec,
    nama_kab,
    is_final,
  } = dataList;

  const monthname = (bulan) => {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][bulan - 1];
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SIZES.base,
      }}
      onPress={() => console.log(dataList)}
    >
      <View style={{ flex: 1, marginLeft: SIZES.font }}>
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
          Periode : {monthname(bulan)} {tahun}
        </Text>
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
          Kabupaten : {nama_kab}
        </Text>
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
          Kecamatan : {nama_kec}
        </Text>
        <Text style={{ ...FONTS.h3 }}>
          Est Luas Tanam : {estimasi_luas_tanam} Hektar
        </Text>
        <Text style={{ ...FONTS.h3 }}>Est Produksi : {produksi} Ton</Text>
        <Text style={{ ...FONTS.h3 }}>Avg Yield : {dataList.yield} </Text>
      </View>

      <View
        style={{ flexDirection: "row", height: "100%", alignItems: "center" }}
      >
        <Image
          source={is_final == 1 ? icons.green_checklist : icons.right_arrow}
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.gray,
          }}
        />
      </View>
    </TouchableOpacity>

    // <View style={styles.coinContainer}>
    //   <View>
    //     <Text style={styles.title}>Tahun : {tahun}</Text>
    //     <Text style={styles.title}>Bulan : {monthname(bulan)}</Text>

    //     <View style={{ flexDirection: "row" }}>
    //       <View style={styles.title}>
    //         <Text style={styles.rank}>
    //           Estimasi Luas Tanam : {estimasi_luas_tanam} Hektar
    //         </Text>
    //         <Text style={styles.rank}>Produksi : {produksi} Ton</Text>
    //       </View>
    //     </View>
    //   </View>
    // </View>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    color: "black",
    marginRight: 5,
  },
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#282828",
    padding: 15,
  },
  rank: {
    fontWeight: "bold",
    color: "black",
  },
  rankContainer: {
    backgroundColor: "#585858",
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 5,
  },
});
