import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
function EditDetails() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [APIdata, setAPIData] = useState({
    full_name: null,
    email: null,
    username: null,
    member_id: null,
    member: {
      id: null,
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
    console.log(JSON.stringify(data));
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      axios({
        method: "patch",
        url: `https://ug-attendance-app.herokuapp.com/api/members/${APIdata.member_id}`,
        data: JSON.stringify(data),

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status == 200) {
            window.scrollTo(0, 0);
            setSuccessAlertVisible(true);
            setTimeout(() => setSuccessAlertVisible(false), 10000);
          }
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          setErrorAlertVisible(true);
          setTimeout(() => setErrorAlertVisible(false), 10000);
        });
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
              console.log(res.data);
              setAPIData(res.data);
              reset({
                first_name: res.data.member.first_name,
                other_names: res.data.member.other_names,
                last_name: res.data.member.last_name,
                sex: res.data.member.sex,
                phone_number: res.data.member.phone_number,
                hall: res.data.member.hall,
                room_number: res.data.member.room_number,
                programme: res.data.member.programme,
                level: res.data.member.level,
                date_of_birth: res.data.member.date_of_birth,
                congregation: res.data.member.congregation,
                committee: res.data.member.committee,
              });
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
    <div className="flex items-center justify-center h-full w-full flex-col bg-blue-900 text-left text-white">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {errorAlertVisible && (
            <Alert className="w-96" severity="error">
              An error occurred, Please try again later
            </Alert>
          )}
          <p>Welcome {APIdata.full_name}!</p>
          <p>Username: {APIdata.username}</p>
          {successAlertVisible && (
            <Alert className="w-96 z-10" severity="success">
              Your details have been succesfully updated
            </Alert>
          )}

          <>
            <h1> Modify your personal information below</h1>
            <form className="App" onSubmit={handleSubmit(onSubmit)}>
              <>
                <p className="font-semibold my-3">First Name:</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
                  type="text"
                  {...register("first_name", { required: "required" })}
                />
                {errors.first_name && errors.first_name.message}
                <p className="font-semibold my-3">Other Names(if any):</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
                  type="text"
                  {...register("other_names")}
                />
                <p className="font-semibold my-3">Last Name</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
                  type="text"
                  {...register("last_name", { required: "required" })}
                />
                {errors.last_name && errors.last_name.message}
                <p className="font-semibold my-3">Gender</p>
                <label htmlFor="male_field">
                  <input
                    type="radio"
                    value="Male"
                    {...register("sex", {
                      required: "Required",
                    })}
                  />{" "}
                  Male
                </label>
                <label htmlFor="female_field">
                  <input
                    type="radio"
                    value="Female"
                    {...register("sex", {
                      required: "Required",
                    })}
                  />{" "}
                  Female
                </label>
                {errors.sex && errors.sex.message}
                <p className="font-semibold my-3">Phone Number:</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
                  type="text"
                  {...register("phone_number", { required: "required" })}
                />
                {errors.first_name && errors.first_name.message}
                <p className="font-semibold my-3">Hall</p>
                <select
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
                  {...register("hall", { required: "required" })}
                >
                  <option value="Elizabeth Sey Hall">Elizabeth Sey Hall</option>
                  <option value="Jean Nelson Hall">Jean Nelson Hall</option>
                  <option value="Hilla Limann Hall">Hilla Limann Hall</option>
                  <option value="Alex Kwapong Hall">Alex Kwapong Hall</option>
                </select>
                <p className="font-semibold my-3">Room Number: </p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
                  type="text"
                  {...register("room_number")}
                />{" "}
                <p className="font-semibold my-3">Programme of Study:</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
                  type="text"
                  {...register("programme")}
                />
                <p className="font-semibold my-3">Level:</p>
                <select
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
                  {...register("level")}
                >
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                </select>
                <p className="font-semibold my-3">Date of birth:</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
                  type="date"
                  {...register("date_of_birth")}
                />{" "}
                <p className="font-semibold my-3">Congregation:</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
                  type="text"
                  {...register("congregation")}
                />{" "}
                <p className="font-semibold my-3">Committee:</p>
                <select
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 h-10"
                  {...register("committee")}
                >
                  {" "}
                  <option value="Evangelism">Evangelism</option>
                  <option value="Benevolence">Benevolence</option>
                  <option value="Edification">Edification</option>
                </select>
                <button
                  type={"submit"}
                  className=" my-5 w-full py-2 px-2 bg-[#0191F2] text-white  shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 font-semibold "
                >
                  Update Details
                </button>
                <p
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  className=" py-5 font-light text-sm text-center cursor-pointer"
                >
                  Click here to go back to the main dashboard
                </p>
              </>
            </form>
          </>

          <button
            className=" my-5 w-48 py-2 px-2 bg-[#0191F2] text-white  shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 font-semibold "
            onClick={async () => {
              localStorage.clear();
              await router.push("/login");
              router.reload();
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default EditDetails;
