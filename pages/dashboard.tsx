import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();
  const Login = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      };

      await axios
        .get("https://ug-attendance-app.herokuapp.com/users/me", {
          headers: headers,
        })
        .then((res) => {
          if (res.status == 200) {
            alert("Successfully logged in");
          }
        })
        .catch((error) => {
          alert("Please login again to continue");
          router.push("/login");
        });
    }
  };
  return (
    <div>
      <button onClick={() => Login()}>Login</button>
    </div>
  );
}

export default Dashboard;
