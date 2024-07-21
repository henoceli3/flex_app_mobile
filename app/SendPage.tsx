import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Contacts from "expo-contacts";
import { AppColors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { getUser } from "@/constants/HelperFunction";
import { UsersInterface } from "@/constants/Interfaces";
import { RqAxios } from "@/Services/Axios";
import { Endpoint } from "@/Services/Endpoint";
import Toast from "@/components/Tost";
import Authentification from "./auth/authentification";
import { AntDesign } from "@expo/vector-icons";

interface SendPageProps {
  contact: Contacts.Contact;
}

const SendPage = ({ contact }: SendPageProps) => {
  const [user, setUser] = useState<UsersInterface | null>(null);
  const [beneficiaire, setBeneficiaire] = useState<UsersInterface | null>(null);
  const [transactionData, setTransactionData] = useState({
    montant: 0,
    montantAvecFrais: 0, //1%
    type_transaction_id: 3,
    beneficiaire_id: "",
    expediteur_id: "",
    etat_transaction: 0,
  });
  const [loadGetBenef, setLoadGetBenef] = useState(false);
  const [loadSend, setLoadSend] = useState(false);
  const [showAuth, setShowAuth] = useState(false); // Nouvel état pour afficher l'authentification

  async function getU() {
    const user = await getUser();
    setUser(user);
  }

  async function getUserByNumber() {
    try {
      setLoadGetBenef(true);
      const user = await RqAxios.get(
        `${Endpoint.user.getUserByNumber}/?number=${
          contact?.phoneNumbers &&
          contact?.phoneNumbers[0]?.number?.replace(" ", "")
        }`
      );
      setBeneficiaire(user.data.resultat);
      setLoadGetBenef(false);
    } catch (error) {
      setLoadGetBenef(false);
      console.log(error);
      Toast("User not found");
    }
  }

  useEffect(() => {
    getU();
    getUserByNumber();
  }, []);

  async function send() {
    try {
      setLoadSend(true);
      const res = await RqAxios.post(Endpoint.transactions.addTransaction, {
        transaction: {
          ...transactionData,
          expediteur_id: user?.id,
          beneficiaire_id: beneficiaire?.id,
        },
      });
      Toast(res.data.message);
      setLoadSend(false);
    } catch (error) {
      setLoadSend(false);
      Toast("Une erreur est survenue");
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={style.container}>
      {showAuth ? (
        <Authentification
          onSuccess={send}
          sucessLoading={loadSend}
          modalChildren={
            <>
              <View
                style={{
                  height: "50%",
                  width: "80%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  shadowColor: "#000",
                  padding: 20,
                  alignSelf: "center",
                  marginTop: "50%",
                  borderRadius: 10,
                }}
              >
                <AntDesign name="checkcircle" size={50} color="#007f5f" />
                <Text
                  style={{
                    color: "#007f5f",
                    fontWeight: "bold",
                    fontSize: 20,
                    marginTop: 10,
                  }}
                >
                  Success
                </Text>
              </View>
            </>
          }
        />
      ) : (
        <>
          <Text style={{ color: "#adb5bd" }}>A</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={style.contactName}>{contact.name} | </Text>
            {loadGetBenef ? (
              <ActivityIndicator size="small" color={AppColors.primary} />
            ) : (
              <Text style={style.contactName}>
                {beneficiaire?.nom} {beneficiaire?.prenoms}
              </Text>
            )}
          </View>
          <TextInput
            style={{ ...style.input, fontWeight: "bold" }}
            onChangeText={(text) => {}}
            value={contact?.phoneNumbers && contact.phoneNumbers[0]?.number}
            readOnly
          />
          <TextInput
            style={{ ...style.input, fontWeight: "bold" }}
            placeholder="Montant envoyé"
            onChangeText={(text) => {
              let montantO = 0;
              let montantF = 0;
              if (text == "" || undefined || NaN) {
                montantO = 0;
                montantF = 0;
              } else if (Number(text) <= 0) {
                montantO = 0;
                montantF = 0;
              } else {
                montantO = text != "" ? Number(text) : 0;
                montantF = text != "" ? Number(text) - Number(text) * 0.01 : 0;
              }
              setTransactionData({
                ...transactionData,
                montant: montantO,
                montantAvecFrais: montantF,
              });
            }}
            value={
              transactionData.montant === 0 || undefined || NaN
                ? undefined
                : transactionData.montant.toLocaleString()
            }
            keyboardType="numeric"
          />
          <TextInput
            style={{ ...style.input, fontWeight: "bold" }}
            placeholder="Montant reçu"
            onChangeText={(text) => {
              let montantO = 0;
              let montantF = 0;
              if (text == "" || undefined || NaN) {
                montantO = 0;
                montantF = 0;
              } else if (Number(text) <= 0) {
                montantO = 0;
                montantF = 0;
              } else {
                montantO = text != "" ? Number(text) + Number(text) * 0.01 : 0;
                montantF = text != "" ? Number(text) : 0;
              }
              setTransactionData({
                ...transactionData,
                montant: montantO,
                montantAvecFrais: montantF,
              });
            }}
            value={
              transactionData.montantAvecFrais === 0 || undefined || NaN
                ? undefined
                : transactionData.montantAvecFrais.toLocaleString()
            }
            keyboardType="numeric"
          />
          <Text
            style={{
              color: AppColors.primary,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Frais Flex = 1%
          </Text>

          <View style={{ marginTop: 16 }}>
            {loadSend ? (
              <ActivityIndicator size="small" color={AppColors.primary} />
            ) : (
              <Button
                title="Envoyer"
                onPress={() => setShowAuth(true)}
                disabled={
                  transactionData.montant === 0 ||
                  transactionData.montantAvecFrais === 0 ||
                  beneficiaire === null
                }
                color={AppColors.primary}
              />
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 16,
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

export default SendPage;
