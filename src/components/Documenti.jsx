import React, { useEffect, useState } from "react";
import { FileList } from "./FileList";

function Documenti() {
  const [documenti, setDocumenti] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/documenti")
      .then((res) => res.json())
      .then((data) => {
        setDocumenti(data);
      })
      .catch((err) => console.error("Errore durante il fetch:", err));
  }, []);

  return (
    <div className="mt-4">
        <h1 className="text-center text-3xl font-bold mb-4">Documenti</h1>
        <FileList />
    </div>
  );
}

export default Documenti;