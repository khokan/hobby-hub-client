import React, { Suspense, useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import HobbyGroup from "./HobbyGroup";
import { Helmet } from "react-helmet-async";

const HobbyGroups = () => {
  const groupsData = useLoaderData();

  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const categories = useMemo(() => {
    const all = groupsData.map((group) => group.hobbyCategory);
    return ["All", ...new Set(all)];
  }, [groupsData]);

  const filteredGroups = useMemo(() => {
    let filtered = [...groupsData];
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (group) => group.hobbyCategory === selectedCategory
      );
    }

    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.groupName.localeCompare(b.groupName)
        : b.groupName.localeCompare(a.groupName)
    );

    return filtered;
  }, [groupsData, selectedCategory, sortOrder]);

  const visibleGroups = showAll ? filteredGroups : filteredGroups.slice(0, 6);

  return (
    <>
      <Helmet>
        <title>All Groups | HobbyHub</title>
      </Helmet>

      <div className="p-6">
        <h1 className="text-3xl text-primary font-semibold text-center mb-6">
          All Groups
        </h1>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <label className="mr-2 font-medium">Filter by Category:</label>
            <select
              className="select select-bordered"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mr-2 font-medium">Sort by Name:</label>
            <select
              className="select select-bordered"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending (A-Z)</option>
              <option value="desc">Descending (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          <Suspense fallback={<h2 className="text-center">Loading...</h2>}>
            {visibleGroups.length > 0 ? (
              visibleGroups.map((group) => (
                <HobbyGroup key={group._id} group={group} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No groups available.
              </p>
            )}
          </Suspense>
        </div>

        {/* See More / See Less Button */}
        {filteredGroups.length > 6 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-outline btn-primary"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HobbyGroups;
