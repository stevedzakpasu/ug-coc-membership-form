import axios from "axios";
import Head from "next/head";
import router from "next/router";
import React, { useEffect, useState } from "react";

export default function Events() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
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
          .then(async (res) => {
            if (res.status == 200) {
              if (!res.data.is_admin) {
                router.push("/dashboard");
              } else {
                setIsAdmin(true);
              }
            }
          })
          .catch(() => {
            localStorage.setItem("isLoggedIn", "no");
            alert("Your session has expired, kindly log in again");
            router.push("/login");
          });
      }
    };

    Login();
  }, [isAdmin]);
  return (
    <div className="flex items-center justify-center h-screen w-full flex-col bg-blue-200 ">
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      {isAdmin ? (
        <>
          <h1 className="font-semibold text-2xl font-serif my-10">
            Welcome Admin!{" "}
          </h1>
          <button>Members Information</button>
          <button>Events Information</button>
          <button>Stat Information</button>

          <button
            onClick={() => {
              router.push("/login");
              localStorage.clear();
            }}
            className="bg-blue-300"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <p>You do not have rights to see this page</p>
        </>
      )}
    </div>
  );
}
