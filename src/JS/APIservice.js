export default class apiServive {
  constructor() {
    this.tag = '';
    // this.pages = 1;
  }

  async fetchCards() {
    const key = '33763278-a8135cc0e5b2d03eb2d8094e4';
    const response = await fetch(
      `https://pixabay.com/api/?key=${key}&q=${this.tag}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
    );
    const photos = await response.json();
    // this.page += 1;
    return photos.hits;
  }

  get tag() {
    return this.tag;
  }
  set tag(inputTag) {
    this.tag = inputTag;
  }
  //   resetPage() {
  //     // this.page = 1;
  //   }
}
