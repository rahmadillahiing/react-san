import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../components/Button";
import Gap from "../components/Gap";
import Header from "../components/Header";
import Input from "../components/Input";
import { colors } from "../utils/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Octicons } from "@expo/vector-icons";
import { useForm } from "../utils/UseForm";

//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//context
import { CredentialsContext } from "../components/CredentialContext";

// const data = [
//     {
//       "label": "Apple",
//       "value": "Apel"
//     },
//     {
//         "label": "Banana",
//         "value": "Pisang"
//     }
// ]
// const data =[{"label":"Gorontalo","value":2},{"label":"Jawa Tengah","value":9},{"label":"Jawa Timur","value":7},{"label":"Lampung","value":5},{"label":"Lampung","value":8},{"label":"Nusa Tenggara Barat","value":1},{"label":"Sulawesi Selatan","value":4},{"label":"Sulawesi Tengah","value":3},{"label":"Sumatera Utara","value":6}]

const InputSurveyScreen = ({ navigation }) => {
  const [storedCredentials, setStoredCredentials] = useState();

  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [openProvince, setOpenProvince] = useState(false);
  const [valueProvince, setValueProvince] = useState(null);
  const [dataKabupaten, setDataKabupaten] = useState([]);
  const [valueKabupaten, setValueKabupaten] = useState(null);
  const [openKabupaten, setOpenKabupaten] = useState(false);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [valueKecamatan, setValueKecamatan] = useState(null);
  const [openKecamatan, setOpenKecamatan] = useState(false);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const [form, setForm] = useForm({
    luastanam: "",
    yield: "",
    produksi: "",
  });

  const [count, setCount] = useState("");
  const [focusedInput, setFocus] = useState(null);

  useEffect(() => {
    console.log("luas Tanam :", form.luastanam);
    console.log("isnan luas tanam", isNaN(form.luastanam.toString()));
    console.log("yield :", form.yield);
    console.log("isnan yield :", isNaN(form.yield));

    if (form.luastanam === "" || form.yield === "") setCount("");
    if (form.luastanam && form.yield) setCount(form.luastanam * form.yield);
  }, [form.luastanam, form.yield]);
  console.log("Produksi :", count);

  useEffect(() => {
    getProvinsi();
    checkLoginCredentials();
  }, []);

  const clearCombo = () => {
    setDataProvinsi([]);
    setDataKabupaten([]);
    setDataKecamatan([]);
    setValueProvince(null);
    setValueKabupaten(null);
    setValueKecamatan(null);

    getProvinsi();
    // getKabupaten(0)
    // getKecamatan(0)
    setForm("reset");
  };

  const showDatePicker = () => {
    setShow("date");
  };

  const onChange = (event, selectedDate) => {
    if (event.type == "dismissed") {
      setShow(false);
      return null;
    } else {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === "ios");
      setDate(currentDate);

      // console.log("Event :",event);
      console.log("select date :", selectedDate);
      let tempDate = new Date(currentDate);
      let fDate =
        tempDate.getDate() +
        "/" +
        (tempDate.getMonth() + 1) +
        "/" +
        tempDate.getFullYear();
      setText(fDate);
    }
  };

  const checkLoginCredentials = () => {
    AsyncStorage.getItem("user")
      .then((result) => {
        console.log("context :", result);
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };

  const simpanSurvey = () => {
    // console.log("selected Province:", valueProvince)
    // console.log("selected Kabupaten:", valueKabupaten)
    // console.log("selected Kecamatan:", valueKecamatan)
    const tglarray = text.split("/");
    // console.log("datepicker :", tglarray[2])
    // console.log("credential :", storedCredentials.token)

    // clearCombo

    // console.log("value :", requestOptions)

    // setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_kecamatan: valueKecamatan,
        tahun: tglarray[2],
        bulan: tglarray[1],
        estimasi_luas_tanam: form.luastanam,
        yield: form.yield,
        produksi: count,
        is_active: 1,
        surveyor_id: storedCredentials.id,
      }),
    };
    console.log("data", requestOptions);
    const url = "http://182.23.53.73:1340/apiuser/v1/createsurvey";
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
        clearCombo();
        Alert.alert("Data succesfully saved", "", [{ text: "Okay" }]);
      }
    });
  };
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
        console.log("error");
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
        console.log("error");
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
        console.log("error");
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

  //    console.log(data);

  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title="Input data survey" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <Text style={styles.label}>Periode</Text>
        <TouchableOpacity
          style={{ right: 30, position: "absolute", zIndex: 1, marginTop: 38 }}
          onPress={showDatePicker}
        >
          <Octicons name="calendar" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            style={styles.text}
            editable={false}
            isDate={true}
            value={date ? date.toDateString() : ""}
            showDatePicker={showDatePicker}
          />
        </TouchableOpacity>

        {/* <DatePickerApp title="Pilih periode" /> */}
        {/* <View>
                    <Button onPress={showDatepicker} title="Show date picker!" />
                </View>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )} */}
        <Gap height={5} />
        <Text style={styles.label}>Provinsi</Text>
        <DropDownPicker
          listMode="MODAL"
          open={openProvince}
          style={styles.input}
          value={valueProvince}
          items={dataProvinsi}
          setOpen={setOpenProvince}
          setValue={setValueProvince}
          setItems={setDataProvinsi}
          placeholder="Pilih Provinsi"
          defaultValue={dataProvinsi}
          zIndex={10}
          onChangeValue={(value) => {
            setValueKabupaten(null);
            setValueKecamatan(null);
            if (value !== null) {
              getKabupaten(valueProvince);
              getKecamatan(valueKabupaten);
            }
          }}
        />
        <Gap height={5} />
        <Text style={styles.label}>Kabupaten</Text>
        <DropDownPicker
          listMode="MODAL"
          open={openKabupaten}
          style={styles.input}
          value={valueKabupaten}
          items={dataKabupaten}
          setOpen={setOpenKabupaten}
          setValue={setValueKabupaten}
          setItems={setDataKabupaten}
          placeholder="Pilih Kabupaten"
          defaultValue={dataKabupaten}
          zIndex={9}
          onChangeValue={(valueKabupaten) => {
            // console.log("selected Kabupaten:", valueKabupaten)
            if (valueKabupaten !== null) {
              getKecamatan(valueKabupaten);
            }
          }}
        />
        <Gap height={5} />
        <Text style={styles.label}>Kecamatan</Text>
        <DropDownPicker
          listMode="MODAL"
          open={openKecamatan}
          style={styles.input}
          value={valueKecamatan}
          items={dataKecamatan}
          setOpen={setOpenKecamatan}
          setValue={setValueKecamatan}
          setItems={setDataKecamatan}
          placeholder="Pilih Kecamatan"
          defaultValue={dataKecamatan}
          zIndex={8}
          // onChangeValue={(valueKecamatan) => {
          //     console.log("selected Kecamatan:", valueKecamatan)
          //     if(valueKecamatan !==null ) {
          //         getKecamatan(valueKabupaten);
          //     }
          // }}
        />

        {/* <ComboBox label="Provinsi" data={dataProvinsi} zIndex={10} onChangeValue={getKabupaten} /> */}
        <Gap height={10} />
        {/* <ComboBoxKabupaten label="Kabupaten" data={dataKabupaten} zIndex={9} onChangeValue={getKecamatan} />
                <Gap height={10} />
                <ComboBoxKecamatan label="Kecamatan " data={dataKecamatan} zIndex={8} />
                <Gap height={10} /> */}
        <Input
          label="Estimasi luas tanam"
          keyboardType="numeric"
          value={form.luastanam}
          onChangeText={(value) => setForm("luastanam", value)}
        />
        <Gap height={5} />
        <Input
          label="Yield"
          keyboardType="numeric"
          value={form.yield}
          onChangeText={(value) => setForm("yield", value)}
        />
        <Gap height={5} />
        {/* <Input
          label="Produksi"
          keyboardType="numeric"
          value={count}
          disable={true}
          //   onChangeText={(value) => setForm("produksi", value)}
        /> */}
        <Text style={styles.label} label="Produksi" value={count}>
          Produksi: {count}
        </Text>
        <Gap height={10} />
        <Button title="Simpan" onPress={simpanSurvey} />
        <Gap height={10} />
      </ScrollView>
    </View>
  );
};

export default InputSurveyScreen;

const styles = StyleSheet.create({
  page: {
    paddingVertical: 30,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderColor: colors.border,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontWeight: "500",
  },
  text: {
    borderWidth: 1,
    padding: 12,
    borderColor: colors.border,
    borderRadius: 10,
  },
});
