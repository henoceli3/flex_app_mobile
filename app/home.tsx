import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { AppColors } from "@/constants/Colors";
import { TransactionInterface, UsersInterface } from "@/constants/Interfaces";
import {
  getTransaction,
  getUser,
  renderSigneTransation,
  rendTypeTransaction,
  setKey,
} from "@/constants/HelperFunction";
import { RqAxios } from "@/Services/Axios";
import { Endpoint } from "@/Services/Endpoint";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const HomePage = () => {
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
      onPress: () => {},
    },
    {
      label: "Transfert",
      icon: null,
      onPress: () => {
        router.push("/Transfert");
      },
    },
  ];
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.primary }}>
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: AppColors.primary,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
            paddingBottom: 20,
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
          data={transations}
          refreshing={refreshing}
          onRefresh={() => getTransactionsByUser(user?.id)}
          renderItem={({ item }) => (
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
                  {rendTypeTransaction(
                    item.type_transaction_id,
                    user,
                    item.beneficiaire,
                    item.expediteur
                  )}
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
                )}${item.montant}F`}</Text>
              </View>
            </View>
          )}
          style={{
            padding: 20,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: 550,
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default HomePage;
