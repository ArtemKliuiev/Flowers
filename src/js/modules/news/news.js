import firebase from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
const newsCardWrapper = document.querySelectorAll('.news__card-wrapper');

export default class newsCard {
    constructor() {
      this.db = firebase.getFirestore();  
    }
    async loadCards() {
      const filterNews = query(
        collection(this.db, 'news'),
        where('price', '==', null)
      );

      const querySnapshot = await getDocs(filterNews);
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        const { text, title, img } = product;
        let template = `
            <div class="news__card">
             <div class="news__card-img">
                <img src="${img.default}" alt="user-photo">
            </div>
            <h5 class="news__card-title">${title}</h5>
            <h4 class="news__card-text">${text}</h4>
            <a href="#">
                <p class="news__card-link">Читать далее...</p>
            </a>
            </div>`;
        newsCardWrapper.forEach((slide) => {
          slide.insertAdjacentHTML('beforeend', template);
        });
      });
    }
  }

