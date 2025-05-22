import React, { useEffect, useState } from "react";
import { FileList } from "./FileList";

function Documenti({ searchQuery }) {
  const [documenti, setDocumenti] = useState([]);

  useEffect(() => {

    const url = searchQuery
    ? `http://localhost:8080/api/documenti/ricerca?titolo=${encodeURIComponent(searchQuery)}`
    : `http://localhost:8080/api/documenti`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDocumenti(data);
      })
      .catch((err) => console.error("Errore durante il fetch:", err));
  }, [searchQuery]);

  return (
    <div className="mt-4">
        <h1 className="text-center text-3xl font-bold mb-4">Documenti</h1>
        <FileList documenti={documenti} />
    </div>
  );
}

export default Documenti;