import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import QRCode from "react-qr-code";
import * as CryptoJS from "crypto-js";
import ClipLoader from "react-spinners/ClipLoader";
function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [encryptedData, setEncryptedData] = useState("");
  const [data, setData] = useState({
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
      date_of_birth: null,
      phone_number: null,
      hall: null,
      room_number: null,
      programme: null,
      level: null,
      congregation: null,
      committee_1: null,
      committee_2: null,
      committee_3: null,
      emergency_contact_name: null,
      emergency_contact_relationship: null,
      emergency_contact_phone_number: null,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: "all" });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

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
          setIsSubmitting(false);

          if (response.status == 200) {
            window.scrollTo(0, 0);
            setSuccessAlertVisible(true);
            setTimeout(() => {
              setSuccessAlertVisible(false);
              router.reload();
            }, 5000);
          }
        })
        .catch((error) => {
          setIsSubmitting(false);

          window.scrollTo(0, 0);
          setErrorAlertVisible(true);
          setTimeout(() => setErrorAlertVisible(false), 5000);
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
          .then(async (res) => {
            if (res.status == 200) {
              if (res.data.is_admin) {
                router.push("/admin");
              } else {
                setData(res.data);
                setIsLoading(false);
              }
            }
          })
          .catch(() => {
            localStorage.setItem("isLoggedIn", "no");
            alert("Your session has expired, kindly log in again");
            router.push("/login");
          });
      }
    };

    Login();
  }, []);
  useEffect(() => {
    setEncryptedData(
      CryptoJS.AES.encrypt(
        JSON.stringify(data.member),
        "XkhZG4fW2t2W"
      ).toString()
    );
  }, [data]);

  return (
    <div className="flex items-center justify-center h-full w-full flex-col bg-blue-200 text-left ">
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full flex-col bg-blue-200 text-center ">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full flex-col bg-blue-200 text-left ">
          {successAlertVisible && (
            <Alert className="my-5" severity="success">
              You have successfully added your details!
            </Alert>
          )}
          {errorAlertVisible && (
            <Alert className="my-5" severity="error">
              An error occurred, please try again later!
            </Alert>
          )}
          <h1 className="font-semibold text-2xl font-serif my-10">
            Welcome {data.full_name}!{" "}
          </h1>

          {data.member_id ? (
            <div className="mx-10 text-left">
              <h1 className="my-5">
                <p className="font-bold">Membership ID:</p>
                {data.member_id}
              </h1>
              <h1 className="y-5">
                <p className="font-bold">First Name:</p>
                {data.member.first_name}
              </h1>
              <h1 className="my-5">
                <p className="font-bold">Other Names:</p>

                {data.member.other_names}
              </h1>
              <h1 className="my-5">
                <p className="font-bold">Last Name:</p>

                {data.member.last_name}
              </h1>
              <h1 className="my-5">
                <p className="font-bold">Gender:</p>
                {data.member.sex}
              </h1>
              <h1 className="my-5">
                <p className="font-bold">Date of birth:</p>

                {data.member.date_of_birth}
              </h1>
              <h1 className="my-5">
                <p className="font-bold">Phone Number:</p>

                {data.member.phone_number}
              </h1>
              <h1 className="my-5">
                <p className="font-bold">Hall of Residence:</p>
                {data.member.hall}
              </h1>
              <h1 className="my-5">
                <p className="font-bold">Room Number:</p>
                {data.member.room_number}
              </h1>
              <h1 className="my-5">
                <p className="font-bold">Programme of Study:</p>

                {data.member.programme}
              </h1>
              <h1 className="my-5">
                <p className="font-bold">Level:</p>

                {data.member.level}
              </h1>
              <h1 className="my-5">
                <p className="font-bold">Congregation:</p>

                {data.member.congregation}
              </h1>
              {data.member.committee_1 && (
                <h1 className="my-5">
                  <p className="font-bold">Committee :</p>

                  {data.member.committee_1}
                </h1>
              )}{" "}
              {data.member.committee_2 && (
                <h1 className="my-5">
                  <p className="font-bold"> Additional Committee 1:</p>

                  {data.member.committee_2}
                </h1>
              )}{" "}
              {data.member.committee_3 && (
                <h1 className="my-5">
                  <p className="font-bold"> Additional Committee 2:</p>

                  {data.member.committee_3}
                </h1>
              )}
              <h1 className="my-5">
                <p className="font-bold"> Name of Next of Kin: </p>

                {data.member.emergency_contact_name}
              </h1>{" "}
              <h1 className="my-5">
                <p className="font-bold">Relationship to Next of Kin: </p>

                {data.member.emergency_contact_relationship}
              </h1>{" "}
              <h1 className="my-5">
                <p className="font-bold">Phone Number of Next of Kin: </p>

                {data.member.emergency_contact_phone_number}
              </h1>
              <div>
                <h1 className="py-5 text-center font-extrabold">
                  Here is your QR Code
                </h1>
                <p className="text-xs font-semibold">
                  {" "}
                  This code will be scanned at the registration table to mark
                  you present
                </p>
                <QRCode
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={encryptedData}
                  level="Q"
                  className="p-7 my-5 bg-white  "
                />
              </div>
              <button
                onClick={() => router.push("/dashboard/edit_details")}
                className=" my-5 w-full py-2 px-2 bg-[#000000] text-white  shadow-md hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 font-semibold justify-center items-center "
              >
                Update Details
              </button>
            </div>
          ) : (
            <>
              <form className="App" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="font-medium text-sm">
                  {" "}
                  Kindly fill the form below with the respective information
                </h1>
                <div className=" w-full">
                  <p className="font-semibold my-3">First Name:</p>
                  <input
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    type="text"
                    {...register("first_name", { required: true })}
                  />
                  {errors.first_name && (
                    <p className="font-normal text-xs text-red-500">
                      first name is mandatory{" "}
                    </p>
                  )}
                  <p className="font-semibold my-3">Other Names(if any):</p>
                  <input
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    type="text"
                    {...register("others_names")}
                  />
                  <p className="font-semibold my-3">Last Name</p>
                  <input
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    type="text"
                    {...register("last_name", { required: true })}
                  />
                  {errors.last_name && (
                    <p className="font-normal text-xs text-red-500">
                      last name is mandatory{" "}
                    </p>
                  )}
                  <p className="font-semibold my-3">Gender</p>
                  <label
                    className="ml-2 text-sm font-medium text-gray-900 "
                    htmlFor="male_field"
                  >
                    <input
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                      type="radio"
                      value="Male"
                      {...register("sex", {
                        required: true,
                      })}
                    />{" "}
                    Male
                  </label>
                  <label
                    className="ml-2 text-sm font-medium text-gray-900"
                    htmlFor="female_field"
                  >
                    <input
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                      type="radio"
                      value="Female"
                      {...register("sex", {
                        required: true,
                      })}
                    />{" "}
                    Female
                  </label>
                  {errors.sex && (
                    <p className="font-normal text-xs text-red-500">
                      select a gender
                    </p>
                  )}
                  <p className="font-semibold my-3">Date of birth:</p>
                  <input
                    type="date"
                    {...register("date_of_birth", { required: true })}
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                  />{" "}
                  {errors.date_of_birth && (
                    <p className="font-normal text-xs text-red-500">
                      date of birth is mandatory{" "}
                    </p>
                  )}
                  <p className="font-semibold my-3">Phone Number:</p>
                  <input
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    type="text"
                    {...register("phone_number", { required: true })}
                  />
                  {errors.phone_number && (
                    <p className="font-normal text-xs text-red-500">
                      phone number is mandatory{" "}
                    </p>
                  )}
                  <p className="font-semibold my-3">Hall</p>
                  <select
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    {...register("hall", { required: true })}
                  >
                    <option disabled selected value={""}>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    <option value="Elizabeth Sey Hall">
                      Elizabeth Sey Hall
                    </option>
                    <option value="Jean Nelson Hall">Jean Nelson Hall</option>
                    <option value="Hilla Limann Hall">Hilla Limann Hall</option>
                    <option value="Alex Kwapong Hall">Alex Kwapong Hall</option>
                  </select>
                  {errors.hall && (
                    <p className="font-normal text-xs text-red-500">
                      select an option{" "}
                    </p>
                  )}
                  <p className="font-semibold my-3">Room Number: </p>
                  <input
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    type="text"
                    {...register("room_number")}
                  />
                  <p className="font-semibold my-3">Programme of Study:</p>
                  <input
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    type="text"
                    {...register("programme")}
                  />
                  <p className="font-semibold my-3">Level:</p>
                  <select
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    {...register("level", { required: true })}
                  >
                    <option disabled selected value={""}>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                  </select>
                  {errors.level && (
                    <p className="font-normal text-xs text-red-500">
                      select an option{" "}
                    </p>
                  )}
                  <p className="font-semibold my-3">Local congregation:</p>
                  <input
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    type="text"
                    {...register("congregation", { required: true })}
                  />{" "}
                  {errors.congregation && (
                    <p className="font-normal text-xs text-red-500">
                      congregation is mandatory{" "}
                    </p>
                  )}
                  <p className="font-semibold my-3">Main Committee:</p>
                  <select
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    {...register("committee_1", { required: true })}
                  >
                    <option disabled selected value={""}>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    <option value="None">None</option>
                    <option value="Evangelism">Evangelism</option>
                    <option value="Benevolence">Benevolence</option>
                    <option value="Edification">Edification</option>
                  </select>
                  {errors.committee_1 && (
                    <p className="font-normal text-xs text-red-500">
                      select an option{" "}
                    </p>
                  )}
                  <p className="font-semibold my-3">
                    Additional Committee 1 (if any):
                  </p>
                  <select
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    {...register("committee_2", { required: true })}
                  >
                    <option disabled selected value={""}>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    <option value="None">None</option>
                    <option value="Benevolence">Benevolence</option>
                    <option value="Benevolence">Benevolence</option>
                    <option value="Edification">Edification</option>
                  </select>
                  {errors.committee_2 && (
                    <p className="font-normal text-xs text-red-500">
                      select an option{" "}
                    </p>
                  )}
                  <p className="font-semibold my-3">
                    Additional Committee 2 (if any):
                  </p>
                  <select
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    {...register("committee_3", { required: true })}
                  >
                    <option disabled selected value={""}>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    <option value="None">None</option>
                    <option value="Evangelism">Evangelism</option>
                    <option value="Benevolence">Benevolence</option>
                    <option value="Edification">Edification</option>
                  </select>
                  {errors.committee_3 && (
                    <p className="font-normal text-xs text-red-500">
                      select an option{" "}
                    </p>
                  )}
                  <p className="font-semibold my-3">Name of Next of Kin: </p>
                  <input
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    type="text"
                    {...register("emergency_contact_name", { required: true })}
                  />{" "}
                  {errors.emergency_contact_name && (
                    <p className="font-normal text-xs text-red-500">
                      next of kin is mandatory{" "}
                    </p>
                  )}{" "}
                  <p className="font-semibold my-3">
                    Relationship to of Next of Kin:{" "}
                  </p>
                  <input
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    type="text"
                    {...register("emergency_contact_relationship", {
                      required: true,
                    })}
                  />{" "}
                  {errors.emergency_contact_relationship && (
                    <p className="font-normal text-xs text-red-500">
                      next of kin is mandatory{" "}
                    </p>
                  )}{" "}
                  <p className="font-semibold my-3">
                    Phone Number of Next of Kin:{" "}
                  </p>
                  <input
                    className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                    type="text"
                    {...register("emergency_contact_phone_number", {
                      required: true,
                    })}
                  />{" "}
                  {errors.emergency_contact_phone_number && (
                    <p className="font-normal text-xs text-red-500">
                      next of kin is mandatory{" "}
                    </p>
                  )}
                  <button
                    className=" my-5 w-full py-2 px-2 bg-[#0191F2] text-white  shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 font-semibold "
                    type={"submit"}
                  >
                    {!isSubmitting ? (
                      <>Register</>
                    ) : (
                      <ClipLoader color="#36d7b7" size={20} />
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          <button
            className=" my-5 w-48 py-2 px-2 bg-[#e8431e] text-white  shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 font-semibold "
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
