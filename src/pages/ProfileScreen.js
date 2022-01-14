import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
// Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// credentials context
import { CredentialsContext } from "./../components/CredentialContext";

import GetDataLocal from "../utils/GetDataLocal";
import Button from "../components/Button";

const ProfileScreen = ({ navigation }) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const [profile, setProfile] = useState({
    fullname: "",
    token: "",
    id: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  const clearLogin = () => {
    AsyncStorage.removeItem("user")
      .then(() => {
        setStoredCredentials("");
        navigation.navigate("Login");
      })
      .catch((error) => console.log(error));
  };

  const getUser = () => {
    GetDataLocal("user").then((res) => {
      const data = res;
      console.log(res);
      setProfile(data);
    });
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Image
          style={styles.picture}
          resizeMode="center"
          source={require("./../../assets/icons/corn.png")}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.title} welcome={true}>
            Welcome
          </Text>
          <Text style={styles.text} welcome={true}>
            {profile?.fullname || "test"}
          </Text>
          <Button title="Sign Out" onPress={clearLogin} />
        </View>
        {/* <WelcomeContainer>
          <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
          <SubTitle welcome={true}>{fullname || "Olga Simpson"}</SubTitle>
          <SubTitle welcome={true}>{token || "olgasimp@gmail.com"}</SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={AvatarImg} />

            <Line />
            <StyledButton onPress={clearLogin}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer> */}
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  picture: {
    height: "50%",
    minWidth: "100%",
  },
  innerContainer: {
    padding: 25,
    paddingTop: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    letterSpacing: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
});
