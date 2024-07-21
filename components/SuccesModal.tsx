import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";

interface Props {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  callback: () => void;
  children: React.ReactNode;
}

const SuccesModal = ({
  modalVisible,
  setModalVisible,
  callback,
  children,
}: Props) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (modalVisible) {
      // Fermer le modal après 5 secondes si il est visible
      timer = setTimeout(() => {
        setModalVisible(false);
        callback();
      }, 5000);
    }

    return () => {
      // Clear timeout if the component unmounts or modalVisible changes
      if (timer) clearTimeout(timer);
    };
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      {children}
    </Modal>
  );
};

export default SuccesModal;
