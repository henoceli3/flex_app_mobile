import {
  getUser,
  renderEtatTransaction,
  renderSigneTransation,
  rendTypeTransaction,
} from "@/constants/HelperFunction";
import { TransactionInterface, UsersInterface } from "@/constants/Interfaces";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailTransactions = () => {
  const [user, setUser] = useState<UsersInterface | null>(null);
  const params = useLocalSearchParams();
  const { transation } = params;
  const transactionData: TransactionInterface = JSON.parse(
    transation?.toString() || "{}"
  );

  async function getData() {
    const res = await getUser();
    setUser(res);
  }

  useEffect(() => {
    getData();
  }, []);

  const TextRowItem = ({
    fisrtText,
    secondText,
  }: {
    fisrtText: string;
    secondText: string;
  }) => {
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>{fisrtText}</Text>
        <Text style={{ fontSize: 14 }}>{secondText}</Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={router.back}
          />
        </View>
        <View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {`${renderSigneTransation(
                  transactionData.type_transaction_id,
                  user,
                  transactionData.beneficiaire,
                  transactionData.expediteur
                )}${transactionData.montant.toLocaleString()}FCFA`}
              </Text>
              <Text style={{ fontSize: 13, color: "#777" }}>
                {rendTypeTransaction(
                  transactionData.type_transaction_id,
                  user,
                  transactionData.beneficiaire,
                  transactionData.expediteur
                )}
              </Text>
            </View>
            <View></View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "auto",
              padding: 10,
              marginTop: 10,
            }}
          >
            <View style={{ backgroundColor: "#e9ecef", padding: 10 }}>
              <TextRowItem
                fisrtText="Montant"
                secondText={`${renderSigneTransation(
                  transactionData.type_transaction_id,
                  user,
                  transactionData.beneficiaire,
                  transactionData.expediteur
                )}${transactionData.montant.toLocaleString()}FCFA`}
              />
              <TextRowItem fisrtText="Frais" secondText={`...FCFA`} />
              <TextRowItem
                fisrtText="Status"
                secondText={`${renderEtatTransaction(
                  transactionData.etat_transaction
                )}`}
              />
              <TextRowItem
                fisrtText="Date"
                secondText={moment(transactionData.created_at).format(
                  "DD MMM YYYY"
                )}
              />
              <TextRowItem
                fisrtText="Numero Transaction"
                secondText={transactionData.uuid.substring(0, 6) + "..."}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default DetailTransactions;
