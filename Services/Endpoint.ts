export const Endpoint = {
  baseUrl: "http://http://ec2-3-89-6-108.compute-1.amazonaws.com:4000//",
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
