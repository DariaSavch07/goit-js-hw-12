import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query;
let page = 1;
const perPage = 15;

form.addEventListener('submit', e => {
  e.preventDefault();

  hideLoadMoreButton();

  clearGallery();

  query = e.target.elements['search-text'].value.trim();

  if (!query) return;

  page = 1;

  showImages(query);
});

loadMoreBtn.addEventListener('click', e => {
  hideLoadMoreButton();

  page++;

  showImages(query);

  scrollView();
});

async function showImages(query) {
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, perPage);
    const images = data.hits;

    if (images && images.length > 0) {
      createGallery(images);

      if (page >= Math.ceil(data.totalHits / perPage)) {
        iziToast.show({
          title: 'ℹ️',
          message: "We're sorry, but you've reached the end of search results.",
          messageColor: 'white',
          titleColor: 'white',
          backgroundColor: '#4CAF50',
          position: 'topRight',
        });
      } else {
        showLoadMoreButton();
      }
    } else {
      iziToast.show({
        title: '❌',
        message: `Sorry, there are no images matching your search query. Please try again!`,
        messageColor: 'white',
        titleColor: 'white',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    hideLoader();
  }
}

function scrollView() {
  const galleryItem = document.querySelector('.gallery-item');
  if (!galleryItem) return;
  setTimeout(() => {
    scrollBy({
      top: galleryItem.getBoundingClientRect().height * 2,
      left: 0,
      behavior: 'smooth',
    });
  }, 200);
}