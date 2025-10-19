import React from "react";

export default function WelcomeBanner() {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center h-screen text-white px-10 py-12 lg:px-20">

      {/* Circle behind text */}
      <div
        className="absolute bg-blue-400 opacity-60 backdrop-blur-xl 
                   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[280px] h-[140px] lg:w-[380px] lg:h-[380px]"
        style={{
          borderTopLeftRadius: "9999px",
          borderTopRightRadius: "9999px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          clipPath: "inset(0 0 50% 0)",
        }}
      />

      {/* On desktop, override to show full circle */}
      <div
        className="hidden lg:block absolute bg-blue-400 opacity-60 backdrop-blur-xl 
                   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[380px] h-[380px] rounded-full"
      />

      {/* Text */}
      <div className="relative text-center px-4">
        <h1 className="text-2xl lg:text-4xl mb-2">Welcome In</h1>
        <h2 className="text-3xl lg:text-5xl font-extrabold">ISSATSO+</h2>
      </div>
    </div>
  );
}
