import apiServive from './JS/APIservice';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

Notiflix.Notify.init({ position: 'right-top' });

const formEL = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let totalHits = 0;
let counerCards = 40;

formEL.addEventListener('submit', searchPhotos);
loadMoreBtn.addEventListener('click', onLoadMore);

const apiServ = new apiServive();
const gellery = new SimpleLightbox('.photo-card a');

async function searchPhotos(evt) {
  evt.preventDefault();
  galleryEl.innerHTML = '';
  loadMoreBtn.classList.add('opacity');
  apiServ.setTag = evt.currentTarget.elements.searchQuery.value;
  apiServ.resetPage();

  const response = await apiServ.fetchCards();
  renderCards(response);
  console.log(response.data.totalHits);
  totalHits = response.data.totalHits;
  if (response.data.hits.length === 0) return;
  Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
  if (totalHits <= 40) {
    return;
  }
  loadMoreBtn.classList.remove('opacity');
}

function renderCards(cardObj) {
  if (cardObj.data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  const markup = cardObj.data.hits.map(card => {
    return `<div class="photo-card">
          <a class="gallery__item" href="${card.largeImageURL}">
          <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" class="cardImg" />
          <div class="info">
            <p class="info-item">
              <b class='count'>${card.likes}</b>
              <b>Likes</b>
            </p>
            <p class="info-item">
             <b class='count'>${card.views}</b>
              <b>Views</b>
            </p>
            <p class="info-item">
             <b class='count'>${card.comments}</b>
              <b>Comments</b>
            </p>
            <p class="info-item">
             <b class='count'>${card.downloads}</b>
              <b>Downloads</b>
            </p>
          </div>
           </a>
        </div>`;
  });

  galleryEl.insertAdjacentHTML('beforeend', [...markup]);
  activeLightBox();
}

async function onLoadMore() {
  const response = await apiServ.fetchCards();
  renderCards(response);
  counerCards += response.data.hits.length;
  console.log(counerCards);
  if (counerCards === totalHits) {
    loadMoreBtn.classList.add('opacity');
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    return;
  }
}

function activeLightBox() {
  const galleryLink = document.querySelectorAll('.gallery__item');
  galleryLink.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
    });
  });
  gellery.refresh();
}
