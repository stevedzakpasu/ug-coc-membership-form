import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function Admin() {
  const router = useRouter();
  const [membersData, setMembersData] = useState([]);
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
    if (isAdmin) {
      fetchData();
    }
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
          <button onClick={() => router.push("/admin/members")}>
            Members Information
          </button>
          <button onClick={() => router.push("/admin/events")}>
            Events Information
          </button>
          <button onClick={() => router.push("/admin/stats")}>
            {" "}
            Stat Information
          </button>

          <button
            onClick={() => {
              router.push("/login");
              localStorage.setItem("isLoggedIn", "no");
            }}
            className="bg-blue-300"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <p></p>
        </>
      )}
    </div>
  );
}

export default Admin;
