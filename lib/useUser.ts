import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await fetch("/api/auth/user", options);

        const json_response = await response.json();

        if (json_response.success) {
          setUser(json_response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return user;
}
