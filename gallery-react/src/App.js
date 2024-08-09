import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AlbumList from './components/AlbumList';
import PhotoGallery from './components/PhotoGallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AlbumList />} />
        <Route path="/album/:id" element={<PhotoGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
