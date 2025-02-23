import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Sparkles, Search } from 'lucide-react';
import Header from "../Components/Header";
import CircularGallery from '../Components/CircularGallery';

// Mock Data

const users = [
  {
    id: '1',
    name: 'Nova Star',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    points: 15000,
    rank: 'Infinity',
    tasksCompleted: 342,
    streak: 65
  },
  {
    id: '2',
    name: 'Cyber Phoenix',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    points: 12500,
    rank: 'Platinum',
    tasksCompleted: 289,
    streak: 45
  },
  {
    id: '3',
    name: 'Quantum Dreamer',
    avatar: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=150',
    points: 11000,
    rank: 'Platinum',
    tasksCompleted: 256,
    streak: 38
  }
];

// Rank Badge Colors
const rankColors = {
  Bronze: { bg: 'bg-black', text: 'text-amber-200', glow: 'shadow-amber-500/50' },
  Silver: { bg: 'bg-black', text: 'text-slate-200', glow: 'shadow-slate-400/50' },
  Gold: { bg: 'bg-black', text: 'text-yellow-200', glow: 'shadow-yellow-500/50' },
  Platinum: { bg: 'bg-black', text: 'text-cyan-200', glow: 'shadow-cyan-500/50' },
  Infinity: { bg: 'bg-black', text: 'text-purple-200', glow: 'shadow-purple-500/50' }
};

// Components
const RankBadge = ({ rank }) => {
  const colors = rankColors[rank];
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${colors.bg} border-2 border-purple-500 ${colors.text} shadow-[0_0_10px_rgba(147,51,234,0.5)] ${colors.glow}`}
    >
      <Trophy size={16} />
      <span className="text-sm font-semibold">{rank}</span>
    </motion.div>
  );
};

const TopAchievers = ({ users }) => {
  const topThree = users.slice(0, 3);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
      {topThree.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
          className="relative flex flex-col items-center p-6 rounded-2xl bg-black border-2 border-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-500"
        >
          <motion.div 
            className="absolute -top-4 left-1/2 -translate-x-1/2"
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <RankBadge rank={user.rank} />
          </motion.div>
          <motion.img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <h3 className="mt-4 text-xl font-bold text-purple-100">{user.name}</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent">
            {user.points.toLocaleString()} pts
          </p>
          <p className="mt-2 text-purple-300">
            {user.tasksCompleted} tasks completed
          </p>
          <motion.div 
            className="mt-3 px-3 py-1 rounded-full bg-black text-purple-300 text-sm border-2 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]"
            animate={{
              boxShadow: [
                '0 0 15px rgba(147,51,234,0.3)',
                '0 0 20px rgba(147,51,234,0.5)',
                '0 0 15px rgba(147,51,234,0.3)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {user.streak} day streak 🔥
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
<div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
</div>
const LeaderboardTable = ({ users }) => {
  const [search, setSearch] = useState('');
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <motion.div 
        className="relative mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300" size={20} />
        <input
          type="text"
          placeholder="Search players..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-black border-2 border-purple-500 rounded-lg focus:outline-none focus:shadow-[0_0_20px_rgba(147,51,234,0.5)] text-purple-100 placeholder-purple-300/50 shadow-[0_0_15px_rgba(147,51,234,0.3)]"
        />
      </motion.div>

      <div className="overflow-x-auto rounded-xl border-2 border-purple-500 bg-black shadow-[0_0_30px_rgba(147,51,234,0.3)]">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-purple-500">
              <th className="px-4 py-3 text-left text-purple-300">Rank</th>
              <th className="px-4 py-3 text-left text-purple-300">Player</th>
              <th className="px-4 py-3 text-right text-purple-300">Tasks</th>
              <th className="px-4 py-3 text-right text-purple-300">Points</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-purple-500/30 hover:bg-purple-500/5"
                >
                  <td className="px-4 py-4">
                    <RankBadge rank={user.rank} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <motion.img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-purple-500 shadow-[0_0_10px_rgba(147,51,234,0.3)]"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <div>
                        <div className="font-semibold text-purple-100">{user.name}</div>
                        <div className="text-sm text-purple-300/70">{user.streak} day streak</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-purple-300">
                    {user.tasksCompleted}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <motion.span 
                      className="font-bold text-purple-400"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {user.points.toLocaleString()}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-black text-white">
        <Header/>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden py-20 px-4"
      >
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000')] bg-cover bg-center opacity-5"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.07, 0.05]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-purple-300 mb-6 border-2 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]"
          >
            <Trophy size={20} />
            <span>Auraverse Leaderboard</span>
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent"
          >
            Top Impact Makers
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-purple-200 max-w-2xl mx-auto"
          >
            Compete with other changemakers and earn rewards while making a positive impact on the world.
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <TopAchievers users={users} />
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Trophy, title: 'Daily Rewards', desc: 'Complete tasks daily to earn bonus points' },
            { icon: Award, title: 'Monthly Challenges', desc: 'Special events with exclusive rewards' },
            { icon: Sparkles, title: 'Surprise Bonuses', desc: 'Random rewards for active participants' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-black border-2 border-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-500"
            >
              <item.icon className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-purple-100">{item.title}</h3>
              <p className="text-purple-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <LeaderboardTable users={users} />
        <div style={{ height: '600px', position: 'relative' }}>
  <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
</div>
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center p-8 rounded-2xl bg-black border-2 border-purple-500 shadow-[0_0_30px_rgba(147,51,234,0.3)]"
        >
          <h2 className="text-3xl font-bold mb-4 text-purple-100">Ready to Make an Impact?</h2>
          <p className="text-purple-300 mb-6">
            Join the Auraverse community and start earning points while creating positive change.
          </p>
          <motion.button 
            className="px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-purple-100 transition-all duration-300 font-semibold border-2 border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Leaderboard;