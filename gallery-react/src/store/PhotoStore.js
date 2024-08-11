import { makeAutoObservable, configure } from 'mobx';
import { createDirectus, rest, readItems, aggregate } from '@directus/sdk';

configure({ enforceActions: 'never' });
//'http://app.xn--h1alhf.xn--p1acf'
const client = createDirectus('http://localhost:8055').with(rest());

class PhotoStore {
  photos = [];
  totalPages = 1;
  currentPage = 1;
  albumId = null;
  limit = 9
  constructor() {
    makeAutoObservable(this);
  }

  async fetchTotalPhotosCount(albumId) {
    const response = await client.request(
      aggregate('photos', {
        aggregate: { count: '*' },
        groupBy: ['album'],
      })
    );
     
     const albumData = response.find(item => Number(item.album) === Number(albumId));
     return albumData ? albumData.count : 0;
  }

  async fetchPhotos(albumId, page = 1) {
    this.albumId = albumId;
    const totalCount = await this.fetchTotalPhotosCount(albumId);
    this.totalPages = Math.ceil(totalCount / this.limit);

    const response = await client.request(
      readItems('photos', {
        fields: ['id', 'title', 'image'],
        filter: { album: { _eq: albumId } },
        limit: this.limit,
        page: page
      })
    );

    this.currentPage = page
    this.photos = response;
  }
}

const photoStore = new PhotoStore();
export default photoStore;