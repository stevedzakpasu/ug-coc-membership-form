import axios from "axios";
import router from "next/router";
import React, { useCallback, useEffect, useState } from "react";

export default function Members() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [detail, setDetail] = useState({});
  const [tableVisible, setTableVisible] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [membersData, setMembersData] = useState([
    {
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
      id: null,
      events_attended: null,
    },
  ]);

  const MembersDetails = (props: any) => {
    return (
      <div className="mx-10">
        <div className="w-full flex-col flex mt-7">
          <span>
            <p
              className="cursor-pointer"
              onClick={() => {
                setDetailsVisible(false);
                setTableVisible(true);
                setDetail({});
              }}
            >
              Back
            </p>
          </span>
          <h1 className="text-lg font-medium text-gray-500">
            First Name: {props.info.first_name}
          </h1>
          <h1 className="text-lg font-medium text-gray-500">
            Last Name:{props.info.last_name}
          </h1>
        </div>
      </div>
    );
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
              if (!res.data.is_admin) {
                router.push("/dashboard");
              } else {
                setIsAdmin(true);
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
  }, [isAdmin]);

  const UserData = membersData.map((info) => {
    return (
      <tr key={info.first_name}>
        <td
          scope="row"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider"
        >
          {info.id}
        </td>{" "}
        <td
          scope="row"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider"
        >
          {info.first_name}
        </td>
        <td
          scope="row"
          className=" text-center text-xs font-medium text-gray-500 tracking-wider"
        >
          {info.last_name}
        </td>
        <td
          scope="row"
          className=" text-center text-xs font-medium text-gray-500 tracking-wider"
        >
          {info.level}
        </td>
        <td
          scope="row"
          className=" text-center text-xs font-medium text-gray-500 tracking-wider"
          onClick={() => {
            setDetail(info);
            setTableVisible(false);
            setDetailsVisible(true);
          }}
        >
          More Info
        </td>
      </tr>
    );
  });

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      };

      await axios
        .get(
          "https://ug-attendance-app.herokuapp.com/api/members/?offset=0&limit=1000",
          { headers: headers }
        )
        .then((res) => {
          setMembersData(res.data);
          console.log(membersData.length);
        });
    }
    fetchData();
  }, []);
  return (
    <div className="m-6">
      {detailsVisible && <MembersDetails info={detail} />}

      {isAdmin ? (
        <>
          {tableVisible && (
            <>
              <p>Number of members = {membersData.length}</p>
              <table className="min-w-full divide-y h-10 divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      MEMBERSHIP ID
                    </th>{" "}
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      FIRST NAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      LAST NAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      LEVEL
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {UserData}
                </tbody>
              </table>
            </>
          )}
        </>
      ) : (
        <p> </p>
      )}
    </div>
  );
}
