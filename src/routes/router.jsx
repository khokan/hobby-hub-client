import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../components/pages/Home";
import ErrorPage from "../components/pages/ErrorPage";
import HobbyGroups from "../components/pages/Group/HobbyGroups";
import HobbyGroupDetails from "../components/pages/Group/HobbyGroupDetails";
import PrivateRouter from "./PrivateRouter";
import CreateGroup from "../components/pages/Group/CreateGroup";
import MyGroups from "../components/pages/Group/MyGroups";
import UpdateGroup from "../components/pages/Group/UpdateGroup";
import Login from "../components/pages/Login";
import Registration from "../components/pages/Registration";

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
        path: "createGroup",
        element: (
          <PrivateRouter>
            <CreateGroup />
          </PrivateRouter>
        ),
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
        path: "myGroups",
        element: (
          <PrivateRouter>
            <MyGroups />
          </PrivateRouter>
        ),
        loader: () =>
          fetch("https://b11a10-server-side-khokan77.vercel.app/groups"),
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
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
