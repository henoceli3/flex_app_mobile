import * as SecureStore from "expo-secure-store";
import { TransactionInterface, UsersInterface } from "./Interfaces";
import { router } from "expo-router";
import Toast from "@/components/Tost";

export async function getUser(): Promise<UsersInterface | null> {
  const user = await SecureStore.getItemAsync("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser;
  }
  return null;
}

export async function getCode(): Promise<string | null> {
  const code = await SecureStore.getItemAsync("code");
  if (code) {
    const parsedCode = JSON.parse(code);
    return parsedCode;
  }
  return null;
}

export async function setHomePath(path: string) {
  await SecureStore.setItemAsync("homePath", path);
}

export async function getHomePath(): Promise<string | null> {
  const path = await SecureStore.getItemAsync("homePath");
  if (path) {
    const parsedPath = JSON.parse(path);
    return parsedPath;
  }
  return null;
}

export async function getToken(): Promise<String | null> {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    const parsedToken = JSON.parse(token);
    return parsedToken;
  }
  return null;
}

export async function getSolde(): Promise<number | null> {
  const solde = await SecureStore.getItemAsync("solde");
  if (solde) {
    const parsedSolde = JSON.parse(solde);
    return parsedSolde;
  }
  return null;
}

export async function setSolde(solde: number) {
  await SecureStore.setItemAsync("solde", JSON.stringify(solde));
}

export async function getTransaction(): Promise<TransactionInterface[] | []> {
  const transactions = await SecureStore.getItemAsync("transactions");
  if (transactions) {
    const parsedTransactions = JSON.parse(transactions);
    return parsedTransactions;
  }
  return [];
}

export async function Logout() {
  try {
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("code");
    await SecureStore.deleteItemAsync("solde");
    await SecureStore.deleteItemAsync("transactions");
    await SecureStore.deleteItemAsync("homePath");

    router.navigate("users/login");
    Toast("Vous avez bien été deconnecté 🙂");
  } catch (error) {
    Toast("Une erreur est survenue lors de la deconnexion");
  }
}

export async function setKey(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export const rendTypeTransaction = (
  type: number,
  user: UsersInterface | null,
  destinataire: UsersInterface,
  expediteur: UsersInterface
) => {
  if (type === 1) {
    return "Depot";
  } else if (type === 2) {
    return "Retrait";
  } else if (type === 3 && user?.id !== destinataire?.id) {
    return `A ${destinataire?.nom} ${destinataire?.prenoms}`;
  } else if (type === 3 && user?.id === destinataire?.id) {
    return `De ${expediteur?.nom} ${expediteur?.prenoms}`;
  } else {
    return "Depot";
  }
};

export const renderSigneTransation = (
  type: number,
  user: UsersInterface | null,
  destinataire: UsersInterface,
  expediteur: UsersInterface
) => {
  if (type === 1) {
    return "+";
  } else if (type === 2) {
    return "-";
  } else if (type === 3 && user?.id !== destinataire?.id) {
    return "-";
  } else if (type === 3 && user?.id === destinataire?.id) {
    return "+";
  } else {
    return "+";
  }
};

export const renderEtatTransaction = (etat: number) => {
  if (etat != 2) {
    return "Echoué";
  } else {
    return "Reussie";
  }
};
