import React, { useState } from 'react';
import { Search, Film, MoreVertical } from 'lucide-react';

interface VideoCardProps {
  title: string;
  subtitle: string;
  views: string;
  date: string;
  thumbnail: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, subtitle, views, date, thumbnail }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-600 rounded-full p-3 cursor-pointer hover:bg-red-700 transition-colors">
            <div className="w-5 h-5 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreVertical size={20} />
          </button>
        </div>
        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>{views} views</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

function VideoLib() {
  const [searchQuery, setSearchQuery] = useState('');

  const videos = [
    {
      id: 1,
      title: 'How to Repair an Electric Motor',
      subtitle: 'This tutorial explains step-by-step how to diagnose and repair a faulty electric motor',
      views: '4k',
      date: '10 Feb 2025',
      thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      title: 'How to Repair an Electric Motor',
      subtitle: 'A beginner\'s guide to home electrical wiring',
      views: '6k',
      date: '1 mar 2025',
      thumbnail: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      title: 'PLC Programming for Beginners',
      subtitle: 'Introduction to PLCs used in automation',
      views: '6k',
      date: '1 mar 2024',
      thumbnail: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 4,
      title: 'Troubleshooting Circuit Boards',
      subtitle: 'How to diagnose and fix common PCB issues',
      views: '6m',
      date: 'Feb 2025',
      thumbnail: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 5,
      title: 'Soldering Techniques 101',
      subtitle: 'Learn proper soldering methods for electronics',
      views: '45k',
      date: '1 mar 2024',
      thumbnail: 'https://images.unsplash.com/photo-1562408590-e32931084e23?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 6,
      title: 'Mechanical Gears & Bearings Basics',
      subtitle: 'Understanding gears, bearings, and lubrication',
      views: '6m',
      date: '1 mar 2025',
      thumbnail: 'https://images.unsplash.com/photo-1569605803663-e9337d901ff9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
           </div>
          <div className="relative flex-grow max-w-xl mx-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
              <span>Filter</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Film className="h-8 w-8 mr-2" />
          <h1 className="text-3xl font-bold">Video Library</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
            <VideoCard
              key={video.id}
              title={video.title}
              subtitle={video.subtitle}
              views={video.views}
              date={video.date}
              thumbnail={video.thumbnail}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default VideoLib;