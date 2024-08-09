import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import photoStore from '../store/PhotoStore';
import Pagination from './Pagination';

const PhotoGallery = observer(() => {
  const { id } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    photoStore.fetchPhotos(id);
  }, [id]);

  return (
    <div>
      <h1>Photo Gallery</h1>
      <div className="photo-grid">
        {photoStore.photos.map(photo => (
          <img
            key={photo.id}
            src={`http://app.xn--h1alhf.xn--p1acf/assets/${photo.image}`}
            alt={photo.title}
            onClick={() => setSelectedPhoto(photo)}
          />
        ))}
      </div>
      
      <Pagination />

      {selectedPhoto && (
        <div className="modal" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content">
            <img
              src={`http://app.xn--h1alhf.xn--p1acf/assets/${selectedPhoto.image}`}
              alt={selectedPhoto.title}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default PhotoGallery;