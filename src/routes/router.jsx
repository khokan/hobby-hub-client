import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/pages/Home";
import ErrorPage from "../components/pages/ErrorPage";
import HobbyGroups from "../components/pages/Group/HobbyGroups";
import HobbyGroupDetails from "../components/pages/Group/HobbyGroupDetails";
import PrivateRouter from "./PrivateRouter";
import UpdateGroup from "../components/pages/Group/UpdateGroup";
import Login from "../components/pages/Login";
import Registration from "../components/pages/Registration";
import Overview from "../components/pages/Dashboad/Overview";
import CreateGroup from "../components/pages/Dashboad/CreateGroup";
import MyGroups from "../components/pages/Dashboad/MyGroups";
import DashBoardLayout from "../layouts/DashBoardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () =>
          fetch("https://b11a10-server-side-khokan77.vercel.app/groups"),
        hydrateFallbackElement: (
          <div className="text-center">
            <span className="loading loading-bars loading-xl"></span>{" "}
          </div>
        ),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "registration",
        Component: Registration,
      },
    
      {
        path: "updateGroup/:id",
        element: (
          <PrivateRouter>
            <UpdateGroup />
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(
            `https://b11a10-server-side-khokan77.vercel.app/groups/${params.id}`
          ),
        hydrateFallbackElement: (
          <div className="text-center">
            <span className="loading loading-bars loading-xl"></span>{" "}
          </div>
        ),
      },
    
      {
        path: "groups",
        Component: HobbyGroups,
        loader: () =>
          fetch("https://b11a10-server-side-khokan77.vercel.app/groups"),
        hydrateFallbackElement: (
          <div className="text-center">
            <span className="loading loading-bars loading-xl"></span>{" "}
          </div>
        ),
      },
      {
        path: "/groups/:id",
        element: (
          <PrivateRouter>
            <HobbyGroupDetails />
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(
            `https://b11a10-server-side-khokan77.vercel.app/groups/${params.id}`
          ),
        hydrateFallbackElement: (
          <div className="text-center">
            <span className="loading loading-bars loading-xl"></span>{" "}
          </div>
        ),
      },
       {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashBoardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        index: true, // equivalent to /dashboard
        path: "overView",
        Component: Overview,
        loader: () =>
            fetch("https://b11a10-server-side-khokan77.vercel.app/groups"),
          hydrateFallbackElement: (
            <div className="text-center">
              <span className="loading loading-bars loading-xl"></span>{" "}
            </div>
          ),
      },
        {
          path: "createGroup",
          element: (
              <CreateGroup />
          ),
        },
      {
          path: "myGroups",
          element: (
              <MyGroups />
          ),
          loader: () =>
            fetch("https://b11a10-server-side-khokan77.vercel.app/groups"),
          hydrateFallbackElement: (
            <div className="text-center">
              <span className="loading loading-bars loading-xl"></span>{" "}
            </div>
          ),
        },
    ],
}]},

  {
    path: "*",
    element: <ErrorPage />,
  },

]);

export default router;
