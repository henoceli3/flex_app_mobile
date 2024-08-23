import { useEffect } from "react";
import { Alert, Modal } from "react-native";

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
      timer = setTimeout(() => {
        setModalVisible(false);
        callback();
      }, 2000);
    }

    return () => {
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
