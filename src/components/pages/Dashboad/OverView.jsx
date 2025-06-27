import { useLoaderData } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import {
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { parse, isAfter, isBefore, startOfToday } from "date-fns";

const Overview = () => {
  const { user } = useAuth();
  const groupsData = useLoaderData();
  const myGroupData = groupsData.filter(
    (myGroup) => myGroup.userEmail === user?.email
  );

  const today = startOfToday();

  const groupsBeforeToday = groupsData.filter((group) => {
    const date = parse(group.startDate, "yyyy-MM-dd", new Date());
    return isBefore(date, today);
  });

  const groupsAfterToday = groupsData.filter((group) => {
    const date = parse(group.startDate, "yyyy-MM-dd", new Date());
    return isAfter(date, today) || date.getTime() === today.getTime();
  });

  return (
    <>
      <Helmet>
        <title>Dashboard | HobbyHub</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          Dashboard Overview
        </h1>

        {/* First Row: Two Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <StatCard
            title="Total Groups"
            count={groupsData.length}
            icon={<FaClipboardList className="text-primary text-3xl" />}
          />
          <StatCard
            title="My Groups"
            count={myGroupData.length}
            icon={<FaUsers className="text-secondary text-3xl" />}
          />
        </div>

        {/* Second Row: Full-width Group Timeline */}
        <GroupTimelineCard
          beforeCount={groupsBeforeToday.length}
          afterCount={groupsAfterToday.length}
          beforeList={groupsBeforeToday.map((g) => g.groupName)}
          afterList={groupsAfterToday.map((g) => g.groupName)}
        />
      </div>
    </>
  );
};

const StatCard = ({ icon, title, count }) => (
  <div className="card bg-base-100 shadow-md border border-gray-200">
    <div className="card-body items-center text-center">
      <div className="mb-2">{icon}</div>
      <h3 className="text-2xl font-bold text-primary">{count}</h3>
      <p className="text-gray-600 font-medium">{title}</p>
    </div>
  </div>
);

const GroupTimelineCard = ({
  beforeCount,
  afterCount,
  beforeList,
  afterList,
}) => (
  <div className="card bg-base-100 shadow-md border border-gray-200">
    <div className="card-body">
      <div className="text-center mb-4">
        <FaCalendarAlt className="text-accent text-3xl mx-auto mb-2" />
        <h3 className="text-2xl font-bold text-primary">Group Timeline</h3>
      </div>

      <div className="grid grid-cols-1 text-center md:grid-cols-2 gap-6">
        {/* Before Today */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Before Today: <span className="text-primary">{beforeCount}</span>
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {beforeList.length > 0 ? (
              beforeList.map((name, idx) => <li key={idx}>{name}</li>)
            ) : (
              <li>No groups</li>
            )}
          </ul>
        </div>

        {/* After Today */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Today or After: <span className="text-primary">{afterCount}</span>
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {afterList.length > 0 ? (
              afterList.map((name, idx) => <li key={idx}>{name}</li>)
            ) : (
              <li>No groups</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Overview;
