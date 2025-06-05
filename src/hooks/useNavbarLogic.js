import { useState } from 'react';

export function useNavbarLogic(onSearch) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) onSearch(searchQuery);
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
      console.error("Errore durante l'upload:", error);
      alert('Errore di connessione.');
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedFile,
    handleSearch,
    handleFileChange,
    handleUpload
  };
}
