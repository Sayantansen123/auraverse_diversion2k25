// src/Home.jsx
import ButtonGradient from "./assets/assets/svg/ButtonGradient"; // Updated path
import Benefits from "./Components/Benefits";
import Button from "./Components/Button";
// import Collaboration from "./Components/Collaboration";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Card from "./Components/Card";
import Leader from "./Components/Leader";
import Footer from "./Components/Footer";


const Home = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header signIn = "signIn" newacc = "New Account"/>
        <Hero />
        <Benefits />
        {/* <Collaboration /> */}
        
        {/* Card and Text Section */}
        <div className="container mx-auto mt-16 mb-16 flex flex-col lg:flex-row items-center justify-between">
          {/* Left Side - Heading and Bullet Points */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-6">
            🚀 How Auraverse Works
            </h1>
            <ul className="list-disc list-inside space-y-3 text-lg">
              <li>✨ 1. Complete a Task – Take positive action like helping the environment, donating, or volunteering.</li>
              <li>📸 2. Submit Proof – Upload photos or videos of your contribution.</li>
              <li>🎖 3. Earn Aura Points – Get rewarded based on the impact of your actions.</li>
              <li>🤖 AI-powered smart replies</li>
              <li>💻 Cross-platform support (Web & Mobile)</li>
            </ul>
          </div>

          {/* Right Side - Tilted Card */}
          <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0">
            <Card />
            
          </div>
        </div>
      </div>
      <ButtonGradient />

      <Leader/>
      
    </>
  );
};

export default Home;
