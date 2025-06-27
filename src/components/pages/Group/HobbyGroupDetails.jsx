import {
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import { parse, isAfter, startOfToday, format } from "date-fns";
import { useLoaderData, useParams } from "react-router";
import { Helmet } from "react-helmet-async";

const HobbyGroupDetails = () => {
  const group = useLoaderData();

  const { id } = useParams();
  const service = group._id == id; // match string/number

  if (!service) return <div className="p-6">Group not found</div>;

  const parseDate = parse(group.startDate, "yyyy-MM-dd", new Date());
  const formattedDate = format(parseDate, "dd-MMM-yyyy");
  const isGroupActive = parseDate >= startOfToday();

  return (
    <>
      <Helmet>
        <title>Details | HobbyHub</title>
      </Helmet>
      <div className="max-w-4xl mx-auto p-6">
        <div className="card bg-base-100 shadow-xl border border-gray-200">
          <figure className="h-64 overflow-hidden">
            <img
              src={group.imageUrl}
              alt={group.groupName}
              className="w-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-3xl font-bold text-primary">
              {group.groupName}
            </h1>
            <div className="badge badge-secondary mb-4">
              {group.hobbyCategory}
            </div>

            <p className="text-accent leading-relaxed mb-4">
              {group.description}
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                <span className="font-medium">Location:</span>{" "}
                {group.meetingLocation}
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-primary" />
                <span className="font-medium">Max Members:</span>{" "}
                {group.maxMembers}
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                <span className="font-medium">Start Date:</span> {formattedDate}
              </div>
              <div className="divider" />
              <div className="flex items-center gap-2">
                <FaUser className="text-primary" />
                <span className="font-medium">Created By:</span>{" "}
                {group.userName}
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <span className="font-medium">Email:</span> {group.userEmail}
              </div>
            </div>

            <div className="mt-6">
              {isGroupActive ? (
                <button className="btn btn-primary">Join Group</button>
              ) : (
                <div className="text-red-600 font-semibold">
                  This group is no longer active.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HobbyGroupDetails;
