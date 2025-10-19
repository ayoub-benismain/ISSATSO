import React from "react";
import RegisterCard from "../../components/register/RegisterCard";
import WelcomeBanner from "../../components/login/WelcomeBanner";
import issatsoBg from "../../assets/images/issatso-bg.png";

export default function Register() {
  return (
    <div className="relative w-screen h-screen  flex flex-col lg:flex-row lg:overflow-hidden"
    
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
        style={{ backgroundImage: `url(${issatsoBg})` }}
        aria-hidden="true"
      />

      {/* Overlay container */}
      <div 
      className="relative z-10 flex flex-1 h-full flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden"
      
      >
        <WelcomeBanner />
        <div className="hidden lg:block absolute left-1/2 top-20 bottom-20 w-2 bg-white opacity-100" />
        <RegisterCard />
      </div>
    </div>
  );
}
