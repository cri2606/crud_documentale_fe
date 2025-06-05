// Navbar.jsx
import { Search, Upload } from 'lucide-react';
import { useNavbarLogic } from '../hooks/useNavbarLogic';

export const Navbar = ({ onSearch }) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedFile,
    handleSearch,
    handleFileChange,
    handleUpload
  } = useNavbarLogic(onSearch);

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xl">L</div>
          <span className="ml-2 text-xl font-semibold text-gray-800">Logo</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-4">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca documenti..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Search size={20} />
            </button>
          </form>
        </div>

        {/* Upload */}
        <div className="flex-shrink-0">
          <label htmlFor="file-upload" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500">
            <Upload size={20} className="mr-2" />
            <span>Carica file</span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {selectedFile && (
            <div className="mt-2">
              <p className="text-xs text-gray-600 max-w-xs truncate">File: {selectedFile.name}</p>
              <button
                onClick={handleUpload}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Invia
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
