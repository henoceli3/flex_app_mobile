import { AppColors } from "@/constants/Colors";
import {
  getTransaction,
  getUser,
  renderSigneTransation,
  setKey,
} from "@/constants/HelperFunction";
import { TransactionInterface, UsersInterface } from "@/constants/Interfaces";
import { RqAxios } from "@/Services/Axios";
import { Endpoint } from "@/Services/Endpoint";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AgentHome = () => {
  const [user, setUser] = useState<UsersInterface | null>(null);
  const [transations, setTransactions] = useState([] as TransactionInterface[]);
  const [hideSolde, setHideSolde] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function getUserById(id: number | undefined) {
    try {
      setRefreshing(true);
      const res = await RqAxios.get(`${Endpoint.user.getUserById}/?id=${id}`);
      setUser(res.data.resultat);
      setKey("user", JSON.stringify(res.data.resultat));
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.log("error getUserById", error);
    }
  }

  async function getTransactionsByUser(id: number | undefined) {
    try {
      setRefreshing(true);
      const res = await RqAxios.post(
        Endpoint.transactions.getTransactionsByUser,
        {
          id: id,
        }
      );
      setTransactions(res.data.resultat);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.log("error getTransactionsByUser", error);
    }
  }

  async function getData() {
    const res = await getUser();
    setUser(res);
    getUserById(res?.id);
    const res2 = await getTransaction();
    setTransactions(res2);
    getTransactionsByUser(res?.id);
  }

  useEffect(() => {
    getData();
  }, []);

  const headerButton = [
    {
      label: "Depot",
      icon: null,
      onPress: () => {
        router.push("/profiles/agents/transactions/depot");
      },
    },
    {
      label: "Retrait",
      icon: null,
      onPress: () => {
        router.push("/profiles/agents/transactions/retrait");
      },
    },
  ];

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.primary }}>
        <View
          style={{
            height: "30%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: AppColors.primary,
            padding: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <AntDesign name="setting" size={24} color="white" />
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {hideSolde ? (
              <Text
                style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}
                onPress={() => setHideSolde(!hideSolde)}
              >
                *******
              </Text>
            ) : (
              <Text
                style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}
                onPress={() => setHideSolde(!hideSolde)}
              >
                {Number(user?.solde).toLocaleString("fr-FR")}{" "}
                <Text style={{ fontSize: 12 }}>FCFA</Text>
              </Text>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {headerButton.map((item, index) => (
              <View
                key={index}
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: "#fff",
                  borderRadius: 50,
                  marginLeft: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 10, fontWeight: "bold" }}
                  onPress={item.onPress}
                >
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <FlatList
          style={{
            padding: 20,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: "70%",
          }}
          data={transations}
          refreshing={refreshing}
          onRefresh={() => getTransactionsByUser(user?.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: `/profiles/agents/transactions/${item.id}`,
                  params: {
                    transation: JSON.stringify(item),
                  },
                })
              }
            >
              <View
                key={item.id}
                style={{
                  height: 50,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: AppColors.primary,
                      fontWeight: "bold",
                    }}
                  >
                    {item.libelle}
                  </Text>
                  <Text style={{ fontSize: 12, color: "gray" }}>
                    {moment(item.created_at).format("DD MMM, HH:mm")}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: AppColors.primary,
                    }}
                  >{`${renderSigneTransation(
                    item.type_transaction_id,
                    user,
                    item.beneficiaire,
                    item.expediteur
                  )}${item.montant}FCFA`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default AgentHome;
