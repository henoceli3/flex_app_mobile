import { useEffect } from "react";
import Login from "./login";
import { router } from "expo-router";
import { getUser } from "@/constants/HelperFunction";

export default function Index() {
  async function User() {
    const user = await getUser();
    if (user) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }
  useEffect(() => {
    User();
  }, []);
  return <></>;
}
