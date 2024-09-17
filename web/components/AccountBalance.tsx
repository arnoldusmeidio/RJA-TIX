"use client";

import { User } from "@/types";
import { useEffect, useState } from "react";

export default function AccountBalance() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUser() {
      try {
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/users`,
          {
            credentials: "include",
          }
        );
        const data = await user.json();
        setUser(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  return <span className="ms-2 text-third">{user?.wallet.balance},00</span>;
}
