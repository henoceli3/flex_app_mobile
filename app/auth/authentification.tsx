import React, { useEffect, useState } from "react";
import {
  Text, StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthButton } from "@/constants/Interfaces";
import { Ionicons } from "@expo/vector-icons";
import Toast from "@/components/Tost";
import { AppColors } from "@/constants/Colors";
import { getCode } from "@/constants/HelperFunction";
import SuccesModal from "@/components/SuccesModal";
import { router } from "expo-router";

interface Props {
  onSuccess: () => Promise<void>;
  promptMessage?: string;
  sucessLoading: boolean;
  modalChildren?: JSX.Element;
}

const Authentification = ({
  onSuccess,
  promptMessage,
  modalChildren,
}: Props) => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [writtedCode, setWrittedCode] = useState<string>("");
  const [code, setCode] = useState<string | null>(null);
  const [openSuccesModal, setOpenSuccesModal] = useState<boolean>(false);

  async function getCd() {
    const cd = await getCode();
    setCode(cd);
    console.log("Code from getCode:", cd); // Debugging log
  }

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      console.log("isBiometricSupported:", compatible);
      if (compatible) {
        handleAuthentication(compatible);
      }
    })();
    getCd();
  }, []);

  useEffect(() => {
    if (writtedCode.length === 4) {
      AuthWithCode();
    }
  }, [writtedCode]);

  function pressNumber(number: number) {
    if (writtedCode.length < 4) {
      const updatedCode = writtedCode + number;
      setWrittedCode(updatedCode);
    }
  }

  async function AuthWithCode() {
    console.log("Writted Code:", writtedCode); // Debugging log
    console.log("Actual Code:", code); // Debugging log
    if (writtedCode === code?.toString()) {
      setIsAuthenticated(true);
      onSuccess().then(() => {
        setOpenSuccesModal(true);
      });
    } else {
      setIsAuthenticated(false);
      Toast("Code invalide");
    }
    setWrittedCode("");
  }

  const handleAuthentication = async (compatible?: boolean) => {
    setIsAuthenticating(true);
    try {
      if (!compatible) {
        Toast("Biometrics not supported");
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: promptMessage || "Authentifiez vous pour continuer",
      });
      if (result.success) {
        onSuccess().then(() => {
          setOpenSuccesModal(true);
        });
      }
      setIsAuthenticated(result.success);
    } catch (error) {
      console.error("Authentication failed:", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const roundIndicators = [
    {
      title: <></>,
    },
    {
      title: <></>,
    },
    {
      title: <></>,
    },
    {
      title: <></>,
    },
  ];

  const AuthButtonsListes: AuthButton[] = [
    {
      title: <Text style={{ ...styles.clavierItems }}>1</Text>,
      onPress: () => {
        pressNumber(1);
      },
    },
    {
      title: <Text style={{ ...styles.clavierItems }}>2</Text>,
      onPress: () => {
        pressNumber(2);
      },
    },
    {
      title: <Text style={{ ...styles.clavierItems }}>3</Text>,
      onPress: () => {
        pressNumber(3);
      },
    },
    {
      title: <Text style={{ ...styles.clavierItems }}>4</Text>,
      onPress: () => {
        pressNumber(4);
      },
    },
    {
      title: <Text style={{ ...styles.clavierItems }}>5</Text>,
      onPress: () => {
        pressNumber(5);
      },
    },
    {
      title: <Text style={{ ...styles.clavierItems }}>6</Text>,
      onPress: () => {
        pressNumber(6);
      },
    },
    {
      title: <Text style={{ ...styles.clavierItems }}>7</Text>,
      onPress: () => {
        pressNumber(7);
      },
    },
    {
      title: <Text style={{ ...styles.clavierItems }}>8</Text>,
      onPress: () => {
        pressNumber(8);
      },
    },
    {
      title: <Text style={{ ...styles.clavierItems }}>9</Text>,
      onPress: () => {
        pressNumber(9);
      },
    },
    {
      title: (
        <Text style={{ ...styles.clavierItems, fontSize: 15 }}>Oublié ?</Text>
      ),
      onPress: () => {},
    },
    {
      title: <Text style={{ ...styles.clavierItems }}>0</Text>,
      onPress: () => {
        pressNumber(0);
      },
    },
    {
      title: isAuthenticating ? (
        <ActivityIndicator size="large" color={AppColors.primary} />
      ) : (
        <Ionicons name="finger-print" size={30} color="black" />
      ),
      onPress: () => {
        handleAuthentication(isBiometricSupported);
      },
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.roundIndicatorContainer}>
          {roundIndicators.map((indicator, index) => (
            <View
              key={index}
              style={{
                ...styles.indicatorItem,
                backgroundColor:
                  index < writtedCode.length ? AppColors.primary : "#90e0ef",
              }}
            >
              {indicator.title}
            </View>
          ))}
        </View>

        <View style={styles.clavierContainer}>
          {AuthButtonsListes.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={styles.clavierItemsContainer}
              onPress={button.onPress}
            >
              {button.title}
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
      <SuccesModal
        modalVisible={openSuccesModal}
        setModalVisible={setOpenSuccesModal}
        callback={() => {
          router.push("/home");
        }}
        children={<>{modalChildren}</>}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    position: "relative",
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  success: {
    marginTop: 16,
    color: "green",
    fontSize: 16,
  },
  roundIndicatorContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  indicatorItem: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#90e0ef",
  },
  clavierContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    position: "absolute",
    top: "auto",
    bottom: 20,
  },
  clavierItemsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    padding: 10,
  },
  clavierItems: {
    fontSize: 30,
  },
});

export default Authentification;
