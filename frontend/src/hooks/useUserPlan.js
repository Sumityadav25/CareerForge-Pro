import { useEffect, useState } from "react";
import axios from "../api";

export default function useUserPlan() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/auth/me");
      setUser(res.data);

      localStorage.setItem("plan", res.data.plan);
      if (res.data.trialStart)
        localStorage.setItem("trialStart", res.data.trialStart);
    };
    fetchUser();
  }, []);

  return user;
}
