import React from 'react';
import { Download, Eye, Search, Upload } from 'lucide-react';

const ReferenceLibrary = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Reference Library Header with Search and Filters */}
      <div className="border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex-1 max-w-xl relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Reference Library</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Document Card 1 */}
          <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Electrical Safety Guide</h2>
              
              <div className="space-y-2 mb-4">
                <p className="flex justify-between">
                  <span className="text-gray-300">Category:</span>
                  <span>Electrical</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-300">Uploaded by:</span>
                  <span>Admin</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-300">Date:</span>
                  <span>Feb 12, 2025</span>
                </p>
              </div>
              
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
                <Download className="h-5 w-5" /> Download
              </button>
            </div>
          </div>
          
          {/* Document Card 2 */}
          <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Mechanical Repair Manual</h2>
              
              <div className="space-y-2 mb-4">
                <p className="flex justify-between">
                  <span className="text-gray-300">Category:</span>
                  <span>Mechanical</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-300">Uploaded by:</span>
                  <span>User123</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-300">Date:</span>
                  <span>Jan 28, 2025</span>
                </p>
              </div>
              
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
                <Eye className="h-5 w-5" /> Preview
              </button>
            </div>
          </div>
          
          {/* Document Card 3 */}
          <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Electronic Circuit Basics</h2>
              
              <div className="space-y-2 mb-4">
                <p className="flex justify-between">
                  <span className="text-gray-300">Category:</span>
                  <span>Electronics</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-300">Uploaded by:</span>
                  <span>TechMaster</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-300">Date:</span>
                  <span>March 1, 2025</span>
                </p>
              </div>
              
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
                <Download className="h-5 w-5" /> Download
              </button>
            </div>
          </div>
          
          {/* Document Card 4 */}
          <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Power Systems Handbook</h2>
              
              <div className="space-y-2 mb-4">
                <p className="flex justify-between">
                  <span className="text-gray-300">Category:</span>
                  <span>Electrical</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-300">Uploaded by:</span>
                  <span>EngineerX</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-300">Date:</span>
                  <span>Feb 5, 2025</span>
                </p>
              </div>
              
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
                <Download className="h-5 w-5" /> Download
              </button>
            </div>
          </div>
          
          {/* Document Card 5 */}
          <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Hydraulics & Pneumatics</h2>
              
              <div className="space-y-2 mb-4">
                <p className="flex justify-between">
                  <span className="text-gray-300">Category:</span>
                  <span>Electrical</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-300">Uploaded by:</span>
                  <span>RepairTech</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-300">Date:</span>
                  <span>Feb 20, 2025</span>
                </p>
              </div>
              
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
                <Eye className="h-5 w-5" /> Preview
              </button>
            </div>
          </div>
          
          {/* Document Card 6 */}
          <div className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Soldering Techniques Guide</h2>
              
              <div className="space-y-2 mb-4">
                <p className="flex justify-between">
                  <span className="text-gray-300">Category:</span>
                  <span>Electronics</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-300">Uploaded by:</span>
                  <span>Admin</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-300">Date:</span>
                  <span>March 5, 2025</span>
                </p>
              </div>
              
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2">
                <Download className="h-5 w-5" /> Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceLibrary;