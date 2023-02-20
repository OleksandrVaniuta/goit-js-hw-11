import axios from 'axios';

export default class apiServive {
  constructor() {
    this.tag = '';
    this.page = 1;
  }

  async fetchCards() {
    const options = {
      params: {
        q: this.tag,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.page,
        per_page: 40,
        key: '33763278-a8135cc0e5b2d03eb2d8094e4',
      },
    };
    try {
      const response = await axios.get('https://pixabay.com/api/', options);
      this.page += 1;
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  get setTag() {
    return this.tag;
  }
  set setTag(inputTag) {
    this.tag = inputTag;
  }
  resetPage() {
    this.page = 1;
  }
}
