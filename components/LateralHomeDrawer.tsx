import { Logout } from "@/constants/HelperFunction";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { View } from "react-native";
import { List } from "react-native-paper";

const LateralHomeDrawer = () => {
  return (
    <>
      <View
        style={{
          height: "100%",
          width: "100%",
          padding: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <View>
          <List.Item
            title={"Profile"}
            description={"Vos Informations"}
            left={() => <AntDesign name="user" size={24} color="black" />}
            onPress={() => router.push("/users/details/details")}
          />
          <List.Item
            title={"Paramètres"}
            description={""}
            left={() => <AntDesign name="setting" size={24} color="black" />}
          />
        </View>
        <View>
          <List.Item
            title={"Deconnexion"}
            description={"Se deconnecter"}
            left={() => <AntDesign name="logout" size={24} color="black" />}
            onPress={() => Logout()}
          />
        </View>
      </View>
    </>
  );
};

export default LateralHomeDrawer;
