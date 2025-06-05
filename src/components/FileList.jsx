import React from 'react';
import { File, FileText, Table, Download } from 'lucide-react';
import { useFileUtils } from '../hooks/useFileUtils';

export const FileList = ({ documenti }) => {
  const { formatSize, guessFileType, handleDownload } = useFileUtils();

  const iconMap = {
    pdf: { Comp: FileText, color: 'text-red-500' },
    excel: { Comp: Table, color: 'text-green-600' },
    word: { Comp: FileText, color: 'text-blue-500' },
    txt: { Comp: FileText, color: 'text-gray-500' },
    default: { Comp: File, color: 'text-gray-500' }
  };

  return (
    <div className="w-[70%] mx-auto grid grid-cols-1 gap-4">
      {documenti.map((doc, index) => {
        const { Comp: IconComp, color } = iconMap[guessFileType(doc.titolo)] || iconMap.default;
        return (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-start">
              <IconComp className={`w-6 h-6 ${color} mr-3`} />
              <div>
                <div className="font-bold">{doc.titolo}</div>
                <div>{doc.autore} — {formatSize(doc.dimensione)}</div>
              </div>
            </div>
            <button
              onClick={() => handleDownload(doc.id, doc.titolo)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        );
      })}
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mb-4 rounded"
        onClick={() => window.location.href = '/'}
      >
        Mostra tutti i documenti
      </button>
    </div>
  );
};

export default FileList;
