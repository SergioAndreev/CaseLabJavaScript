import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import albumStore from "../store/AlbumStore";

const AlbumList = observer(() => {
  useEffect(() => {
    albumStore.fetchAlbums();
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      <div className="album-grid">
        {albumStore.albums.map((album) => (
          <div key={album.id} className="album-item">
            <Link to={`/album/${album.id}`}>
              <h2>{album.title}</h2>
              <p>{album.description}</p>
            </Link>
            <img
              key={album.id}
              src={`http://app.xn--h1alhf.xn--p1acf/assets/${album.Image}`}
              alt={album.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default AlbumList;
