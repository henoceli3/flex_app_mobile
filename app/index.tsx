import { getUser } from "@/constants/HelperFunction";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  async function User() {
    const user = await getUser();
    if (user) {
      router.push("/home");
    } else {
      router.push("users/login");
    }
  }
  useEffect(() => {
    User();
  }, []);
  return <></>;
}
