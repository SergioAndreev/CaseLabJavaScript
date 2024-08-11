import { makeAutoObservable, configure } from 'mobx';
import { createDirectus, rest, readItems } from '@directus/sdk'; 

configure({ enforceActions: 'never' });

const client = createDirectus('http://localhost:8055').with(rest());

class AlbumStore {
  albums = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAlbums() {
    const response = await client.request(readItems('albums', {
      fields: ['id', 'name', 'Image']
    }));
    this.albums = response;
  }
}

const albumStore = new AlbumStore();
export default albumStore;