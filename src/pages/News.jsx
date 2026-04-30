import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { ExternalLink, Clock, Tag, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Ganti dengan API Key Anda dari newsdata.io
const NEWS_API_KEY = 'pub_1a77fa556453457d939fe451a5fcfcfd';

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Mengambil berita kategori teknologi dalam bahasa Inggris/Indonesia
        const response = await fetch(`https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&language=en,id&category=technology`);
        const data = await response.json();

        if (data.status === 'success') {
          setNewsItems(data.results);
        } else {
          setError(data.message || 'Gagal mengambil berita');
        }
      } catch (err) {
        setError('Terjadi kesalahan koneksi. Pastikan API Key benar.');
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
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Galactic News</h1>
          <p className="text-gray-400 text-xs md:text-sm">Stay updated with the latest transmissions from across the sector.</p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 animate-pulse">Scanning frequencies...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-red-400 font-medium mb-2">{error}</p>
            <p className="text-gray-500 text-sm">Silakan masukkan API Key yang valid di News.jsx</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {newsItems.map((news, i) => (
              <Link key={news.article_id} to={`/news/${news.article_id}`} state={{ article: news }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all cursor-pointer h-full flex flex-col"
                >
                  <div className="aspect-video overflow-hidden bg-white/5">
                    <img
                      src={news.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'}
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        {news.category?.[0] || 'Tech'}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Clock size={12} />
                        {new Date(news.pubDate).toLocaleDateString()}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {news.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                      {news.description || 'No description available for this cosmic event.'}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Tag size={12} />
                        <span className="truncate max-w-[100px]">{news.source_id || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                        Read More
                        <ExternalLink size={14} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
export default News;
