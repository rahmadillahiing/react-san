import React, { useState, useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
//async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//context
import { CredentialsContext } from "../components/CredentialContext";

//connection API
import axios from "axios";

import Button from "../components/Button";
import Gap from "../components/Gap";
import Input from "../components/Input";
import { colors } from "../utils/Colors";
import { useForm } from "../utils/UseForm";
import Loading from "../components/Loading";
import storeData from "../utils/StoreDataLocal";
import getData from "../utils/GetDataLocal";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    username: "",
    password: "",
  });

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const login = () => {
    setLoading(true);
    console.log("form :", form);
    const url = "http://182.23.53.73:1340/loginuser";

    axios
      .post(url, form)
      .then((response) => {
        console.log(response.status);
        const status = response.status;
        const result = response.data;
        console.log("response :", result);
        const message = "SUCCESS";
        setLoading(false);
        if (status !== 200) {
          console.log("masuk sini");
          alert("An error has occured. Check your connection and try again");
          // handleMessage(message, status);
        } else {
          console.log("sukses");
          const data = {
            fullname: result.fullname,
            token: result.token,
            id: result.id,
          };
          persistLogin({ ...data }, message, status);
          navigation.navigate("MainApp");
        }
      })
      .catch((err) => {
        console.log("error :", err.response.status);
        setLoading(false);
        if (err.response.status == 500) {
          // handleMessage("Wrong username or password");
          showMessage({
            message: "Wrong Username or password",
            type: "default",
            backgroundColor: colors.error,
            color: colors.white,
          });
          alert("Wrong username or password");

          // setSubmitting(false);
        } else {
          // handleMessage("An error has occured. Check your connection and try again");
          alert("An error has occured. Check your connection and try again");
          // setSubmitting(false);
        }
      });
  };

  // const handleMessage = (message,type= 'FAILED') =>{
  //     setMessage(message);
  //     setMessageType(type);
  // }

  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem("user", JSON.stringify(credentials))
      .then(() => {
        console.log("persist Login :", credentials);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    getData("user").then((res) => {
      const data = res;
      //   console.log("fetch data :",data.fullname)
    });
  };

  return (
    <>
      <View style={styles.page}>
        <StatusBar style="dark" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <Image
            style={{ marginTop: 30 }}
            source={require("../../assets/ilustration/logosmall.png")}
          />
          <Text style={styles.title}>Masuk dan mulai survey</Text>
          <Input
            label="Username"
            value={form.username}
            onChangeText={(value) => setForm("username", value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(value) => setForm("password", value)}
            secureTextEntry
          />
          <Gap height={40} />
          <View>
            <Button title="Sign In" onPress={login} />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153,
  },
});
