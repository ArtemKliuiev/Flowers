import firebase from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
const photoCardWrapper = document.querySelectorAll('.photo__card-wrapper');

export default class photoCard {
  constructor() {
    this.db = firebase.getFirestore();
  }
  async loadCards() {
    const filterPhoto = query(
      collection(this.db, 'photoOrder'),
      where('title', '!=', null)
    );

    const querySnapshot = await getDocs(filterPhoto);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const { data, title, img } = product;
      let template = `
            <div class="photo__card">
                <div class="photo__card-img">
                    <img src="${img.default}" alt="user-photo">
                </div>
                <p class="photo__card-data">${data}</p>
                <h4 class="photo__card-name">${title}</h4>
                <a href="#">
                    <p class="photo__card-by">Купить такой букет</p>
                </a>
            </div>`;
      photoCardWrapper.forEach((slide) => {
        slide.insertAdjacentHTML('beforeend', template);
      });
    });
  }
}
