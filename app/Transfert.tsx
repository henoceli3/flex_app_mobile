import { useState } from "react";
import SelectContact from "./SelectContact";
import { Text, View } from "react-native";

const Transfert = () => {
  const [stepsTransation, setStepsTransation] = useState(0);

  function nexSteps() {
    setStepsTransation(stepsTransation + 1);
  }

  function prevSteps() {
    setStepsTransation(stepsTransation - 1);
  }
  function renderSteps() {
    switch (stepsTransation) {
      case 0:
        return <SelectContact />;
      case 1:
        return <View></View>;
      case 2:
        return <View></View>;
      default:
        return <View></View>;
    }
  }
  return <View>{renderSteps()}</View>;
};

export default Transfert;
