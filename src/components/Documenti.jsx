import React from "react";
import { FileList } from "./FileList";
import useDocumenti from "../hooks/useDocumenti";

export const Documenti = ({ searchQuery }) => {
  const documenti = useDocumenti(searchQuery);

  return (
    <div className="mt-4">
      <h1 className="text-center text-3xl font-bold mb-4">Documenti</h1>
      <FileList documenti={documenti} />
    </div>
  );
}

export default Documenti;
