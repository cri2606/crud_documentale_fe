import { useState } from 'react';
import Navbar from './components/Navbar';
import Documenti from './components/Documenti';
import './index.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Navbar onSearch={(query) => setSearchQuery(query)} />
      <Documenti searchQuery={searchQuery} />
    </>
  );
}

export default App;

