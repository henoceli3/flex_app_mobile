import Toast from "@/components/Tost";
import { AppColors } from "@/constants/Colors";
import { CommonStyle } from "@/constants/CommonStyle";
import { setKey } from "@/constants/HelperFunction";
import { RqAxios } from "@/Services/Axios";
import { Endpoint } from "@/Services/Endpoint";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Keyboard,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
interface loginData {
  email: string;
  password: string;
}
const Login = () => {
  const [loginLoad, setLoginLoad] = useState(false);
  const [loginData, setLoginData] = useState<loginData>({} as loginData);

  async function Login() {
    try {
      setLoginLoad(true);
      const res = await RqAxios.post(Endpoint.user.login, loginData);
      if (res.status === 200) {
        setKey("user", JSON.stringify(res.data.resultat.user));
        setKey("token", res.data.resultat.token);
        router.push("/home");
        Toast("Bienvenue 😊!");
      } else {
        Toast(res.data.resultat.message);
      }
      setLoginLoad(false);
    } catch (error) {
      Toast("Email ou mot de passe incorrect 😒");
      setLoginLoad(false);
      console.log(error);
    }
  }
  return (
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
      <Text>Connectez Vous pour commencez</Text>
      <View style={{ marginTop: 24, width: "80%" }}>
        <TextInput
          style={{ ...CommonStyle.input, marginBottom: 12 }}
          placeholder="Email ou numero de telephone"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.nativeEvent.text })
          }
        />
        <TextInput
          style={{ ...CommonStyle.input, marginBottom: 12 }}
          placeholder="Mot de passe"
          value={loginData.password}
          onChange={(e) => {
            setLoginData({ ...loginData, password: e.nativeEvent.text });
          }}
          secureTextEntry={true}
        />
        {loginLoad ? (
          <ActivityIndicator color={AppColors.primary} />
        ) : (
          <Button
            title="Connexion"
            color={AppColors.primary}
            onPress={() => {
              Keyboard.dismiss();
              Login();
            }}
            disabled={!loginData.email || !loginData.password}
          />
        )}
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: 8,
            marginTop: 12,
          }}
        >
          <Link href={""}>Mot de passe oublie ?</Link>
          <Link href={""}>Creer un compte?</Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
