export const Endpoint = {
  baseUrl: "http://192.168.1.67:4000/",
  user: {
    login: "authentification/login",
    signup: "users/create",
    getUserById: "users/by-id",
    getUserByNumber: "users/by-number",
  },
  transactions: {
    getTransactionsByUser: "transactions/get-transactions-by-user",
    addTransaction: "transactions/create",
  },
};
