import { SetStateAction, useState } from "react";
import SelectContact from "./SelectContact";
import { Text, View } from "react-native";
import SendPage from "./SendPage";

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
        return (
          <SelectContact
            stepsTransation={stepsTransation}
            setStepsTransation={setStepsTransation}
          />
        );
      case 1:
        return <SendPage />;
      case 2:
        return <View></View>;
      default:
        return <View></View>;
    }
  }
  return <View>{renderSteps()}</View>;
};

export default Transfert;
