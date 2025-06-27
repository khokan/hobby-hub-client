import toast from "react-hot-toast";
import { auth } from "../../../firebase/firebase.config";
import { Helmet } from "react-helmet-async";

const CreateGroup = () => {
  const user = auth.currentUser;
  const handleCreateGroup = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newGroup = Object.fromEntries(formData.entries());

    fetch("https://b11a10-server-side-khokan77.vercel.app/groups", {
      method: "POST",
      headers: {
        "content-type": "Application/json",
      },
      body: JSON.stringify(newGroup),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) toast.success("Group creation successful");
        form.reset();
      });
  };
  return (
    <>
      <Helmet>
        <title>Create | HobbyHub</title>
      </Helmet>
      <div className="p-6 md:p-12  rounded-box shadow-lg">
        <div className="p-6 md:p-6  text-center space-y-4">
          <h1 className="text-3xl text-primary font-bold">Add New Group</h1>
          <p className="text-accent text-base max-w-3xl mx-auto">
            Create a new group by filling out the form below. Make sure to
            provide accurate information to help others find and join your
            group.
          </p>
        </div>

        <form onSubmit={handleCreateGroup}>
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
                placeholder="Enter group name"
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
                defaultValue="Select category"
                required
              >
                <option disabled selected>
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
                placeholder="Enter meeting location"
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
                placeholder="Enter max number of members"
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
                placeholder="Write a short description about the group"
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
                placeholder="Enter image URL"
                required
              />
            </fieldset>
          </div>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 shadow my-6">
            <label htmlFor="userName" className="label">
              User Name (readonly)
            </label>
            <input
              id="userName"
              type="text"
              name="userName"
              className="input w-full"
              value={user?.displayName}
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
              value={user?.email}
              readOnly
            />
          </fieldset>

          <input
            type="submit"
            className="btn btn-primary w-full hover:scale-105 transition-transform duration-200"
            value="Create"
          />
        </form>
      </div>
    </>
  );
};

export default CreateGroup;
