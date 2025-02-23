import React, { useState } from 'react'
import {motion} from "framer-motion"
import { useAuth } from '../authcontext/authcontext';
import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { Particles } from '../Components/Particles';

const client = createThirdwebClient({ clientId: "df6f2ed69cb11c0084d94a585fd257c8" });

const UserProfile = () => {

  const { authUser } = useAuth();
  const [user] = useState({
    name: `${authUser.firstname} ${authUser.lastname} `,
    avatar: "https://i.pravatar.cc/150?img=3",
    rank: authUser.rank,
    tasksCompleted: 32,
    points: authUser.points,
    email: authUser.email,
  });
  

  return (
    <div className='relative'>
    <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        className="h-screen w-screen fixed "
        
      />
    <div className="min-h-screen w-[100%] absolute top-0 text-white flex">
      {/* Sidebar */}
      <div className="w-64 p-12 max-md:hidden ">
        <h2 className="text-2xl mt-2.5 font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li className="hover:text-purple-400 cursor-pointer">Profile</li>
          <li className="hover:text-purple-400 cursor-pointer">Tasks</li>
          <li className="hover:text-purple-400 cursor-pointer">Leaderboard</li>
          <li className="hover:text-purple-400 cursor-pointer">Home</li>
          <ConnectButton client={client} />;
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="flex items-center gap-4  backdrop-blur-lg p-6 rounded-lg shadow-md"
        >
          <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full" />
          <div className='w-[100%]'>
            <div className='flex justify-between max-md:flex-col '> <h1 className="text-xl max-md:text-sm text-nowrap font-bold">Welcome, {user.name} 👋</h1> <h1 className="text-xl max-md:text-sm font-bold">{user.email}</h1></div>
           
            <p className="text-gray-400">Your current rank: <span className="text-purple-400">GOLD</span></p>
          </div>
        </motion.div>
        
        <div className='flex flex-row justify-between max-md:flex-col'>
        <div><img src="/goldrank.jpeg" className='w-[200px] mx-auto mt-8 rounded-xl' alt="" /></div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mt-8 max-md:flex max-md:flex-col">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }} 
            className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl font-bold">{user.tasksCompleted}</h2>
            <p className="text-gray-400 max-md:text-sm">Tasks Completed</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6 }} 
            className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl font-bold">{user.points}</h2>
            <p className="text-gray-400 max-md:text-sm ">Points Earned</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.7 }} 
            className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center"
          >
            <h2 className="text-2xl font-bold">#5</h2>
            <p className="text-gray-400 max-md:text-sm ">Leaderboard Rank</p>
          </motion.div>
        </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }} 
            className="bg-white/10 backdrop-blur-lg p-4 rounded-lg shadow-md "
          >
            <p className="text-gray-400">✔️ Completed Task: <span className="text-white">"planting a tree"</span></p>
            <p className="text-gray-400">🏆 New Rank Achieved: <span className="text-purple-400">#5</span></p>
          </motion.div>
          
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserProfile
