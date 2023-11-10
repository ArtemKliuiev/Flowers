import Dropdown from './modules/dropdown';
class Catalog{
    constructor(){
        this.menuLeft = document.querySelector('.left-menu');
        this.itemsFiler = document.querySelectorAll('.left-menu__menu-item');
        this.itemsSortAdaptive = document.querySelectorAll('.left-menu__adaptive-sort-item');
        this.leftMenuBtn = document.querySelector('.button-for-left-menu');
        this.deletFilterBtn = document.querySelector('.left-menu__adaptive-delete-filters');
        this.exitApativeLeftMenu = document.querySelector('.left-menu__adaptive-back');
        this.dropdown = new Dropdown('.drop-1');
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
            document.querySelectorAll('.left-menu__menu-item-title-active').forEach(item => {
                const title = item.querySelector('.left-menu__menu-item-title');
                if(el !== title){
                    item.classList.remove('left-menu__menu-item-title-active');
                }    
            });
        };
        this.itemsFiler.forEach(item => {
            const title = item.querySelector('.left-menu__menu-item-title');
            title.addEventListener('click', (e) => {
                removeActive(e.target);
                item.classList.toggle('left-menu__menu-item-title-active');
            })
        })
    }
    tabsSortAdaptive(){
        const menuLeft = this.menuLeft;
        menuLeft.addEventListener('click', (e) => {
            if(e.target.classList[0] === 'left-menu__adaptive-back'){
                menuLeft.classList.remove('left-menu_sort-active');
                this.itemsSortAdaptive.forEach(item => {
                    item.classList.remove('left-menu__adaptive-sort-item_active')
                });
            }
        })
        function closeWindow(item){
            item.querySelectorAll('.left-menu__sort-item-menu-point').forEach(point => {
                point.addEventListener('click', () => {
                    menuLeft.classList.remove('left-menu_sort-active');
                    item.classList.remove('left-menu__adaptive-sort-item_active');
                    item.querySelector('.left-menu__sort-item-info').innerHTML = point.textContent;
                })
            })
        }
        this.itemsSortAdaptive.forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target.classList[0] !== 'left-menu__sort-item-menu-point'){
                    menuLeft.classList.add('left-menu_sort-active');
                    item.classList.add('left-menu__adaptive-sort-item_active');
                }
            });
            closeWindow(item);
        })
    }
    deletFilter(){
        this.deletFilterBtn.addEventListener('click', () => {
            document.querySelectorAll('.left-menu__sort-item-info').forEach(item => {
                item.innerHTML = ''
            });
            this.menuLeft.querySelectorAll('input').forEach(input => {
                input.checked = false;
            });
        })
    }
}
const catalog = new Catalog();

