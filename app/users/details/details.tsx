import Toast from "@/components/Tost";
import { getUser } from "@/constants/HelperFunction";
import { UsersInterface } from "@/constants/Interfaces";
import {
  AntDesign,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const User = () => {
  const [user, setUser] = useState<UsersInterface | null>(null);
  const [loading, setLoading] = useState(true);
  async function getData() {
    try {
      setLoading(true);
      const res = await getUser();
      setUser(res);
    } catch (error) {
      Toast("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <SafeAreaView style={style.container}>
        <View style={style.avatarContainer}>
          {user?.nom && user?.prenoms && (
            <Avatar.Text
              size={70}
              label={`${user?.nom[0]}${user?.prenoms[0]}`}
            />
          )}
          <Text style={{ fontSize: 24 }}>
            {user?.nom} {user?.prenoms}
          </Text>
        </View>
        <View>
          <List.Item
            title="Email"
            description={user?.email}
            left={() => <AntDesign name="mail" size={24} color="black" />}
          />
          <List.Item
            title="Telephone"
            description={user?.telephone}
            left={() => <AntDesign name="mail" size={24} color="black" />}
          />
          <List.Item
            title="N° CNI"
            description={user?.cni}
            left={() => (
              <MaterialCommunityIcons
                name="smart-card-outline"
                size={24}
                color="black"
              />
            )}
          />
          <List.Item
            title="Date de naissance"
            description={user?.date_naissance?.toString()}
            left={() => <Fontisto name="date" size={24} color="black" />}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default User;

const style = StyleSheet.create({
  container: {
    padding: 16,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
});
