import { ToastAndroid } from "react-native";

function Toast(message: string) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

export default Toast;
