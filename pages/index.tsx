import { Inter } from "@next/font/google";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn === "yes") {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-full w-full flex-col bg-blue-200 text-left">
      <Head>
        <title>UG COC Registration</title>
      </Head>
      {isLoading && (
        <div className="flex items-center justify-center h-screen w-screen flex-col bg-blue-200 text-center ">
          Loading...
        </div>
      )}
    </div>
  );
}
