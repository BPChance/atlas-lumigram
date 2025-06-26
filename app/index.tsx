import { useRouter, useNavigationContainerRef } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();
  const navRef = useNavigationContainerRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/login");
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
