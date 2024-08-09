import { makeAutoObservable, configure } from 'mobx';
import { createDirectus, rest, readItems } from '@directus/sdk'; 

configure({ enforceActions: 'never' }); 

const client = createDirectus('http://app.xn--h1alhf.xn--p1acf').with(rest());

class PhotoStore {
  photos = [];
  totalPages = 1;
  currentPage = 1;
  albumId = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPhotos(albumId, page = 1) {
    this.albumId = albumId;
    const response = await client.request(
      readItems('photos', {
        filter: { album: { _eq: albumId } },
        limit: 10,
        page: page
      })
    );
    this.photos = response;
    console.log(response);
    // this.totalPages = response.meta.total_pages || 1;
    // this.currentPage = page;
  }
}

const photoStore = new PhotoStore();
export default photoStore;