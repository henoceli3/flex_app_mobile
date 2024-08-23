import {
  ActivityIndicator,
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
import { AntDesign } from "@expo/vector-icons";
import Authentification from "../../../auth/authentification";
import { Button } from "react-native-paper";

interface SendPageProps {
  contact: Contacts.Contact;
}

const SendPage = ({ contact }: SendPageProps) => {
  const [user, setUser] = useState<UsersInterface | null>(null);
  const [beneficiaire, setBeneficiaire] = useState<UsersInterface | null>(null);
  const [transactionData, setTransactionData] = useState({
    montant: 0,
    montantAvecFrais: 0, // 1%
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
      Toast("Ce numéro n'existe pas");
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

  const handleMontantChange = (text: string) => {
    let montantO = 0;
    let montantF = 0;
    if (text && !isNaN(Number(text))) {
      montantO = Number(text);
      montantF = montantO - montantO * 0.01;
    }
    setTransactionData({
      ...transactionData,
      montant: montantO,
      montantAvecFrais: montantF,
    });
  };

  const handleMontantAvecFraisChange = (text: string) => {
    let montantO = 0;
    let montantF = 0;
    if (text && !isNaN(Number(text))) {
      montantF = Number(text);
      montantO = montantF + montantF * 0.01;
    }
    setTransactionData({
      ...transactionData,
      montant: montantO,
      montantAvecFrais: montantF,
    });
  };

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
            editable={false}
          />
          <TextInput
            style={{ ...style.input, fontWeight: "bold" }}
            placeholder="Montant envoyé"
            onChangeText={handleMontantChange}
            value={
              transactionData.montant === 0
                ? ""
                : transactionData.montant.toString()
            }
            keyboardType="numeric"
          />
          <TextInput
            style={{ ...style.input, fontWeight: "bold" }}
            placeholder="Montant reçu"
            onChangeText={handleMontantAvecFraisChange}
            value={
              transactionData.montantAvecFrais === 0
                ? ""
                : transactionData.montantAvecFrais.toString()
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
                mode="contained"
                onPress={() => setShowAuth(true)}
                loading={loadSend}
                textColor="white"
                disabled={
                  transactionData.montant === 0 ||
                  transactionData.montantAvecFrais === 0 ||
                  beneficiaire === null
                }
              >
                Envoyer
              </Button>
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
