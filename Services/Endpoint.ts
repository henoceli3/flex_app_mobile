export const Endpoint = {
  baseUrl: "http://192.168.17.1:4000/",
  user: {
    login: "authentification/login",
    getUserById: "users/by-id",
    getUserByNumber: "users/by-number",
  },
  transactions: {
    getTransactionsByUser: "transactions/get-transactions-by-user",
    addTransaction: "transactions/create",
  },
};
