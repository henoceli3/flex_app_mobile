import Toast from "@/components/Tost";
import { AppColors } from "@/constants/Colors";
import { getUser } from "@/constants/HelperFunction";
import { UsersInterface } from "@/constants/Interfaces";
import { RqAxios } from "@/Services/Axios";
import { Endpoint } from "@/Services/Endpoint";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const RetraitAgent = () => {
  const [loadGetBenef, setLoadGetBenef] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [beneficiaire, setBeneficiaire] = useState<UsersInterface>();
  const [expediteur, setExpediteur] = useState<UsersInterface | null>();
  const [postData, setPostData] = useState({
    montant: "",
    type_transaction_id: 2,
    beneficiaire_id: beneficiaire?.id,
    expediteur_id: expediteur?.id,
    etat_transaction: 0,
  });

  async function getExpediteurByPhoneNumber(num: string) {
    try {
      setLoadGetBenef(true);
      const res = await RqAxios.get(
        `${Endpoint.user.getUserByNumber}/?number=${num}`
      );
      setExpediteur(res.data.resultat);
      setPostData({
        ...postData,
        expediteur_id: res.data.resultat.id,
      });
    } catch (error) {
      console.log(error);
      Toast("Une erreur est survenue");
    } finally {
      setLoadGetBenef(false);
    }
  }

  async function getU() {
    const user = await getUser();
    setPostData({ ...postData, beneficiaire_id: user?.id });
  }

  async function depot() {
    try {
      setPostLoading(true);
      const res = await RqAxios.post(
        `${Endpoint.transactions.addTransaction}`,
        {
          transaction: postData,
        }
      );
      setPostLoading(false);
      Toast("Depot reussi");
      router.push("/profiles/agents/agent-home");
    } catch (error) {
      setPostLoading(false);
      console.log(error);
      Toast("Une erreur est survenue");
    }
  }

  useEffect(() => {
    getU();
  }, []);

  return (
    <>
      <SafeAreaView style={style.container}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 20 }}>Retrait</Text>
        </View>
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            {loadGetBenef ? (
              <ActivityIndicator size="small" color={AppColors.primary} />
            ) : (
              expediteur && (
                <Text style={style.contactName}>
                  A {expediteur?.nom} {expediteur?.prenoms}
                </Text>
              )
            )}
          </View>
          <TextInput
            style={{ ...style.input, fontWeight: "bold" }}
            keyboardType="numeric"
            placeholder="Numéro à qui rétirer"
            onChangeText={(value) => {
              if (value.length === 10) {
                getExpediteurByPhoneNumber(value);
              } else {
                setExpediteur(undefined);
              }
            }}
          />
          <TextInput
            style={{ ...style.input, fontWeight: "bold" }}
            keyboardType="numeric"
            placeholder="Montant"
            value={postData.montant}
            onChangeText={(value) => {
              setPostData({ ...postData, montant: value });
            }}
          />
        </View>
        <View>
          <Button
            mode="contained"
            onPress={() => depot()}
            loading={postLoading}
            textColor="white"
            disabled={
              postData.montant === "" || postData.beneficiaire_id === undefined
            }
          >
            Retrait
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RetraitAgent;

const style = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  contactName: {
    color: AppColors.primary,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: AppColors.secondary,
    padding: 12,
    marginBottom: 12,
  },
});
