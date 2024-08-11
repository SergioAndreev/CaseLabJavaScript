import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import photoStore from '../store/PhotoStore';
import Pagination from './Pagination';
import './PhotoGallery.css';

const PhotoGallery = observer(() => {
  const { id } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    photoStore.fetchPhotos(id);
  }, [id]);

  return (
    <div>
      <div className="photo-grid">
        {photoStore.photos.map(photo => (
          <img
            key={photo.id}
            src={`http://localhost:8055/assets/${photo.image}`}
            alt={photo.title}
            onClick={() => setSelectedPhoto(photo)}
          />
        ))}
      </div>

      <Pagination />

      {selectedPhoto && (
        <div className="modal" onClick={() => setSelectedPhoto(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`http://localhost:8055/assets/${selectedPhoto.image}`}
              alt={selectedPhoto.title}
            />
            <button
              onClick={() => setSelectedPhoto(null)}
            >
              &times;
            </button>
          </div>
        </div>

      )}
    </div>
  );
});

export default PhotoGallery;