import React, { Suspense, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import HobbyGroup from "./HobbyGroup";
import { Helmet } from "react-helmet-async";

const HobbyGroups = () => {
  const groupsData = useLoaderData();
  return (
    <>
      <Helmet>
        <title>All Groups | HobbyHub</title>
      </Helmet>
      <div>
        <div className="p-6 md:p-6  text-center ">
          <h1 className="text-3xl text-primary font-bold">All Groups</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-2 mt-5">
          <Suspense fallback={<h2>Laoding..</h2>}>
            {groupsData.length > 0 ? (
              groupsData.map((group) => (
                <HobbyGroup key={group._id} group={group} />
              ))
            ) : (
              <p>No groups available.</p>
            )}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default HobbyGroups;
