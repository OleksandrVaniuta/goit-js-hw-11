// import apiServive from './JS/APIservice';
import Notiflix from 'notiflix';
Notiflix.Notify.init({ position: 'right-top' });

const formEL = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let tag = '';
let totalHits = 0;

formEL.addEventListener('submit', searchPhotos);
loadMoreBtn.addEventListener('click', onLoadMore);

// const apiServive = new apiServive();
function searchPhotos(evt) {
  evt.preventDefault();
  galleryEl.innerHTML = '';
  loadMoreBtn.classList.add('opacity');
  //   apiServive.tag = evt.currentTarget.elements.searchQuery.value;
  //   console.log(apiServive.tag);
  //   //   apiServive.resetPage();
  //   apiServive.fetchCards().then(data => renderCards(data));
  page = 1;
  console.log(evt.currentTarget.elements.searchQuery.value);
  tag = evt.currentTarget.elements.searchQuery.value;
  fetchPhotos(tag).then(photos => {
    renderCards(photos);
    totalHits = photos.totalHits;
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    if (totalHits <= 40) {
      return;
    }
    loadMoreBtn.classList.remove('opacity');
  });
}

async function fetchPhotos(tag) {
  const response = await fetch(
    `https://pixabay.com/api/?key=33763278-a8135cc0e5b2d03eb2d8094e4&q=${tag}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  const photos = await response.json();
  page += 1;
  return photos;
}

function renderCards(cardObj) {
  if (cardObj.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  const markup = cardObj.hits.map(card => {
    return `<div class="photo-card">
          <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" class="cardImg" />
          <div class="info">
            <p class="info-item">
              <b>${card.likes} Likes</b>
            </p>
            <p class="info-item">
              <b>${card.views} Views</b>
            </p>
            <p class="info-item">
              <b>${card.comments} Comments</b>
            </p>
            <p class="info-item">
              <b>${card.downloads} Downloads</b>
            </p>
          </div>
        </div>`;
  });
  console.log(cardObj.totalHits);
  galleryEl.insertAdjacentHTML('beforeend', [...markup]);
}

function onLoadMore() {
  fetchPhotos(tag).then(photos => renderCards(photos));
  if (page * 40 >= totalHits) {
    loadMoreBtn.classList.add('opacity');
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
  }
}
