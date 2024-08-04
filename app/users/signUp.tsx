import Toast from "@/components/Tost";
import { AppColors } from "@/constants/Colors";
import { CommonStyle } from "@/constants/CommonStyle";
import { setKey } from "@/constants/HelperFunction";
import { RqAxios } from "@/Services/Axios";
import { Endpoint } from "@/Services/Endpoint";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [signUpLoad, setSignUpLoad] = useState(false);
  const [signUpData, setSignUpData] = useState({
    user: {
      nom: "",
      prenoms: "",
      telephone: "",
      email: "",
      code: "",
      solde: 0,
      role_id: "",
      password: "",
    },
  });

  async function signUp() {
    try {
      setSignUpLoad(true);
      const res = await RqAxios.post(Endpoint.user.signup, signUpData);
      if (res.status === 200) {
        setKey("user", JSON.stringify(res.data.resultat.user));
        setKey("code", res.data.resultat.code);
        setKey("token", res.data.resultat.token);
        router.push("/home");
        Toast("Bienvenue 😀");
      } else {
        Toast(res.data.resultat.message);
      }
      setSignUpLoad(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <SafeAreaView
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Bienvenue sur Flex
        </Text>
        <Text>Créez votre compte</Text>
        <View style={{ marginTop: 24, width: "80%" }}>
          <TextInput
            style={{ ...CommonStyle.input, marginBottom: 12 }}
            placeholder="Noms"
            value={signUpData.user.nom}
            onChange={(e) => {
              setSignUpData({
                ...signUpData,
                user: {
                  ...signUpData.user,
                  nom: e.nativeEvent.text,
                },
              });
            }}
          />
          <TextInput
            style={{ ...CommonStyle.input, marginBottom: 12 }}
            placeholder="Prenoms"
            value={signUpData.user.prenoms}
            onChange={(e) => {
              setSignUpData({
                ...signUpData,
                user: {
                  ...signUpData.user,
                  prenoms: e.nativeEvent.text,
                },
              });
            }}
          />
          <TextInput
            style={{ ...CommonStyle.input, marginBottom: 12 }}
            placeholder="Telephone"
            value={signUpData.user.telephone}
            onChange={(e) => {
              setSignUpData({
                ...signUpData,
                user: {
                  ...signUpData.user,
                  telephone: e.nativeEvent.text,
                },
              });
            }}
          />
          <TextInput
            style={CommonStyle.input}
            placeholder="Email"
            value={signUpData.user.email}
            onChange={(e) => {
              setSignUpData({
                ...signUpData,
                user: {
                  ...signUpData.user,
                  email: e.nativeEvent.text,
                },
              });
            }}
          />
          <TextInput
            style={{ ...CommonStyle.input, marginBottom: 12 }}
            placeholder="Mot de passe"
            value={signUpData.user.password}
            onChange={(e) => {
              setSignUpData({
                ...signUpData,
                user: {
                  ...signUpData.user,
                  password: e.nativeEvent.text,
                },
              });
            }}
            secureTextEntry={true}
          />
          <Button
            mode="contained"
            onPress={() => console.log("Pressed")}
            loading={signUpLoad}
            textColor="white"
          >
            Press me
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
