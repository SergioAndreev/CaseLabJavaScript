import { makeAutoObservable, configure } from 'mobx';
import { createDirectus, rest, readItems } from '@directus/sdk'; 

configure({ enforceActions: 'never' });

const client = createDirectus('http://app.xn--h1alhf.xn--p1acf').with(rest());

class AlbumStore {
  albums = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAlbums() {
    const response = await client.request(readItems('albums'));
    this.albums = response;
    console.log(response)
  }
}

const albumStore = new AlbumStore();
export default albumStore;