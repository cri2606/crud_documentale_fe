import React, { useEffect, useState } from 'react';
import { File, FileText, Table, Download } from 'lucide-react';

export const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/documenti')
      .then((response) => response.json())
      .then((data) => {
        const mappedData = data.map(doc => ({
          id: doc.id,
          title: doc.titolo,
          author: doc.autore,
          size: formatSize(doc.dimensione),
          type: guessFileType(doc.titolo)
        }));
        setFiles(mappedData);
      })
      .catch((error) => {
        console.error('Errore durante il fetch dei documenti:', error);
      });
  }, []);

  // Formatta la dimensione da byte a MB/KB
  const formatSize = (bytes) => {
    if (bytes >= 1_000_000) return (bytes / 1_000_000).toFixed(1) + ' MB';
    if (bytes >= 1_000) return (bytes / 1_000).toFixed(1) + ' KB';
    return bytes + ' B';
  };

  // Deduci il tipo di file dall'estensione del titolo
  const guessFileType = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (ext.includes('pdf')) return 'pdf';
    if (ext.includes('xls') || ext.includes('xlsx')) return 'excel';
    if (ext.includes('doc') || ext.includes('docx')) return 'word';
    if (ext.includes('txt')) return 'txt';
    return 'default';
  };

  // Gestisce il download del file
  const handleDownload = async (id, filename) => {
    try {
        // Show loading state if you have one
        const response = await fetch(`http://localhost:8080/api/documenti/${id}/download`);
        if (!response.ok) {
            throw new Error('Errore nel download del file');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();

        window.URL.revokeObjectURL(url);
        
        // Show success message
        alert('Download completato con successo!');
    } catch (error) {
        console.error('Errore durante il download:', error);
        // Show error message to user
        alert('Si è verificato un errore durante il download del file. Riprova più tardi.');
    }
};

  const iconMap = {
    pdf: { Comp: FileText, color: 'text-red-500' },
    excel: { Comp: Table, color: 'text-green-600' },
    word: { Comp: FileText, color: 'text-blue-500' },
    txt: { Comp: FileText, color: 'text-gray-500' },
    default: { Comp: File, color: 'text-gray-500' }
  };

  return (
    <div className="w-[70%] mx-auto grid grid-cols-1 gap-4">
      {files.map((file, index) => {
        const { Comp: IconComp, color } = iconMap[file.type] || iconMap.default;
        return (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-start">
              <IconComp className={`w-6 h-6 ${color} mr-3`} />
              <div>
                <div className="font-bold">{file.title}</div>
                <div>{file.author} — {file.size}</div>
              </div>
            </div>
            <button
              onClick={() => handleDownload(file.id, file.title)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FileList;
