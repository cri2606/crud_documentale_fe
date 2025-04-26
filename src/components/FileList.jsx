import React from 'react';
import { File, FileText, Table, Download } from 'lucide-react';

export const FileList = () => {
  // Dati fittizi di esempio (in futuro possono essere caricati dinamicamente)
  const files = [
    { title: 'Report Annuale', author: 'Mario Rossi', size: '2.3 MB', type: 'pdf' },
    { title: 'Bilancio 2024', author: 'Laura Bianchi', size: '1.1 MB', type: 'excel' },
    { title: 'Note progetto', author: 'Giuseppe Verdi', size: '800 KB', type: 'word' },
  ];

  // Mappa dei tipi di file alle rispettive icone (componenti di lucide-react) e colore
  const iconMap = {
    pdf:   { Comp: FileText, color: 'text-red-500' },   // icona documento (PDF) in rosso
    excel: { Comp: Table,    color: 'text-green-600' }, // icona tabella (Excel) in verde
    word:  { Comp: FileText, color: 'text-blue-500' },  // icona documento (Word) in blu
    txt:   { Comp: FileText, color: 'text-gray-500' },  // icona documento (TXT) in grigio
    default: { Comp: File,   color: 'text-gray-500' }   // icona generica di default
  };

  return (
    <div className="w-[70%] mx-auto grid grid-cols-1 gap-4">
      {files.map((file, index) => {
        // Seleziona il componente icona appropriato in base al tipo di file
        const { Comp: IconComp, color } = iconMap[file.type] || iconMap.default;
        return (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            {/* Sezione sinistra: icona del file e dettagli testo */}
            <div className="flex items-start">
              <IconComp className={`w-6 h-6 ${color} mr-3`} />
              <div>
                <div className="font-bold">{file.title}</div>
                <div>{file.author} — {file.size}</div>
              </div>
            </div>
            {/* Sezione destra: pulsante di download */}
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center">
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
