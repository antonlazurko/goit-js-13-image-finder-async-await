import './style.css';
const searchFormTemplate = require('./templates/search-form-markup_template.hbs');
const imageCardTemplate = require('./templates/image-card-template.hbs');
import {
  noticeModalSpecQuery,
  noticeModalNothingFound,
} from './components/notice-modal.js';
import debounce from 'lodash.debounce';
import ImageApiService from './components/apiService.js';
import LoadMoreBtn from './components/load-more-btn';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// создаем экземпляры классов для API и кнопки догрузки
const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const body = document.querySelector('body');
const gallery = document.querySelector('.gallery');

// функция рендера разметки поиска
function searchFormMarkup() {
  body.insertAdjacentHTML('afterbegin', searchFormTemplate());
}
searchFormMarkup();
const searchForm = document.querySelector('#search-form');

// события инпута и кнопки догрузки
searchForm.addEventListener('input', debounce(onSearch, 1000));
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

// функция поиска по инпуту
function onSearch(e) {
  // использую "trim()", т.к. бэкенд поддерживает запросы с пробелом
  imageApiService.query = e.target.value.trim();
  if (imageApiService.query === '') {
    noticeModalSpecQuery();
    return;
    // return alert('Please enter something specific for query!');
  }
  loadMoreBtn.show();
  imageApiService.resetPage();
  clearImagesGallery();
  fetchImages();
}

// функция обработки данных из API
async function fetchImages() {
  loadMoreBtn.disable();
  try {
    const images = await imageApiService.fetchImageByName();
    if (images) {
      imageGalleryMarkup(images);
      loadMoreBtn.enable();
      window.scrollTo({
        top: imageApiService.page * 10000,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.log(error);
  }
  // imageApiService
  // .fetchImageByName()
  // .then(images => {
  //   if (images) {
  //     imageGalleryMarkup(images);
  //     loadMoreBtn.enable();
  //     window.scrollTo({
  //       top: imageApiService.page * 10000,
  //       behavior: 'smooth',
  //     });
  //   }
  // })
  // .catch(error => console.log(error));
}

// функция рендера галлереи
function imageGalleryMarkup(images) {
  images.hits.map(el => {
    const image = document.createElement('li');
    const imageCardMarukp = imageCardTemplate(el);
    image.insertAdjacentHTML('afterbegin', imageCardMarukp);
    gallery.append(image);
    image.addEventListener('click', onImageClick);
  });
}

// функция очистки галлереи при новом поиске
function clearImagesGallery() {
  if (gallery.children) {
    gallery.innerHTML = '';
  }
}

// функция открытия подального кона при клике на картинку
function onImageClick(e) {
  if (e.target.src) {
    const instance = basicLightbox.create(`
    <img src="${e.target.dataset.src}" width="800" height="600">
`);
    instance.show();
  }
}
