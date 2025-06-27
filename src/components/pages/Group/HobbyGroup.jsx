import { format, parse } from "date-fns";
import { FaMapMarkerAlt, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router";

const HobbyGroup = ({ group }) => {
  const parseDate = parse(group.startDate, "yyyy-MM-dd", new Date());
  const formattedDate = format(parseDate, "dd-MMM-yyyy");
  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 mx-auto ">
      <figure className="h-48 overflow-hidden">
        <img
          src={group.imageUrl}
          alt={group.groupName}
          className="w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-semibold text-primary">
          {group.groupName}
        </h2>
        <p className="text-sm text-accent mb-2">{group.description}</p>
        <div className="badge badge-secondary mb-2">{group.hobbyCategory}</div>
        <div className="divider my-2" />
        <div className="text-xs text-accent flex justify-between">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            <span>{group.meetingLocation}</span>
          </div>
          <Link to={`/groups/${group._id}`}>
            <button className=" btn btn-primary px-4 py-2 rounded">
              See More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HobbyGroup;
