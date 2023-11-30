import Menu from './modules/catalog/left-menu';
import Pagination from './modules/pagination';

const pagination = new Pagination(22)




class Catalog{
    constructor(){
        this.menuLeft = document.querySelector('.left-menu');
        this.itemsFiler = document.querySelectorAll('.left-menu__item');
        this.itemsSortAdaptive = document.querySelectorAll('.sort-adaptive__main');
        this.leftMenuBtn = document.querySelector('.button-for-left-menu');
        this.deletFilterBtn = document.querySelector('.left-menu__delete-filters');
        this.exitApativeLeftMenu = document.querySelector('.left-menu__adaptive-back');
        this.menu = new Menu();
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
        function removeActive(el){                         
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
    
    tabsSortAdaptive(){
        const menu = this.menu
        const menuLeft = this.menuLeft;
        this.itemsSortAdaptive.forEach(item => {
            item.querySelector('.sort-adaptive__btn').addEventListener('click', () => {
                menuLeft.classList.add('left-menu_sort-active');
                item.classList.add('sort-adaptive__main_active');
                item.querySelectorAll('.sort-adaptive__point').forEach(point => {
                    point.addEventListener('click', () => {
                        item.querySelector('.sort-adaptive__info').innerHTML = point.textContent
                        remove(item);
                        menu.update();
                    })
                })
            })
            window.addEventListener('click', (e) => {
                if(!document.querySelector('.sort-adaptive').contains(e.target)){
                    remove(item);
                }
            })
        });
        function remove(item){
            menuLeft.classList.remove('left-menu_sort-active');
            item.classList.remove('sort-adaptive__main_active');
        }
    }
    deletFilter(){
        const menu = this.menu
        this.deletFilterBtn.addEventListener('click', () => {
            document.querySelectorAll('.sort-adaptive__info').forEach(item => {
                item.innerHTML = ''
            });
            this.menuLeft.querySelectorAll('input').forEach(input => {
                input.checked = false;
            });
            menu.update();
        })
    }
}
const catalog = new Catalog();
