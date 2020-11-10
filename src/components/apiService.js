import {
  noticeModalSpecQuery,
  noticeModalNothingFound,
} from './notice-modal.js';

const API_KEY = '18968535-a98ecca7bd1b0403c78b07ef3';
export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchImageByName() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}
`;
    const response = await fetch(url);
    const images = await response.json();
    if (images.hits.length) {
      this.incrementPage();
      return images;
    }
    noticeModalNothingFound();

    // this.sayNothigFound();
  }
  // return fetch(url)
  //   .then(response => response.json())
  //   .then(images => {
  //     if (images.hits.length) {
  //       this.incrementPage();
  //       return images;
  //     }
  //     this.sayNothigFound();
  //   });
  // }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  // sayNothigFound() {
  //   noticeModalNothingFind();
  //   return;
  //   // return alert(
  //   //   'Oh no! Nothig found! Please enter something specific for query!',
  //   // );
  // }
}
