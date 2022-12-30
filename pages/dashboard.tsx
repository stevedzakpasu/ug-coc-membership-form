import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    full_name: null,
    email: null,
    username: null,
    member_id: null,
    member: {
      first_name: null,
      other_names: null,
      last_name: null,
      sex: null,
      phone_number: null,
      hall: null,
      room_number: null,
      programme: null,
      level: null,
      date_of_birth: null,
      congregation: null,
      committee: null,
    },
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
  } = useForm({ mode: "all" });

  const onSubmit = async (data: any) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (data.member_id) {
        axios({
          method: "patch",
          url: `https://ug-attendance-app.herokuapp.com/api/members${data.member_id}`,
          data: JSON.stringify(data),

          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.status == 200) {
              alert("successfully registered");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios({
          method: "post",
          url: "https://ug-attendance-app.herokuapp.com/api/members",
          data: JSON.stringify(data),

          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.status == 200) {
              alert("successfully registered");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
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
          .then((res) => {
            if (res.status == 200) {
              setData(res.data);
              setIsLoading(false);
            }
          })
          .catch(() => {
            localStorage.setItem("isLoggedIn", "no");
            alert("your session has expired, kindly log in again");
            router.push("/login");
          });
      }
    };
    Login();
  }, []);

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Here is the dashboard</h1>
          <p>Email: {data.email}</p>
          <p>Full Name: {data.full_name}</p>
          <p>Username:{data.username}</p>
          {data.member_id ? (
            <>
              <h1> Below are your information</h1>

              <h1>Membership ID: {data.member_id}</h1>
              <h1>First Name: {data.member.first_name}</h1>
              <h1>Other Names: {data.member.other_names}</h1>
              <h1>Last Name: {data.member.last_name}</h1>
              <h1>Gender: {data.member.sex}</h1>
              <h1>Phone Number: {data.member.phone_number}</h1>
              <h1>Hall of Residence: {data.member.hall}</h1>
              <h1>Room Number{data.member.room_number}</h1>
              <h1>Programme of Study: {data.member.programme}</h1>
              <h1>Level: {data.member.level}</h1>
              <h1>Date of birth: {data.member.date_of_birth}</h1>
              <h1>Congregation: {data.member.congregation}</h1>
              <h1>Committee: {data.member.committee}</h1>

              <p>Click here to update details</p>
            </>
          ) : (
            <>
              <h1> add your membership information below</h1>
              <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <>
                  <p>First Name:</p>
                  <input
                    type="text"
                    {...register("first_name", { required: "required" })}
                  />
                  {errors.first_name && errors.first_name.message}
                  <p>Other Names(if any):</p>
                  <input type="text" {...register("others_names")} />
                  <p>Last Name</p>
                  <input
                    type="text"
                    {...register("last_name", { required: "required" })}
                  />
                  {errors.last_name && errors.last_name.message}
                  <p>Gender</p>
                  <label htmlFor="male_field">
                    <input
                      type="radio"
                      value="male"
                      {...register("sex", {
                        required: "Required",
                      })}
                    />{" "}
                    Male
                  </label>
                  <label htmlFor="female_field">
                    <input
                      type="radio"
                      value="female"
                      {...register("sex", {
                        required: "Required",
                      })}
                    />{" "}
                    Female
                  </label>
                  {errors.sex && errors.sex.message}
                  <p>Phone Number:</p>
                  <input
                    type="text"
                    {...register("phone_number", { required: "required" })}
                  />
                  {errors.first_name && errors.first_name.message}
                  <p>Hall</p>
                  <select {...register("hall", { required: "required" })}>
                    <option value="Sey">Sey</option>
                    <option value="Nelson">Nelson</option>
                    <option value="Limann">Limann</option>
                  </select>
                  <p>Room Number:</p>
                  <input type="text" {...register("room_number")} />{" "}
                  <p>Programme of Study:</p>
                  <input type="text" {...register("programme")} />
                  <p>Level:</p>
                  <select {...register("level")}>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                  </select>
                  <p>Date of birth:</p>
                  <input type="date" {...register("date_of_birth")} />{" "}
                  <p>Congregation:</p>
                  <input type="text" {...register("congregation")} />{" "}
                  <p>Committee:</p>
                  <input type="text" {...register("committee")} />
                  <button
                    type={"submit"}
                    style={{ backgroundColor: "#a1eafb" }}
                  >
                    Register
                  </button>
                </>
              </form>
            </>
          )}

          <button
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;
