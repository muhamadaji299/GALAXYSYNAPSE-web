import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Telescope, 
  Info, 
  X, 
  Download, 
  Calendar, 
  ExternalLink,
  Loader2,
  Sparkles
} from 'lucide-react';

const Galaxy = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('galaxy');
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');

  const fetchNASAData = async (query) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image`);
      const data = await response.json();
      if (data.collection && data.collection.items) {
        // Filter out items without images and limit to 20
        const filteredItems = data.collection.items
          .filter(item => item.links && item.links[0].href)
          .slice(0, 24);
        setItems(filteredItems);
      } else {
        setError('No cosmic data found for this sector.');
      }
    } catch (err) {
      setError('Connection to NASA deep space network failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNASAData(searchQuery);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchNASAData(searchQuery);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[120px] rounded-full -mr-64 -mt-64" />

        {/* Header */}
        <header className="p-6 md:p-8 pt-20 lg:pt-8 border-b border-white/5 bg-black/50 backdrop-blur-xl z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Telescope className="text-white" />
                Galaxy Explore
              </h1>
              <p className="text-gray-500 text-sm mt-1">Direct transmission from NASA Image Library</p>
            </div>

            <form onSubmit={handleSearch} className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the cosmos (e.g. Andromeda, Nebula)..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-white/30 outline-none transition-all"
              />
            </form>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {error && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-4">
                <Info />
              </div>
              <h3 className="text-xl font-bold mb-2">Transmission Error</h3>
              <p className="text-gray-500 max-w-xs">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="aspect-square bg-white/5 rounded-3xl animate-pulse border border-white/5" />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedItem(item)}
                  className="group relative aspect-square bg-white/5 border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-white/30 transition-all"
                >
                  <img 
                    src={item.links[0].href} 
                    alt={item.data[0].title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                    <h3 className="text-sm font-bold line-clamp-2">{item.data[0].title}</h3>
                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                      <Calendar size={10} /> {new Date(item.data[0].date_created).getFullYear()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

      </main>

      {/* Detail Modal - Moved outside main for better z-indexing */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl max-h-full bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-1/2 h-64 md:h-auto bg-black relative">
                <img 
                  src={selectedItem.links[0].href} 
                  alt="" 
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-6 left-6">
                  <a 
                    href={selectedItem.links[0].href} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 bg-white text-black rounded-xl flex items-center gap-2 text-xs font-bold hover:bg-gray-200 transition-all"
                  >
                    <Download size={14} /> HIGH RES
                  </a>
                </div>
              </div>

              {/* Modal Info */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-2 mb-4 text-blue-400 text-xs font-black uppercase tracking-widest">
                  <Sparkles size={14} />
                  NASA Discovery
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                  {selectedItem.data[0].title}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2 text-xs text-gray-300">
                      <Calendar size={14} />
                      {new Date(selectedItem.data[0].date_created).toLocaleDateString()}
                    </div>
                    <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2 text-xs text-gray-300">
                      <Info size={14} />
                      NASA Archive
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Mission Description</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {selectedItem.data[0].description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2">Source Reference</div>
                    <div className="text-xs text-gray-400 italic">
                      Provided by {selectedItem.data[0].center || 'NASA Deep Space Network'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Galaxy;
