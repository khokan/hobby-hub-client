import React, { useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router";
import NavBar from "../components/pages/NavBar";
import Footer from "../components/pages/Footer";

const HomeLayout = () => {
  const { state } = useNavigation();
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  const isHomePage = location.pathname === "/";
  return (
    <div>
      <header className="">
        {/* <Header /> */}
        <NavBar theme={theme} toggleTheme={toggleTheme} />
      </header>
      <main
        data-theme={isHomePage ? theme : "light"}
        className="w-11/12 mx-auto min-h-[calc(100vh-350px)]"
      >
        {state == "loading" ? (
          <div className="text-center">
            <span className="loading loading-bars loading-xl"></span>{" "}
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
