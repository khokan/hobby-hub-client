import React, { Suspense, useEffect } from "react";
import { useState } from "react";
import { auth } from "../../../firebase/firebase.config";
import HobbyGroup from "./HobbyGroup";
import { Link, useLoaderData } from "react-router";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const MyGroups = () => {
  const user = auth.currentUser;
  const data = useLoaderData();
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    const filtered = data
      .filter((group) => group.userEmail === user.email)
      .map((group) => ({
        ...group,
        startDate: format(new Date(group.startDate), "dd-MMM-yyyy"),
      }));
    setSubscriptions(filtered);
  }, [data]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://b11a10-server-side-khokan77.vercel.app/groups/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = subscriptions.filter((sub) => sub._id !== id);
              setSubscriptions(remaining);
              toast.success("Group deletion successful");
            }
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>My Groups | HobbyHub</title>
      </Helmet>

      <div className="bg-base-200 p-4 md:p-6 lg:p-10 rounded-box shadow-lg">
        <div className="p-6 md:p-6  text-center ">
          <h1 className="text-3xl text-primary font-bold">My Groups</h1>
        </div>

        <div className="overflow-x-auto w-full border border-base-300 rounded-box shadow">
          <table className="table w-full min-w-[600px]">
            {/* Head */}
            <thead className="bg-gradient-to-r from-blue-100 to-slate-100 text-base-content">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {subscriptions.map((user, index) => (
                <tr key={user._id} className="hover:bg-base-100 transition">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10 md:w-12 md:h-12">
                          <img src={user.imageUrl} alt="User Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{user.groupName}</div>
                        <div className="text-sm text-accent">
                          {user.hobbyCategory}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm">{user.userEmail}</td>
                  <td className="text-sm">
                    {format(new Date(user.startDate), "dd-MMM-yyyy")}
                  </td>
                  <td className="flex flex-col md:flex-row md:items-center gap-2 justify-center mt-2 md:mt-0">
                    <Link
                      to={`/updateGroup/${user._id}`}
                      className="btn btn-xs btn-primary"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-xs btn-secondary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyGroups;
