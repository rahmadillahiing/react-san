import React, { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import DataItem from "../components/DataItem";
import Gap from "../components/Gap";
import DropDownPicker from "react-native-dropdown-picker";
// import HomeProfile from '../components/HomeProfile';
import { colors } from "../utils/Colors";
import Button from "../components/Button";
import GetDataLocal from "../utils/GetDataLocal";
import { Octicons } from "@expo/vector-icons";
import { Card, Title, Paragraph } from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import Grafik from "../components/Grafik";
import AsyncStorage from "@react-native-async-storage/async-storage";

//context
import { CredentialsContext } from "../components/CredentialContext";

const DashboardScreen = ({ navigation }) => {
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [openProvince, setOpenProvince] = useState(false);
  const [valueProvince, setValueProvince] = useState(null);
  const [dataKabupaten, setDataKabupaten] = useState([]);
  const [valueKabupaten, setValueKabupaten] = useState(null);
  const [openKabupaten, setOpenKabupaten] = useState(false);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [valueKecamatan, setValueKecamatan] = useState(null);
  const [openKecamatan, setOpenKecamatan] = useState(false);

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [textFrom, setTextFrom] = useState("");
  const [textTo, setTextTo] = useState("");

  const [dataTab, setDataTab] = useState(1);
  const [data, setData] = useState(null);

  const [profile, setProfile] = useState({
    fullname: "",
    token: "",
    id: "",
  });

  useEffect(() => {
    getUser();
    getProvinsi();
  }, []);

  const showDatePickerFrom = () => {
    setShowFrom("date");
  };

  const cariData = () => {
    setData(null);
    const tglarrayFrom = textFrom.split("/");
    const tglarrayTo = textTo.split("/");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_kecamatan: valueKecamatan,
        id_kabupaten: valueKabupaten,
        id_provinsi: valueProvince,
        tahun1: tglarrayFrom[2],
        bulan1: tglarrayFrom[1],
        tahun2: tglarrayTo[2],
        bulan2: tglarrayTo[1],
      }),
    };
    console.log(requestOptions);
    const url = "http://182.23.53.73:1340/apiuser/v1/reportsurvey";
    fetch(url, requestOptions).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const hasil = isJson && (await response.json());

      if (!response.ok) {
        // get error message from body or default to response status
        // const error = (data && data.message) || response.status;
        // return Promise.reject(error);
        Alert.alert("Invalid Data", "please check the data", [
          { text: "Okay" },
        ]);
        return;
      } else {
        console.log("hasil render :", hasil);
        // setData(renderHasil);
        // console.log("data :", data);
        navigation.navigate("History", hasil);
      }
    });
  };

  const showDatePickerTo = () => {
    setShowTo("date");
  };

  const onChangeFrom = (event, selectedDate) => {
    if (event.type == "dismissed") {
      setShowFrom(false);
      return null;
    } else {
      const currentDateFrom = selectedDate || dateFrom;
      setShowFrom(Platform.OS === "ios");
      setDateFrom(currentDateFrom);

      // console.log("Event :",event);
      console.log("select date From :", currentDateFrom);
      let tempDate = new Date(currentDateFrom);
      let fDate =
        tempDate.getDate() +
        "/" +
        (tempDate.getMonth() + 1) +
        "/" +
        tempDate.getFullYear();
      setTextFrom(fDate);
    }
  };

  const onChangeTo = (event, selectedDate) => {
    if (event.type == "dismissed") {
      setShowTo(false);
      return null;
    } else {
      const currentDateTo = selectedDate || dateTo;
      setShowTo(Platform.OS === "ios");
      setDateTo(currentDateTo);

      // console.log("Event :",event);
      console.log("select date To :", currentDateTo);
      let tempDate = new Date(currentDateTo);
      let fDate =
        tempDate.getDate() +
        "/" +
        (tempDate.getMonth() + 1) +
        "/" +
        tempDate.getFullYear();
      setTextTo(fDate);
    }
  };

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const getKabupaten = (value) => {
    const url = `http://182.23.53.73:1340/getkabupaten/${valueProvince}`;

    console.log("masuk kabupaten, provinsi yang dipilih  :", value);
    // alert((value));
    fetch(url).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const foundKabupten = isJson && (await response.json());

      if (!response.ok) {
        // get error message from body or default to response status
        // const error = (data && data.message) || response.status;
        // return Promise.reject(error);
        console.log("error kabupaten");
        return;
      }

      // console.log("tes",JSON.stringify(foundProvince));
      // console.log("hitung",foundProvince.length);

      const count = foundKabupten.length;
      const dataKabupaten = [];
      for (var i = 0; i < count; i++) {
        dataKabupaten.push({
          label: foundKabupten[i].nama_kab.toString(),
          value: foundKabupten[i].id,
        });
      }
      // console.log("dataprov",dataProv);
      setDataKabupaten(dataKabupaten);
    });
  };

  const getKecamatan = (value) => {
    const url = `http://182.23.53.73:1340/getkecamatan/${valueKabupaten}`;

    // console.log("kabupaten selected :",value);
    // alert((value));
    fetch(url).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const foundKecamatan = isJson && (await response.json());

      if (!response.ok) {
        // get error message from body or default to response status
        // const error = (data && data.message) || response.status;
        // return Promise.reject(error);
        console.log("error kecamatan");
        return;
      }

      // console.log("tes",JSON.stringify(foundProvince));
      // console.log("hitung",foundProvince.length);

      const count = foundKecamatan.length;
      const dataKecamatan = [];
      for (var i = 0; i < count; i++) {
        dataKecamatan.push({
          label: foundKecamatan[i].nama_kec.toString(),
          value: foundKecamatan[i].id,
        });
      }
      // console.log("dataprov",dataProv);
      setDataKecamatan(dataKecamatan);
    });
  };

  const getProvinsi = () => {
    const url = "http://182.23.53.73:1340/getprovinsi";

    fetch(url).then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const foundProvince = isJson && (await response.json());

      if (!response.ok) {
        // get error message from body or default to response status
        // const error = (data && data.message) || response.status;
        // return Promise.reject(error);
        console.log("error provinsi");
        return;
      }

      // console.log("tes",JSON.stringify(foundProvince));
      // console.log("hitung",foundProvince.length);

      const count = foundProvince.length;
      const dataProv = [];
      for (var i = 0; i < count; i++) {
        dataProv.push({
          label: foundProvince[i].nama_prov.toString(),
          value: foundProvince[i].id,
        });
      }
      // console.log("dataprov",dataProv);
      setDataProvinsi(dataProv);
    });
  };

  const getUser = () => {
    // const getuser2 = JSON.parse(storedCredentials);

    // // const getuser2 = JSON.parse(storedCredentials);
    // console.log("json",getuser2)
    // console.log("username", getuser2.fullname);

    // const obj = JSON.parse(getuser2);
    // console.log("username", obj.fullname);

    GetDataLocal("user").then((res) => {
      const data = res;
      setProfile(data);
    });
  };

  const onSelectSwitch = (value) => {
    setDataTab(value);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20 }}>
        <View
          style={{ marginVertical: 15, alignItems: "center", marginTop: 30 }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Survey Data</Text>
        </View>

        <View style={styles.dropdowncontainer}>
          <Text style={[styles.label, { padding: 10, right: 10 }]}>
            Provinsi
          </Text>
          <View style={styles.dropdownstyle}>
            <DropDownPicker
              listMode="MODAL"
              open={openProvince}
              // style={styles.input}
              value={valueProvince}
              items={dataProvinsi}
              setOpen={setOpenProvince}
              setValue={setValueProvince}
              setItems={setDataProvinsi}
              // placeholderStyle={{ fontFamily: "Roboto_500Medium" }}
              placeholder="Pilih Provinsi"
              defaultValue={dataProvinsi}
              zIndex={10}
              onChangeValue={(value, label) => {
                setValueKabupaten(null);
                setValueKecamatan(null);
                console.log("data :::", label);
                if (value !== null) {
                  getKabupaten(valueProvince);
                  getKecamatan(valueKabupaten);
                }
              }}
            />
          </View>
        </View>
        <Gap height={5} />
        <View style={styles.dropdowncontainer}>
          <Text style={styles.label}>Kabupaten</Text>
          <View style={styles.dropdownstyle}>
            <DropDownPicker
              listMode="MODAL"
              open={openKabupaten}
              value={valueKabupaten}
              items={dataKabupaten}
              setOpen={setOpenKabupaten}
              setValue={setValueKabupaten}
              setItems={setDataKabupaten}
              // placeholderStyle={{ fontFamily: "Roboto_500Medium" }}
              placeholder="Pilih Kabupaten"
              defaultValue={dataKabupaten}
              zIndex={9}
              onChangeValue={(valueKabupaten) => {
                console.log("selected Kabupaten:", valueKabupaten);
                if (valueKabupaten !== null) {
                  getKecamatan(valueKabupaten);
                }
              }}
            />
          </View>
        </View>
        <Gap height={5} />
        <View style={styles.dropdowncontainer}>
          <Text style={styles.label}>Kecamatan</Text>
          <View style={styles.dropdownstyle}>
            <DropDownPicker
              listMode="MODAL"
              open={openKecamatan}
              value={valueKecamatan}
              items={dataKecamatan}
              setOpen={setOpenKecamatan}
              setValue={setValueKecamatan}
              setItems={setDataKecamatan}
              // placeholderStyle={{ fontFamily: "Roboto_500Medium" }}
              placeholder="Pilih Kecamatan"
              defaultValue={dataKecamatan}
              zIndex={8}
            />
          </View>
        </View>
        <Gap height={10} />
        {showFrom && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateFrom}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeFrom}
          />
        )}

        {showTo && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateTo}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeTo}
          />
        )}

        <View>
          <Text style={styles.label}>Periode</Text>
        </View>
        <Gap height={5} />
        <View style={styles.dropdowncontainer}>
          <TouchableOpacity
            style={{
              right: 20,
              position: "relative",
              zIndex: 1,
              marginTop: 38,
            }}
            onPress={showDatePickerFrom}
          >
            {/* <Octicons name="calendar" size={30} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={showDatePickerFrom}>
            <TextInput
              style={styles.text}
              editable={false}
              isDate={true}
              value={dateFrom ? dateFrom.toDateString() : ""}
              showDatePicker={showDatePickerFrom}
            />
          </TouchableOpacity>
          <Text style={styles.label}>S/D</Text>
          <TouchableOpacity
            style={{
              right: 20,
              position: "relative",
              zIndex: 2,
              marginTop: 38,
            }}
            onPress={showDatePickerTo}
          >
            {/* <Octicons name="calendar" size={30} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={showDatePickerTo}>
            <TextInput
              style={styles.text}
              editable={false}
              isDate={true}
              value={dateTo ? dateTo.toDateString() : ""}
              showDatePicker={showDatePickerTo}
            />
          </TouchableOpacity>
          <Gap height={10} />
        </View>
        <Gap height={10} />
        <Button title="Proses" onPress={cariData} />
        <Gap height={10} />
      </ScrollView>

      {/* <View style={{ marginVertical: 20 }}>
        <CustomSwitch
          selectionMode={1}
          option1="Data Survey"
          option2="Grafik"
          onSelectSwitch={onSelectSwitch}
        />
      </View>

      {
        dataTab == 1 && data !== null && (
          <FlatList
            data={data}
            renderItem={({ item }) => <ListCard dataList={item} />}
            keyExtractor={(data, index) => index.toString()}
          />
        )
        // data.map((item) => (
        //   <ListItem
        //     key={item.tahun + item.bulan}
        //     // photo={item.poster}
        //     tahun={item.tahun}
        //     bulan={item.bulan}
        //     title={item.estimasi_luas_tanam}
        //     subTitle={item.produksi}
        //   />
        // ))
      } */}

      {/* {dataTab == 2 && (
        // paidGames.map((item) => (
        //   <ListItem
        //     key={item.id}
        //     photo={item.poster}
        //     title={item.title}
        //     subTitle={item.subtitle}
        //     isFree={item.isFree}
        //     price={item.price}
        //   />
        // ))
        <Grafik />
      )} */}
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  page: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: colors.white,
  },
  header1: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  container: {
    marginTop: 10,
    flexDirection: "row",
    flex: 1,
    borderBottomColor: "green",
    borderBottomWidth: 1,
  },
  avatar: {
    // height: 46,
    // width: 46,
    // borderRadius: 46 / 2,
    // marginRight:12,
    width: 50,
    height: 50,
    margin: "auto",
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
  },
  nameview: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdowncontainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownstyle: {
    marginLeft: 10,
    marginRight: 30,
    flex: 1,
    marginTop: 10,
  },
  text: {
    borderWidth: 1,
    padding: 12,
    borderColor: colors.border,
    borderRadius: 10,
    // fontFamily: "Roboto_500Medium",
  },
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontWeight: "500",
    // fontFamily: "Roboto_500Medium",
  },
});
