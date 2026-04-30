import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { User, Newspaper, Clock, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const NEWS_API_KEY = 'pub_1a77fa556453457d939fe451a5fcfcfd';

  useEffect(() => {
    // 1. Get User Data
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // 2. Fetch News Summary
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&language=en&category=technology`);
        const data = await response.json();
        if (data.status === 'success') {
          setNews(data.results.slice(0, 3)); // Ambil 3 saja untuk ringkasan
        }
      } catch (err) {
        console.error('Failed to fetch news for dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 lg:pt-8">
        <header className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold mb-2"
          >
            Welcome, <span className="text-gray-400">{user?.name || 'Explorer'}</span>
          </motion.h1>
          <p className="text-gray-500 text-sm">Synchronizing your galactic data streams...</p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Profile Session Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:col-span-1 bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <User size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center text-2xl font-black">
                  {user?.name?.[0] || 'U'}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{user?.name}</h2>
                  <p className="text-gray-500 text-sm italic">Galactic Citizen</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Email Address</p>
                  <p className="text-sm font-medium">{user?.email}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Account Status</p>
                  <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
                    <ShieldCheck size={14} />
                    Verified Agent
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Session ID</p>
                  <p className="text-[10px] font-mono text-gray-400">GS-{Math.random().toString(36).substring(7).toUpperCase()}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* News Summary Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-2 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Newspaper className="text-blue-400" size={20} />
                Latest Transmissions
              </h2>
              <Link to="/news" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                View All <ExternalLink size={12} />
              </Link>
            </div>

            <div className="space-y-4">
              {loading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
                ))
              ) : (
                news.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer group"
                  >
                    <div className="flex gap-4">
                      {item.image_url && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 hidden sm:block">
                          <img src={item.image_url} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter bg-blue-500/10 px-2 py-0.5 rounded">
                            {item.category?.[0] || 'Tech'}
                          </span>
                          <span className="text-[10px] text-gray-500 flex items-center gap-1">
                            <Clock size={10} /> {new Date(item.pubDate).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold line-clamp-1 group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Link to="/chat" className="p-6 bg-blue-600 rounded-3xl flex flex-col items-center justify-center gap-3 hover:bg-blue-700 transition-all group">
                <Zap className="group-hover:scale-125 transition-transform" />
                <span className="font-bold text-sm">Open AI Core</span>
              </Link>
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-bold text-sm text-gray-300">System Ready</span>
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
