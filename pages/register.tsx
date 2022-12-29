import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

const onSubmit = (values: any) => {};

function CreateAccount() {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
  } = useForm({ mode: "all" });

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
          alert("Successfully registered");
          // modal to show that the login was successfull
          // ondismiss modal: push login
        }
      })
      .catch((res) => {
        alert(
          "An error occurred: Username or email address already in use! Consider login if you already have an account!"
        );
      });
  };
  return (
    <>
      <p className="title">Registration Form</p>

      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <p>Username:</p>
        <input type="text" {...register("username", { required: true })} />
        {errors.username && (
          <span style={{ color: "red" }}>*Username* is mandatory </span>
        )}
        <p>Full Name:</p>
        <input type="text" {...register("full_name", { required: true })} />
        {errors.full_name && (
          <span style={{ color: "red" }}>*Full Name* is mandatory </span>
        )}
        <p>Email</p>
        <input type="email" {...register("email", { required: true })} />
        {errors.email && (
          <span style={{ color: "red" }}>*Email* is mandatory </span>
        )}
        <p>Password</p>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && (
          <span style={{ color: "red" }}>*Password* is mandatory </span>
        )}
        <button type={"submit"} style={{ backgroundColor: "#a1eafb" }}>
          Register
        </button>
      </form>

      <button onClick={() => router.push("/login")}>
        click me to go to the login page
      </button>
    </>
  );
}

export default CreateAccount;
