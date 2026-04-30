import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-transparent">
      <Link to="/" className="text-xl font-bold tracking-tighter text-white">
        GALAXY<span className="text-gray-500">SYNAPSE</span>
      </Link>
      
      <div className="flex gap-4">
        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors"
          >
            Log in
          </motion.button>
        </Link>
        <Link to="/register">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
          >
            Sign up
          </motion.button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
