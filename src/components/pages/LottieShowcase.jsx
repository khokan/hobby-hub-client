import React from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation2 from "../../assets/spaceWalk.json";

const LottieShowcase = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-base-200 p-10 mt-5">
      <h1 className="text-3xl md:text-3xl font-bold text-indigo-700 mb-6 text-center text-primary">
        Enjoy with Hobby Hub
      </h1>
      <p className="text-md md:text-lg text-accent mb-10 text-center max-w-xl">
        Connect with your community through shared passions — whether it's art,
        gaming, fitness, or food.
      </p>
      <div className="w-[300px] md:w-[450px]">
        <Lottie animationData={groovyWalkAnimation2} loop={true} />;
      </div>
    </div>
  );
};

export default LottieShowcase;
