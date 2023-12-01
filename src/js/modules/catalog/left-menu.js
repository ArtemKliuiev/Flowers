import loadFirebase from './firebase';
import Dropdown from '../dropdown';

export default class Menu{
    constructor(){
        this.firebase = new loadFirebase();
        this.dropdownPerson = new Dropdown('.drop-person');
        this.dropdownColor = new Dropdown('.drop-color');
        this.dropdownReason = new Dropdown('.drop-reason');
        this.dropdownSort = new Dropdown('.drop-sort');
        this.sortLine = document.querySelectorAll('.sort li');
        this.mainItem = document.querySelectorAll('.left-menu__point');
        this.adaptiveSort = document.querySelectorAll('.sort-adaptive__main');
        this.deletFilterBtn = document.querySelector('.left-menu__delete-filters');
        this.loadMore = document.querySelector('.cards__btn');
        this.quantity = 12;

        this.category = {
            bouquets: [''],
            roses: [''],
            inBox: [''],
            compositions: [''],
            gift: [''],
            giftBasket: [''],
            forBride: [''],
            delicious: [''],
            color: '',
            whom: '',
            occasion: '',
            sort: '',
        }

        this.addListener();
        this.firebase.load(this.category)
    }
    addListener(){
        this.mainItem.forEach(item => {
            item.querySelector('input').addEventListener('change', () => {
                this.update();
            })
        })
        this.sortLine.forEach(item => {
            item.addEventListener('click', () => {
                this.update();
            })
        })
        this.loadMore.addEventListener('click', () => {
            this.firebase.load(this.category, this.quantity, false);
            this.quantity += 3;
        })
    }

    update(){
        const thisClass = this;
        for(const key in this.category){
            if(this.category[key] != this.category.whom){
                this.category[key] = [''];
            }

        }

        const everDrop = (drop, num) => {
            if(drop !== 'Выбрать'){
                this.data(num, drop)
            }else{
                this.data(num, '')
            }

        }
        if(window.innerWidth > 768){
            everDrop(this.dropdownPerson.state(), 9);
            everDrop(this.dropdownColor.state(), 10);
            everDrop(this.dropdownReason.state(), 11);
            everDrop(this.dropdownSort.state(), 12);
        }else{
            this.adaptiveSort.forEach(item => {
                const nameItem = item.querySelector('.sort-adaptive__title').textContent;
                const namePoint = item.querySelector('.sort-adaptive__info').textContent;
    
                if(nameItem === 'Кому'){
                    everDrop(namePoint, 9);
                }else if(nameItem === 'По цвету'){
                    everDrop(namePoint, 10);
                }else if(nameItem === 'Повод'){
                    everDrop(namePoint, 11);
                }
            })
        };

        this.mainItem.forEach(item => {
            const input = item.querySelector('input');
            const lable = item.querySelector('label');
            const numCategory = +input.id.slice(6,7);
            if(input.checked === true){
                this.data(numCategory, lable.textContent)
            }
        });

        this.firebase.load(this.category)
    }

    data(category, item){

        switch(category){
            case 1:
                this.category.bouquets.push(item)
                break;
            case 2:
                this.category.roses.push(item)
                break;
            case 3:
                this.category.inBox.push(item)
                break;
            case 4:
                this.category.compositions.push(item)
                break;
            case 5:
                this.category.gift.push(item)
                break;
            case 6:
                this.category.giftBasket.push(item)
                break;
            case 7:
                this.category.forBride.push(item)
                break;
            case 8:
                this.category.delicious.push(item)
                break;
            case 9:
                this.category.whom = item;
                break;
            case 10:
                this.category.color = item;
                break;
            case 11:
                this.category.occasion = item;
                break;
            case 12:
                this.category.sort = item;
                break;
        }
    }

}