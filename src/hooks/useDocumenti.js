import { useEffect, useState } from "react";

function useDocumenti(searchQuery) {
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

  return documenti;
}

export default useDocumenti;
