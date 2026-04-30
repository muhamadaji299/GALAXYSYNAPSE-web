import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  Camera,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 lg:pt-8">
        <header className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">User Profile</h1>
          <p className="text-gray-400 text-xs md:text-sm">Manage your account settings and preferences.</p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Profile Header Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl bg-white text-black flex items-center justify-center text-5xl font-black">
                  {user.name?.[0] || 'U'}
                </div>
                <button className="absolute -bottom-2 -right-2 p-2 bg-white text-black rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
                  <Camera size={16} />
                </button>
              </div>
              
              <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl font-bold mb-1">{user.name || 'Anonymous User'}</h2>
                <p className="text-gray-400 mb-4">{user.email || 'No email associated'}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/20 flex items-center gap-2">
                    <CheckCircle2 size={12} />
                    Verified Agent
                  </div>
                  <div className="px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-lg border border-white/10 flex items-center gap-2">
                    <Shield size={12} />
                    Standard Access
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors border border-white/10"
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-2xl w-fit">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-black shadow-lg shadow-white/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8"
          >
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        type="text" 
                        defaultValue={user.name} 
                        disabled={!isEditing}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-blue-500/50 outline-none transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        type="email" 
                        defaultValue={user.email} 
                        disabled={!isEditing}
                        className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-blue-500/50 outline-none transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Biography</label>
                  <textarea 
                    defaultValue={`Explorer joined on ${new Date().toLocaleDateString()}. Dedicated to securing the digital galaxy.`}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full bg-black border border-white/10 rounded-xl p-4 focus:border-blue-500/50 outline-none transition-all disabled:opacity-50 resize-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <AlertCircle className="text-yellow-500" size={24} />
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-xs text-gray-400">Add an extra layer of security to your account.</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-yellow-500 text-black text-xs font-bold rounded-lg hover:bg-yellow-400 transition-colors">
                    Enable
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Lock size={18} />
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <input type="password" placeholder="Current Password" className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 focus:border-blue-500/50 outline-none" />
                    <input type="password" placeholder="New Password" className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 focus:border-blue-500/50 outline-none" />
                    <input type="password" placeholder="Confirm New Password" className="w-full bg-black border border-white/10 rounded-xl py-3 px-4 focus:border-blue-500/50 outline-none" />
                    <button className="px-6 py-2 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                {[
                  { title: 'Security Alerts', desc: 'Get notified about suspicious login attempts.' },
                  { title: 'Transmission Updates', desc: 'Receive notifications about new galactic news.' },
                  { title: 'Chat Responses', desc: 'Be alerted when the AI finishes a long task.' },
                  { title: 'System Status', desc: 'Critical alerts regarding your sector health.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
