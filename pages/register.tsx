import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";

function CreateAccount() {
  const [conflictErrorAlertVisible, setConflictErrorAlertVisible] =
    useState(false);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
  } = useForm({ mode: "all" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn === "yes") {
        router.push("/dashboard");
      }
    }
  }, []);
  const onSubmit = async (data: any) => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    await axios
      .post(
        "https://ug-attendance-app.herokuapp.com/signup",
        JSON.stringify(data),
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.status == 200) {
          window.scrollTo(0, 0);
          setSuccessAlertVisible(true);
          setTimeout(() => setSuccessAlertVisible(false), 10000);
          reset();
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          window.scrollTo(0, 0);
          setConflictErrorAlertVisible(true);

          setTimeout(() => setConflictErrorAlertVisible(false), 5000);
        } else {
          window.scrollTo(0, 0);
          setErrorAlertVisible(true);
          setTimeout(() => setErrorAlertVisible(false), 5000);
        }
      });
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen flex-col bg-blue-900 text-white">
      {successAlertVisible && (
        <Alert className="w-96" severity="success">
          You have been successfully registered! You can now log into your
          account
        </Alert>
      )}
      {conflictErrorAlertVisible && (
        <Alert className="w-96" severity="error">
          An error occurred: Username or email address already in use!
        </Alert>
      )}
      {errorAlertVisible && (
        <Alert className="w-96" severity="error">
          An error occurred, please try again later!
        </Alert>
      )}

      <h1>University of Ghana Church of Christ Congregation </h1>
      <p>Member Details </p>
      <h1 className="font-semibold text-xl my-1">Create an account</h1>
      <p className="font-light text-sm">Enter your details below </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="font-normal text-sm mt-3">Username</p>
        <input
          className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
          type="text"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <p className="font-normal text-xs text-red-500">
            username is mandatory{" "}
          </p>
        )}{" "}
        <p className="font-normal text-sm mt-3">Full Name</p>
        <input
          className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
          type="text"
          {...register("full_name", { required: true })}
        />
        {errors.full_name && (
          <p className="font-normal text-xs text-red-500">
            full name is mandatory{" "}
          </p>
        )}{" "}
        <p className="font-normal text-sm mt-3">Email Address</p>
        <input
          className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="font-normal text-xs text-red-500">
            email is mandatory{" "}
          </p>
        )}
        <p className="font-normal text-sm mt-3">Password</p>
        <input
          className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="font-normal text-xs text-red-500">
            password is mandatory{" "}
          </p>
        )}
        <button
          type={"submit"}
          className=" my-5 w-full py-2 px-2 bg-[#0191F2] text-white  shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 font-semibold "
        >
          Register
        </button>
        <p
          onClick={() => {
            router.push("/login");
          }}
          className=" py-5 font-light text-sm text-center cursor-pointer"
        >
          Already have an account? Click here to login
        </p>
      </form>
    </div>
  );
}

export default CreateAccount;
