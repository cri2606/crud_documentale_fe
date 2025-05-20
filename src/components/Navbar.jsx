import { useState } from 'react';
import { Search, Upload } from 'lucide-react';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Ricerca effettuata:', searchQuery);
    // Qui puoi implementare la logica di ricerca
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      console.log('File selezionato:', files[0].name);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Seleziona un file prima di inviarlo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('autore', 'Autore esempio');

    try {
      const response = await fetch('http://localhost:8080/api/documenti/salva', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File caricato con successo!');
        alert('File caricato con successo!');
        setSelectedFile(null);
        window.location.reload();
      } else {
        console.error('Errore nel caricamento del file.');
        alert('Errore nel caricamento.');
      }
    } catch (error) {
      console.error('Errore durante l\'upload:', error);
      alert('Errore di connessione.');
    }
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo a sinistra */}
        <div className="flex-shrink-0">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xl">L</div>
            <span className="ml-2 text-xl font-semibold text-gray-800">Logo</span>
          </div>
        </div>

        {/* Barra di ricerca al centro */}
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

        {/* Pulsante carica file a destra */}
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
              <p className="text-xs text-gray-600 max-w-xs truncate">
                File: {selectedFile.name}
              </p>
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
