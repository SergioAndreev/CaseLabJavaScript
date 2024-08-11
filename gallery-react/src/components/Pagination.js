import React from 'react';
import { observer } from 'mobx-react';
import photoStore from '../store/PhotoStore';
import './Pagination.css';

const Pagination = observer(() => {
  const pages = [...Array(photoStore.totalPages).keys()].map(i => i + 1);

  return (
    <div className="pagination">
      {pages.map(page => (
        <button
          key={page}
          onClick={() => photoStore.fetchPhotos(photoStore.albumId, page)}
          disabled={photoStore.currentPage === page}
        >
          {page}
        </button>
      ))}
    </div>
  );
});

export default Pagination;