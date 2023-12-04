import firebase from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
const videoCardWrapper = document.querySelectorAll('.video__card-wrapper');

export default class videoCard {
  constructor() {
    this.db = firebase.getFirestore();
  }
  async loadCards() {
    const filterVideo = query(
      collection(this.db, 'video'),
      where('name', '!=', null)
    );

    const querySnapshot = await getDocs(filterVideo);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      const { data, link, img, name } = product;
      let template = `
            <div class="video__card">
                <div class="video__card-img">
                    <img src="${img.default}" alt="video" />
                    <div class="video__card-play">
                        <svg ><use xlink:href="./images/Sprite.svg#review-play"></use></svg>    
                    </div>
                </div>
                <p class="video__card-data">${data}</p>
                <h4 class="video__card-name">Видео отзыв <br /> ${name}</h4>
            </div>`;
            videoCardWrapper.forEach((slide) => {
        slide.insertAdjacentHTML('beforeend', template);
      });
    });
  }
}
