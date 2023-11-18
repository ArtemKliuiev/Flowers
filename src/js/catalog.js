import Dropdown from './modules/dropdown';
import pagination from './modules/pagination';

pagination(22);



class Catalog{
    constructor(){
        this.menuLeft = document.querySelector('.left-menu');
        this.itemsFiler = document.querySelectorAll('.left-menu__item');
        this.itemsSortAdaptive = document.querySelectorAll('.sort-adaptive__main');
        this.leftMenuBtn = document.querySelector('.button-for-left-menu');
        this.deletFilterBtn = document.querySelector('.left-menu__adaptive-delete-filters');
        this.exitApativeLeftMenu = document.querySelector('.left-menu__adaptive-back');
        this.dropdown = new Dropdown('.drop-person');
        this.dropdown = new Dropdown('.drop-color');
        this.dropdown = new Dropdown('.drop-reason');
        this.dropdown = new Dropdown('.drop-sort');
        this.adaptiveFilter()
        this.tabsFilter();
        this.tabsSortAdaptive();
        this.deletFilter();
    }
    adaptiveFilter(){
        this.leftMenuBtn.addEventListener('click', () => {
            this.menuLeft.classList.add('left-menu_active');
            document.body.style.overflow = 'hidden';
        });
        this.exitApativeLeftMenu.addEventListener('click', () => {
            this.menuLeft.classList.remove('left-menu_active');

            document.body.style.overflow = 'auto';
        });
    }
    tabsFilter(){
        function removeActive(el){                         //active - модификатор
            document.querySelectorAll('.left-menu__title_active').forEach(item => {
                const title = item.querySelector('.left-menu__title');
                if(el !== title){
                    item.classList.remove('left-menu__title_active');
                }    
            });
        };
        this.itemsFiler.forEach(item => {
            const title = item.querySelector('.left-menu__title');
            title.addEventListener('click', (e) => {
                removeActive(e.target);
                item.classList.toggle('left-menu__title_active');
            })
        })
    }
    
    tabsSortAdaptive(){//Рефакторинг функции
        const menuLeft = this.menuLeft;
        menuLeft.addEventListener('click', (e) => {
            if(e.target.classList[0] === 'left-menu__adaptive-back'){
                menuLeft.classList.remove('left-menu_sort-active');
                this.itemsSortAdaptive.forEach(item => {
                    item.classList.remove('sort-adaptive__main_active')
                });
            }
        })
        function closeWindow(item){
            item.querySelectorAll('.sort-adaptive__point').forEach(point => {
                point.addEventListener('click', () => {
                    menuLeft.classList.remove('left-menu_sort-active');
                    item.classList.remove('sort-adaptive__main_active');
                    item.querySelector('.sort-adaptive__info').innerHTML = point.textContent;
                })
            })
        }
        this.itemsSortAdaptive.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target.classList[0] !== 'sort-adaptive__point'){
                    menuLeft.classList.add('left-menu_sort-active');
                    item.classList.add('sort-adaptive__main_active');
                }
            });
            closeWindow(item);
        })
    }
    deletFilter(){
        this.deletFilterBtn.addEventListener('click', () => {
            document.querySelectorAll('.sort-adaptive__info').forEach(item => {
                item.innerHTML = ''
            });
            this.menuLeft.querySelectorAll('input').forEach(input => {
                input.checked = false;
            });
        })
    }
}
const catalog = new Catalog();

