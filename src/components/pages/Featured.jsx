import { format, startOfToday } from "date-fns";
import React, { use, useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useLoaderData } from "react-router";

const Featured = () => {
  const userData = useLoaderData();
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    const filtered = userData
      .filter((group) => new Date(group.startDate) >= startOfToday())
      .map((group) => ({
        ...group,
        startDate: format(new Date(group.startDate), "dd-MMM-yyyy"),
      }));
    setFeatures(filtered);
  }, [userData]);
  return (
    <div>
      <div className="p-6 md:p-6  text-center ">
        <h1 className="text-3xl text-primary font-bold">Features</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((product, index) => (
          <div
            key={index}
            className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow"
          >
            <figure className="px-4 pt-4">
              <img
                src={product.imageUrl}
                alt={`Product ${index + 1}`}
                className="rounded-xl h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-primary">{product.groupName}</h3>
              <p className="text-sm text-accent">{product.description}</p>
              <div className="card-actions justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  <span className="font-medium">Start Date:</span>{" "}
                  {product.startDate}
                </div>
                <button className="btn btn-sm btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
