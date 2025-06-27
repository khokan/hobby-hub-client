import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import HobbyHubSlider from "./Slider/Slider";
import Featured from "./Featured";
import TypewriterEffect from "./TypewriterEffect";
import LottieShowcase from "./LottieShowcase";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | HobbyHub</title>
      </Helmet>
      <div className="relative min-h-screen bg-base-100">
        <section className=" p-5">
          <TypewriterEffect />
        </section>
        <section className="mb-5">
          <HobbyHubSlider />
        </section>
        <section className="mb-5">
          <Featured />
        </section>
        <section className="py-16 bg-base-200 text-center mb-4">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Start Your Own Hobby Group
          </h2>
          <p className="text-accent mb-6">
            Can't find your tribe? Create a group and invite fellow enthusiasts
            to join your journey.
          </p>
          <a href="/creategroup" className="btn btn-primary">
            Create Group
          </a>
        </section>
        <section className="py-16 bg-base-200 text-center mb-4">
          <h2 className="text-3xl font-bold text-primary mb-4">
            🌟 HobbyHub Success Stories
          </h2>
          <p className="text-accent max-w-2xl mx-auto">
            “Joining the weekend photography group completely changed my social
            life. Now I explore new places every month with friends who share my
            passion.” <br />
            <span className="italic">— Maya, Toronto</span>
          </p>
        </section>
        <LottieShowcase />
      </div>
    </>
  );
};

export default Home;
