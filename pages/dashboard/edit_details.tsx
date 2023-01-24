import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import ClipLoader from "react-spinners/ClipLoader";
import Head from "next/head";
function EditDetails() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const committees = [
    "None",
    "Visitation",
    "Benevolence",
    "Edification",
    "Organizing",
    "Evangelism",
    "Secretariat ",
    "Finance ",
  ];
  const halls = [
    "Non-Resident",
    "Alexander Kwapong Hall",
    "Elizabeth Sey Hall",
    "Dr. Hilla Limann Hall",
    "Jean Nelson Hall",
    "Jubilee Hall",
    "International Students Hostel 1",
    "International Students Hostel 2",
    "Vikings Hostel",
    "Mensah Sarbah Main Hall",
    "Mensah Sarbah Hall Annex A",
    "Mensah Sarbah Hall Annex B",
    "Mensah Sarbah Hall Annex C",
    "Mensah Sarbah Hall Annex D",
    "Akuafo Main Hall",
    "Akuafo Hall Annex A",
    "Akuafo Hall Annex B",
    "Akuafo Hall Annex C",
    "Akuafo Hall Annex D",
    "Legon Main Hall",
    "Legon Hall Annex A",
    "Legon Hall Annex B",
    "Legon Hall Annex C",
    "Commonwealth Hall",
    "Volta Hall",
    "Valco Hostel 1",
    "Valco Hostel 2",
    "African Union Hostel (Pent)",
    "James Topp Yankah Hall (TF)",
    "Evandy Hostel",
    "Heaven's Gate Hostel",
    "Bani Hostel",
  ];
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
    reset,
  } = useForm({ mode: "all" });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
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
          setIsSubmitting(false);
          if (response.status == 200) {
            window.scrollTo(0, 0);
            setSuccessAlertVisible(true);
            setTimeout(() => setSuccessAlertVisible(false), 5000);
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
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              setAPIData(res.data);
              reset({
                first_name: res.data.member.first_name,
                other_names: res.data.member.other_names,
                last_name: res.data.member.last_name,
                sex: res.data.member.sex,
                date_of_birth: res.data.member.date_of_birth,
                phone_number: res.data.member.phone_number,
                hall: res.data.member.hall,
                room_number: res.data.member.room_number,
                programme: res.data.member.programme,
                level: res.data.member.level,
                congregation: res.data.member.congregation,
                committee_1: res.data.member.committee_1,
                committee_2: res.data.member.committee_2,
                committee_3: res.data.member.committee_3,
                emergency_contact_name: res.data.member.emergency_contact_name,
                emergency_contact_relationship:
                  res.data.member.emergency_contact_relationship,
                emergency_contact_phone_number:
                  res.data.member.emergency_contact_phone_number,
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
    <div className="flex items-center justify-center h-full w-full flex-col bg-blue-200 text-left">
      <Head>
        <title>Edit details</title>
      </Head>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen w-screen flex-col bg-blue-200 text-center ">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          {errorAlertVisible && (
            <Alert className="my-5" severity="error">
              An error occurred, Please try again later
            </Alert>
          )}

          {successAlertVisible && (
            <Alert className="my-5" severity="success">
              Your details have been successfully updated
            </Alert>
          )}

          <>
            <h1 className="font-semibold text-2xl font-serif my-10">
              Welcome {APIdata.full_name}!{" "}
            </h1>
            <form className="mx-5" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="font-medium text-sm text-center">
                {" "}
                Modify your personal information below
              </h1>
              <>
                <p className="font-semibold my-3">First Name:</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                  type="text"
                  {...register("first_name", { required: "required" })}
                />
                {errors.first_name && errors.first_name.message}
                <p className="font-semibold my-3">Other Names(if any):</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                  type="text"
                  {...register("other_names")}
                />
                <p className="font-semibold my-3">Last Name</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                  type="text"
                  {...register("last_name", { required: "required" })}
                />
                {errors.last_name && errors.last_name.message}
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
                      required: "Required",
                    })}
                  />{" "}
                  Male
                </label>
                <label
                  className="ml-2 text-sm font-medium text-gray-900 "
                  htmlFor="female_field"
                >
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                    type="radio"
                    value="Female"
                    {...register("sex", {
                      required: "Required",
                    })}
                  />{" "}
                  Female
                </label>
                {errors.sex && errors.sex.message}
                <p className="font-semibold my-3">Date of birth:</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                  type="date"
                  {...register("date_of_birth")}
                />{" "}
                <p className="font-semibold my-3">Phone Number:</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                  type="text"
                  {...register("phone_number", { required: "required" })}
                />
                {errors.first_name && errors.first_name.message}
                <p className="font-semibold my-3">Hall</p>
                <select
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                  {...register("hall", { required: "required" })}
                >
                  <option disabled selected value={""}>
                    {" "}
                    -- select an option --{" "}
                  </option>
                  {halls.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <p className="font-semibold my-3">Room Number: </p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                  type="text"
                  {...register("room_number")}
                />{" "}
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
                  <option value="500">500</option>
                  <option value="600">600</option>
                  <option value="700">700</option>
                  <option value="800">800</option>
                  <option value="900">900</option>
                  <option value="Not a student">Not a student</option>
                </select>
                <p className="font-semibold my-3">Local congregation:</p>
                <input
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                  type="text"
                  {...register("congregation")}
                />{" "}
                <p className="font-semibold my-3">Committee:</p>
                <select
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                  {...register("committee_1")}
                >
                  <option disabled selected value={""}>
                    {" "}
                    -- select an option --{" "}
                  </option>
                  {committees.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <p className="font-semibold my-3">
                  Additional Committee 1 (if any):
                </p>
                <select
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                  {...register("committee_2")}
                >
                  <option disabled selected value={""}>
                    {" "}
                    -- select an option --{" "}
                  </option>
                  {committees.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                {errors.committee && (
                  <p className="font-normal text-xs text-red-500">
                    select an option{" "}
                  </p>
                )}
                <p className="font-semibold my-3">
                  Additional Committee 2 (if any):
                </p>
                <select
                  className="bg-[#D6EDFF] text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10"
                  {...register("committee_3")}
                >
                  <option disabled selected value={""}>
                    {" "}
                    -- select an option --{" "}
                  </option>
                  {committees.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                {errors.committee && (
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
                {!isSubmitting ? (
                  <button
                    className=" my-5 w-full py-2 px-2 bg-[#0191F2] text-white  shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 font-semibold "
                    type={"submit"}
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    className=" my-5 w-full py-2 px-2 bg-[#0191F2] text-white  shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 font-semibold "
                    disabled
                  >
                    <ClipLoader color="#36d7b7" size={20} />
                  </button>
                )}
                <button
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  className=" my-5 w-full py-2 px-2 bg-[#000000] text-white  shadow-md hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 font-semibold "
                >
                  Go Back To Dashboard
                </button>
              </>
            </form>
          </>

          <button
            className=" my-5 w-48 py-2 px-2 bg-[#e8431e] text-white  shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 font-semibold "
            onClick={() => {
              localStorage.setItem("isLoggedIn", "no");
              router.push("/login");
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
