import { useState } from "react";
import { View } from "react-native";
import * as Contacts from "expo-contacts";
import SelectContact from "./SelectContact";
import SendPage from "./SendPage";

const Transfert = () => {
  const [stepsTransation, setStepsTransation] = useState(0);
  const [contact, setContact] = useState<Contacts.Contact>(
    {} as Contacts.Contact
  );

  function renderSteps() {
    switch (stepsTransation) {
      case 0:
        return (
          <SelectContact
            setStepsTransation={setStepsTransation}
            setContact={setContact}
          />
        );
      case 1:
        return <SendPage contact={contact} />;
      case 2:
        return <></>;
      default:
        return <View></View>;
    }
  }

  return <View>{renderSteps()}</View>;
};

export default Transfert;
