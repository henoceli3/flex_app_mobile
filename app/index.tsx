import { getUser } from "@/constants/HelperFunction";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  async function User() {
    const user = await getUser();
    if (user) {
      if (user.role_id === 2) {
        router.push("/profiles/standard/standard-home");
      } else if (user.role_id === 4) {
        router.push("/profiles/agents/agent-home");
      }
    } else {
      router.push("users/login");
    }
  }
  useEffect(() => {
    User();
  }, []);
  return <></>;
}
