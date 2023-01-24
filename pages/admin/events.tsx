import axios from "axios";
import Head from "next/head";
import router from "next/router";
import React, { useEffect, useState } from "react";

export default function Events() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [detail, setDetail] = useState({});
  const [tableVisible, setTableVisible] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [eventsData, setEventsData] = useState([
    {
      name: null,
      id: null,
      semester: null,
      category: null,
      members_attended: [],
      created_on: null,
    },
  ]);

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
          "https://ug-attendance-app.herokuapp.com/api/events/?offset=0&limit=1000",
          { headers: headers }
        )
        .then((res) => {
          setEventsData(res.data);
        });
    }
    fetchData();
  }, []);

  const EventData = eventsData.map((info) => {
    return (
      <tr key={info.id}>
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
          {info.name}
        </td>{" "}
        <td
          scope="row"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider"
        >
          {info.category}
        </td>{" "}
        <td
          scope="row"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider"
        >
          {info.semester}
        </td>{" "}
        <td
          scope="row"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider"
        >
          {info.created_on}
        </td>{" "}
        <td
          scope="row"
          className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider"
        >
          {info.members_attended.length}
        </td>{" "}
        <td
          scope="row"
          className=" text-center text-xs font-medium text-gray-500 tracking-wider cursor-pointer"
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

  const EventsDetails = (props: any) => {
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
          </span>{" "}
          <h1 className="text-lg font-medium text-gray-500">
            Event ID: {props.info.id}
          </h1>{" "}
          <h1 className="text-lg font-medium text-gray-500">
            Event Name: {props.info.name}
          </h1>{" "}
          <h1 className="text-lg font-medium text-gray-500">
            Event Date: {props.info.created_on}
          </h1>{" "}
          <h1 className="text-lg font-medium text-gray-500">
            Event Category: {props.info.category}
          </h1>{" "}
          <h1 className="text-lg font-medium text-gray-500">
            Semester: {props.info.semester}
          </h1>{" "}
          <h1 className="text-lg font-medium text-gray-500">
            Members Attended: ({props.info.members_attended.length})
            <ol>
              {props.info.members_attended.map((i: any) => (
                <li key={props.info.members_attended.id}>
                  {i.first_name} {i.last_name}
                </li>
              ))}
            </ol>
          </h1>
          <h1 className="text-lg font-medium text-gray-500">
            Delete member Danger zone
          </h1>{" "}
        </div>
      </div>
    );
  };

  return (
    <div className="m-6">
      {detailsVisible && <EventsDetails info={detail} />}

      {isAdmin ? (
        <>
          {tableVisible && (
            <>
              <h1
                className="cursor-pointer"
                onClick={() => router.push("/admin")}
              >
                Back home
              </h1>
              <p>Number of events = {eventsData.length}</p>
              <table className="min-w-full divide-y h-10 divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      EVENT ID
                    </th>{" "}
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      EVENT NAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CATEGORY
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      SEMESTER
                    </th>{" "}
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CREATED ON
                    </th>{" "}
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      MEMBERS ATTENDED
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {EventData}
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
