import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Share2, Bookmark, Globe } from 'lucide-react';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="flex flex-col lg:flex-row h-screen bg-black text-white">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <p className="text-gray-500 mb-4">Article data lost on refresh.</p>
          <button 
            onClick={() => navigate('/news')}
            className="px-6 py-2 bg-white text-black rounded-xl font-bold"
          >
            Back to News
          </button>
        </main>
      </div>
    );
  }

  const news = {
    title: article.title,
    content: article.content || article.description || 'No full content available for this news item.',
    image: article.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    date: new Date(article.pubDate).toLocaleDateString(),
    category: article.category?.[0] || 'Technology',
    author: article.source_id || 'Global News',
    source_url: article.link
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black text-white overflow-x-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 lg:pt-0">
        <div className="relative h-[300px] md:h-[400px] w-full">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          
          <button 
            onClick={() => navigate('/news')}
            className="absolute top-4 left-4 md:top-8 md:left-8 p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 transition-all group z-20"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-20 relative z-10 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30`}>
                {news.category}
              </span>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock size={14} />
                {news.date}
              </div>
              <div className="ml-auto flex gap-3">
                <a 
                  href={news.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors"
                >
                  <Globe size={16} />
                  Visit Source
                </a>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              {news.title}
            </h1>

            <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/10">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold uppercase">
                {news.author[0]}
              </div>
              <div>
                <div className="font-medium uppercase">{news.author}</div>
                <div className="text-sm text-gray-500">StarLink Feed Agent</div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {news.content}
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default NewsDetail;
