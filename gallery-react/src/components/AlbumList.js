import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import albumStore from "../store/AlbumStore";
import './AlbumList.css';
const AlbumList = observer(() => {
  useEffect(() => {
    albumStore.fetchAlbums();
  }, []);

  return (
    <div className="album-grid">
      {albumStore.albums.map((album) => (
        <div key={album.id} className="album-item">
          <Link to={`/album/${album.id}`}>
            <img
              key={album.id}
              src={`http://localhost:8055/assets/${album.Image}`}
              alt={album.name}
            />
            <h2>{album.name}</h2>
            <p>{albumStore.albums.length} фото</p>
          </Link>
        </div>
      ))}
    </div>
  );
});

export default AlbumList;
