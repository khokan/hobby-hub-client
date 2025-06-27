import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypewriterEffect = () => {
  return (
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 flex flex-col sm:flex-row items-center justify-center text-center gap-2 px-4">
      <span className="whitespace-nowrap">Hobby Hub is for</span>
      <span className="text-purple-600">
        <Typewriter
          words={[
            "creative painting minds",
            "passionate photo hunters",
            "serious gaming squads",
            "joyful cooking lovers",
            "thoughtful book readers",
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </span>
    </div>
  );
};

export default TypewriterEffect;
