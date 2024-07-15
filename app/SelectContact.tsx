import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Contacts from "expo-contacts";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AppColors } from "@/constants/Colors";

interface Props {
  stepsTransation: number;
  setStepsTransation: React.Dispatch<React.SetStateAction<number>>;
}

const SelectContact = ({ stepsTransation, setStepsTransation }: Props) => {
  const [listeContactes, setListeContactes] = useState<Contacts.Contact[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>(
    []
  );
  const [searchText, setSearchText] = useState("");

  async function getContactes() {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      setPermissionGranted(true);
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      setListeContactes(data);
      setFilteredContacts(data);
    }
  }
  useEffect(() => {
    getContactes();
  }, []);

  useEffect(() => {
    const filtered = listeContactes.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchText.trim().toLowerCase()) ||
        (contact.phoneNumbers &&
          contact.phoneNumbers[0].number
            ?.replace(" ", "")
            .includes(searchText.trim()))
    );
    setFilteredContacts(filtered);
  }, [searchText, listeContactes]);

  const removeCountryCode = (phoneNumber: string | undefined) => {
    if (phoneNumber && phoneNumber.startsWith("+")) {
      return phoneNumber.replace(/^\+\d{3}/, "");
    }
    return phoneNumber;
  };

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setSearchText(text);
        }}
        value={searchText}
        placeholder="Rechercher un contact"
        autoFocus
      />
      <View
        style={{
          width: "100%",
          marginTop: 16,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <AntDesign name="qrcode" size={50} color="black" />
        <Text style={{ marginLeft: 16, fontWeight: "bold" }}>
          Scanner pour envoyer
        </Text>
      </View>
      {permissionGranted ? (
        <>
          <FlatList
            data={filteredContacts}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.contactItem}
                key={item.id}
                onPress={() => {
                  setStepsTransation(1);
                }}
              >
                <View>
                  <AntDesign name="user" size={24} color="black" />
                </View>
                <View>
                  <Text style={styles.contactName}>{item.name}</Text>
                  {item.phoneNumbers && (
                    <Text style={styles.contactPhone}>
                      {removeCountryCode(item.phoneNumbers[0].number)}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <Text style={styles.permissionText}>
          Permission non accordée pour accéder aux contacts.
        </Text>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    marginBottom: 16,
  },
  contactItem: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  contactName: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  contactPhone: {
    fontSize: 16,
    color: "#777",
  },
  permissionText: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderBottomWidth: 2,
    borderColor: AppColors.primary,
  },
});
export default SelectContact;
