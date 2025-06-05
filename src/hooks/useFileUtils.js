// useFileUtils.js
export function useFileUtils() {
    const formatSize = (bytes) => {
      if (bytes >= 1_000_000) return (bytes / 1_000_000).toFixed(1) + ' MB';
      if (bytes >= 1_000) return (bytes / 1_000).toFixed(1) + ' KB';
      return bytes + ' B';
    };
  
    const guessFileType = (filename) => {
      const ext = filename.split('.').pop().toLowerCase();
      if (ext.includes('pdf')) return 'pdf';
      if (ext.includes('xls') || ext.includes('xlsx')) return 'excel';
      if (ext.includes('doc') || ext.includes('docx')) return 'word';
      if (ext.includes('txt')) return 'txt';
      return 'default';
    };
  
    const handleDownload = async (id, filename) => {
      try {
        const response = await fetch(`http://localhost:8080/api/documenti/${id}/download`);
        if (!response.ok) throw new Error('Errore nel download del file');
  
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
  
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
  
        window.URL.revokeObjectURL(url);
        alert('Download completato con successo!');
      } catch (error) {
        console.error('Errore durante il download:', error);
        alert('Errore durante il download. Riprova bro 😭');
      }
    };
  
    return { formatSize, guessFileType, handleDownload };
  }
  