import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import ClipLoader from "react-spinners/ClipLoader";
function CreateAccount() {
  const [conflictErrorAlertVisible, setConflictErrorAlertVisible] =
    useState(false);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
        setIsLoading(false);
        if (res.status == 200) {
          window.scrollTo(0, 0);
          setSuccessAlertVisible(true);
          setTimeout(() => setSuccessAlertVisible(false), 10000);
          reset();
        }
      })
      .catch((error) => {
        setIsLoading(false);
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
    <div className="flex items-center justify-center h-screen w-full flex-col bg-blue-200 ">
      {successAlertVisible && (
        <Alert className="my-5" severity="success">
          You have been successfully registered! You can now log into your
          account
        </Alert>
      )}
      {conflictErrorAlertVisible && (
        <Alert className="my-5" severity="error">
          An error occurred: Username or email address already in use!
        </Alert>
      )}
      {errorAlertVisible && (
        <Alert className="my-5" severity="error">
          An error occurred, please try again later!
        </Alert>
      )}
      <h1 className="text-center mx-5 font-serif font-semibold">
        University of Ghana Church of Christ Congregation{" "}
      </h1>{" "}
      <h1 className="text-center mx-5 font-serif font-semibold">
        Membership Registration
      </h1>
      <h1 className="font-semibold text-xl my-1">Create an account</h1>
      <form className="mx-5" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-semibold my-3">Username</p>
        <input
          autoCorrect="off"
          autoCapitalize="none"
          className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
          type="text"
          {...register("username", {
            required: true,
            pattern: {
              value: /^[a-z0-9_\-]{3,}$/,
              message: "enter a valid username)",
            },
          })}
        />
        {errors.username && (
          <>
            <p className="font-normal text-xs text-red-500">
              enter a valid username:
            </p>
            <p className="font-normal text-xs text-red-500">
              at least 3 characters, no uppercase, no spaces
            </p>
          </>
        )}{" "}
        <p className="font-semibold my-3">Full Name</p>
        <input
          className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
          type="text"
          {...register("full_name", { required: true })}
        />
        {errors.full_name && (
          <p className="font-normal text-xs text-red-500">
            full name is mandatory{" "}
          </p>
        )}{" "}
        <p className="font-semibold my-3">Email Address</p>
        <input
          className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
          type="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "enter a valid email",
            },
          })}
        />
        {errors.email && (
          <p className="font-normal text-xs text-red-500">
            enter a valid email{" "}
          </p>
        )}
        <p className="font-semibold my-3">Password</p>
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
          {!isLoading ? (
            <>Register</>
          ) : (
            <ClipLoader color="#36d7b7" size={20} />
          )}
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
