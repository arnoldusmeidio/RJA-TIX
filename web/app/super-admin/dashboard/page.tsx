"use client";

import { Admin, Manager } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HighAdmin() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [managers, setManager] = useState<Manager[]>([]);

  useEffect(() => {
    async function getAdmins() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/admins/search`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setAdmins(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getAdmins();

    async function getManagers() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/v1/managers/search`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setManager(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getManagers();
  }, []);
  console.log(managers);

  return (
    <main className="bg-primary">
      {/* Head SuperAdmin */}
      <section className="head-admin sm:flex content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-2 py-10 pb-3 border-b-4 border-third rounded">
        <h4 className="font-lato font-medium text-center sm:text-start text-3xl text-third">
          Dashboard High Admin
        </h4>
      </section>
      {/* Head SuperAdmin */}

      {/* Count Dashboard */}
      <section className="count content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-7 mt-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                {admins.length}
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Number of Admin
              </p>
            </div>
          </div>
          <div className="card bg-secondary w-52 sm:w-64 lg:w-52 2xl:w-72 mx-auto">
            <div className="card-body">
              <h2 className="card-title font-inter text-4xl text-center xl:text-start font-semibold text-third mx-auto xl:mx-0">
                {managers.length}
              </h2>
              <p className="font-inter text-xl text-center xl:text-start font-medium text-fourth">
                Number of Manager
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Count Dashboard */}

      {/* Table List */}
      <section className="table-dashboard content-center mx-7 sm:mx-20 md:mx-10 lg:mx-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Table Admin */}
          <div className="bg-secondary p-7 rounded-2xl">
            <h4 className="font-lato font-medium text-center sm:text-start text-3xl pb-2 mb-2 text-third border-b-4 border-third rounded">
              Admin List
            </h4>
            <div className="button-add-delete flex">
              <button className="btn btn-sm bg-third text-primary hover:bg-primary hover:text-third font-inter font-semibold">
                Add Admin
              </button>
              {/* <button className="btn btn-sm ms-auto bg-primary text-third hover:bg-third hover:text-primary font-inter font-semibold">Delete Admin</button> */}
            </div>
            <div className="admin overflow-x-auto mt-3">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map admin info */}
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                      <th>{admin?.id}</th>
                      <td>{admin?.user.name}</td>
                      <td>{admin?.user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Table Admin */}

          {/* Table Manager */}
          <div className="bg-secondary p-7 rounded-2xl">
            <h4 className="font-lato font-medium text-center sm:text-start text-3xl pb-2 mb-2 text-third border-b-4 border-third rounded">
              Manager List
            </h4>
            <div className="button-add-delete flex">
              <button className="btn btn-sm bg-third text-primary hover:bg-primary hover:text-third font-inter font-semibold">
                Add Manager
              </button>
              {/* <button className="btn btn-sm ms-auto bg-primary text-third hover:bg-third hover:text-primary font-inter font-semibold">Delete Manager</button> */}
            </div>
            <div className="manager overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Cinema ID</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map manager info */}
                  {managers.map((manager) => (
                    <tr key={manager.id}>
                      <th>{manager?.id}</th>
                      <td>{manager?.user.name}</td>
                      <td>{manager?.cinema[0]?.name}</td>
                      <td>{manager?.user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Table Manager */}
        </div>
      </section>
      {/* Table List */}
    </main>
  );
}
