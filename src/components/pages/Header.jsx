import React from "react";
import logo from "../../assets/logo.png";
import { format } from "date-fns";

const Header = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center mt-5">
      <img className="w-[400px]" src={logo} alt="" />
      <p className="text-[#706f6f]">Journalism Without Fear or Favour</p>
      <p className="text-[#706f6f] font-semibold">
        {format(new Date(), "EEEE, MMMM MM, yyyy")}
      </p>
    </div>
  );
};

export default Header;
