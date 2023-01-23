import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function Admin() {
  const router = useRouter();
  const [membersData, setMembersData] = useState([]);

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
  }, []);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      };

      await axios
        .get(
          "https://ug-attendance-app.herokuapp.com/api/members/?offset=0&limit=1000",
          { headers: headers }
        )
        .then((res) => {
          setMembersData(res.data);
          console.log(membersData.length);
        });
    }
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full flex-col bg-blue-200 ">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
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
    </div>
  );
}

export default Admin;
