import React from "react";
import Main from "../../components/Home/Main";
import bgImage from "../../assets/home_bg.png";

const Home = () => {
  return (
    <div
      className="flex flex-col px-32 py-10 w-full h-full bg-[#151515] bg-cover bg-center min-h-screen overflow-auto"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Main />
    </div>
  );
};

export default Home;
