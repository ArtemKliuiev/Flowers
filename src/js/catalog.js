
class Catalog{
    constructor(){
        this.menuLeft = document.querySelector('.left-menu');
        this.itemsFiler = document.querySelectorAll('.left-menu__menu-item');
        this.itemsSortAdaptive = document.querySelectorAll('.left-menu__adaptive-sort-item');
        this.tabs();
        this.tabsSortAdaptive();
    }
    removeActive(el){
        document.querySelectorAll('.left-menu__menu-item-title-active').forEach(item => {
            const title = item.querySelector('.left-menu__menu-item-title');
            if(el !== title){
                item.classList.remove('left-menu__menu-item-title-active');
            }               
        });
    };
    tabs(){
        this.itemsFiler.forEach(item => {
            const title = item.querySelector('.left-menu__menu-item-title');
            title.addEventListener('click', (e) => {
                this.removeActive(e.target)
                item.classList.toggle('left-menu__menu-item-title-active')
            })
        })
    }
    tabsSortAdaptive(){
        this.itemsSortAdaptive.forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.left-menu__adaptive-sort-item').forEach(item => {
                    item.classList.remove('left-menu__adaptive-sort-item_active');     
                });
                this.menuLeft.classList.add('left-menu_sort-active');
                item.classList.add('left-menu__adaptive-sort-item_active')
            })
        })
    }
}
const catalog = new Catalog();

