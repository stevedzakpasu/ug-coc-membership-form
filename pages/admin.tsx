import React from "react";
import { useRouter } from "next/router";
function Admin() {
  const router = useRouter();
  return (
    <div>
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
