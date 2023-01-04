import { useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";

function Login() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
  } = useForm({ mode: "all" });
  const router = useRouter();
  const [LoginErrorAlertVisible, setLoginErrorAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (isLoggedIn === "yes") {
        router.push("/dashboard");
      }
    }
  }, []);

  const onSubmit = async (data: any) => {
    const reqData = `grant_type=&username=${data.username}&password=${data.password}&scope=&client_id=&client_secret=`;
    axios({
      method: "post",
      url: "https://ug-attendance-app.herokuapp.com/token",
      data: reqData,

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          if (typeof window !== "undefined") {
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("isLoggedIn", "yes");
          }
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setLoginErrorAlertVisible(true);
          setTimeout(() => setLoginErrorAlertVisible(false), 5000);
        } else {
          setErrorAlertVisible(true);
          setTimeout(() => setErrorAlertVisible(false), 5000);
        }
      });
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen flex-col bg-blue-900 text-white">
      <>
        {errorAlertVisible && (
          <Alert className="w-96" severity="error">
            An error occurred, please try again later!
          </Alert>
        )}{" "}
        {LoginErrorAlertVisible && (
          <Alert className="w-96" severity="error">
            Username or password incorrect!
          </Alert>
        )}
        <h1>University of Ghana Church of Christ Congregation </h1>
        <p>Member Details </p>
        <h1 className="font-semibold text-xl my-1">Login</h1>
        <p className="font-light text-sm">Enter your details below </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="font-semibold my-3">Username</p>
          <input
            className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
            type="text"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="font-normal text-xs text-red-500">
              username is mandatory{" "}
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
            Login
          </button>
          <p
            onClick={() => {
              router.push("/register");
            }}
            className=" py-5 font-light text-sm text-center cursor-pointer"
          >
            Do not have an account yet? Click here to register
          </p>
        </form>
      </>
    </div>
  );
}

export default Login;
