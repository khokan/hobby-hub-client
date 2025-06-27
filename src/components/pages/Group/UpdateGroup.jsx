import React from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";

const UpdateGroup = () => {
  const userData = useLoaderData();
  const {
    _id,
    groupName,
    hobbyCategory,
    imageUrl,
    meetingLocation,
    maxMembers,
    description,
    userName,
    userEmail,
    startDate,
  } = userData;

  const handleUpdateGroup = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newCoffee = Object.fromEntries(formData.entries());
    fetch(`https://b11a10-server-side-khokan77.vercel.app/groups/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "Application/json",
      },
      body: JSON.stringify(newCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) toast.success("Group updation successful");
      });
  };
  return (
    <>
      <Helmet>
        <title>Update | HobbyHub</title>
      </Helmet>
      <div className="p-6 md:p-12 rounded-box shadow-lg">
        <div className="p-6 md:p-6 text-center space-y-4">
          <h1 className="text-3xl text-primary font-bold">Update Group</h1>
          <p className="text-accent text-base max-w-3xl mx-auto">
            Update your group information below. You can change group details
            and save the new info.
          </p>
        </div>

        <form onSubmit={handleUpdateGroup}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 shadow">
              <label htmlFor="groupName" className="label">
                Group Name
              </label>
              <input
                id="groupName"
                type="text"
                name="groupName"
                className="input w-full"
                defaultValue={groupName}
                required
              />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 shadow">
              <label htmlFor="hobbyCategory" className="label">
                Hobby Category
              </label>
              <select
                id="hobbyCategory"
                name="hobbyCategory"
                className="select w-full"
                defaultValue={hobbyCategory}
                required
              >
                <option disabled value="">
                  Select category
                </option>
                <option>Drawing & Painting</option>
                <option>Photography</option>
                <option>Video Gaming</option>
                <option>Fishing</option>
                <option>Running</option>
                <option>Cooking</option>
                <option>Reading</option>
                <option>Writing</option>
                <option>Hiking</option>
              </select>
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 shadow">
              <label htmlFor="meetingLocation" className="label">
                Meeting Location
              </label>
              <input
                id="meetingLocation"
                type="text"
                name="meetingLocation"
                className="input w-full"
                defaultValue={meetingLocation}
                required
              />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 shadow">
              <label htmlFor="maxMembers" className="label">
                Max Members
              </label>
              <input
                id="maxMembers"
                type="number"
                name="maxMembers"
                className="input w-full"
                defaultValue={maxMembers}
                min="1"
                required
              />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 shadow md:col-span-2">
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="textarea w-full"
                defaultValue={description}
                rows="3"
                required
              ></textarea>
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 shadow">
              <label htmlFor="startDate" className="label">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                name="startDate"
                className="input w-full"
                defaultValue={startDate}
                required
              />
            </fieldset>

            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 shadow">
              <label htmlFor="imageUrl" className="label">
                Image URL
              </label>
              <input
                id="imageUrl"
                type="url"
                name="imageUrl"
                className="input w-full"
                defaultValue={imageUrl}
                required
              />
            </fieldset>
          </div>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 my-6 shadow">
            <label htmlFor="userName" className="label">
              User Name (readonly)
            </label>
            <input
              id="userName"
              type="text"
              name="userName"
              className="input w-full"
              value={userName}
              readOnly
            />
            <label htmlFor="userEmail" className="label mt-4">
              User Email (readonly)
            </label>
            <input
              id="userEmail"
              type="email"
              name="userEmail"
              className="input w-full"
              value={userEmail}
              readOnly
            />
          </fieldset>

          <input
            type="submit"
            className="btn btn-primary w-full hover:scale-105 transition-transform duration-200"
            value="Update"
          />
        </form>
      </div>
    </>
  );
};

export default UpdateGroup;
