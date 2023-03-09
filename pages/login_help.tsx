import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import ClipLoader from "react-spinners/ClipLoader";
import Head from "next/head";

function LoginHelp() {
  interface User {
    full_name: string;
    age: number;
    email: string;
  }
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: "all" });
  const router = useRouter();
  const [usersData, setUsersData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    await axios({
      method: "get",
      url: "https://ug-attendance-app.herokuapp.com/users/public/all/?offset=0&limit=1000",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      if (response.status == 200) {
        setUsersData(response.data);
        // so this function should run an
        setSearchResults(
          response.data.filter((result: any) =>
            result.full_name.toLowerCase().includes(data.name.toLowerCase())
          )
        );
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen w-full flex-col bg-blue-200 ">
      <Head>
        <title>Get help login in!</title>
      </Head>
      <h1 className="text-center mx-5 font-serif font-semibold">
        University of Ghana Church of Christ Congregation{" "}
      </h1>{" "}
      <h1 className="text-center mx-5 font-serif font-semibold">
        Membership Registration
      </h1>
      <h1 className="font-semibold text-xl my-1">Get help login in!</h1>
      <form className="mx-5" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-semibold my-3">Enter your name</p>
        <input
          autoCorrect="off"
          autoCapitalize="none"
          className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
          type="text"
          {...register("name", {
            required: true,
          })}
        />
        {!isLoading ? (
          <button
            className=" my-5 w-full py-2 px-2 bg-[#0191F2] text-white  shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 font-semibold "
            type={"submit"}
          >
            Search
          </button>
        ) : (
          <button
            className=" my-5 w-full py-2 px-2 bg-[#0191F2] text-white  shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 font-semibold "
            disabled
          >
            <ClipLoader color="#36d7b7" size={20} />
          </button>
        )}
        <p
          onClick={() => {
            router.push("/register");
          }}
          className=" py-5 font-light text-sm text-center cursor-pointer"
        >
          Do not have an account yet? Click here to register
        </p>{" "}
        <p
          onClick={() => {
            router.push("/login");
          }}
          className=" py-5 font-light text-sm text-center cursor-pointer"
        >
          Click here to login
        </p>
      </form>
    </div>
  );
}

export default LoginHelp;
