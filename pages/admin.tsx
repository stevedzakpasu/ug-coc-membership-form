import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
function Admin() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <h1>this is the admin dashboard</h1>

      <button
        onClick={() => {
          router.push("/login");
          localStorage.clear();
        }}
        className="bg-amber-300"
      >
        Logout
      </button>
    </div>
  );
}

export default Admin;
