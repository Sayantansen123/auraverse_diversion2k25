import React from "react";
import {Particles} from "./Particles";
import CircularGallery from '../Components/CircularGallery';
const Leader = () => {
  const leaders = [
    { name: "Alex", rank: "Gold", points: 1500, icon: "🥇" },
    { name: "Neha", rank: "Silver", points: 1200, icon: "🥈" },
    { name: "Rahul", rank: "Bronze", points: 900, icon: "🥉" },
  ];

  return (
    <div className="relative" style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        
        
      />
      <div className="absolute max-w-lg mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg text-white top-20 inset-0 h-[400px] bg-white/10 backdrop-filter-none">
        <h2 className="text-2xl font-bold text-center mb-4">🏅 Leaderboard – Meet the Top Changemakers!</h2>
        <ul className="space-y-4">
          {leaders.map((leader, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-xl shadow-md hover:bg-gray-700 transition"
            >
              <span className="text-xl">{leader.icon}</span>
              <span className="text-lg font-semibold">{leader.name} ({leader.rank} Rank)</span>
              <span className="text-lg font-semibold">{leader.points} Points</span>
            </li>
          ))}
        </ul>
        <p className="text-center text-sm text-gray-400 mt-4">🔗 Compete for the top spot & earn rewards!</p>
      </div>
      <div style={{ height: '600px', position: 'relative' }}>
    
  </div>
    </div>

  );
};

export default Leader;