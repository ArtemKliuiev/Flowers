
class Catalog{
    constructor(){
        this.items = document.querySelectorAll('.left-menu__menu-item');
        this.tabs()
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
        this.items.forEach(item => {
            const title = item.querySelector('.left-menu__menu-item-title');
            title.addEventListener('click', (e) => {
                this.removeActive(e.target)
                item.classList.toggle('left-menu__menu-item-title-active')
            })
        })
    }
}
const catalog = new Catalog();

