import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";

function Login() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
  } = useForm({ mode: "all" });
  const router = useRouter();

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
          }
          router.push("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <p className="title">Login</p>

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <p>Username:</p>
        <input type="text" {...register("username", { required: true })} />
        {errors.username && (
          <span style={{ color: "red" }}>*Username* is mandatory </span>
        )}

        <p>Password</p>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && (
          <span style={{ color: "red" }}>*Password* is mandatory </span>
        )}
        <button type={"submit"} style={{ backgroundColor: "#a1eafb" }}>
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
