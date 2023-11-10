export default class Dropdown {
    constructor(id){
        this.drop = document.querySelector(id);
        this.btn = this.drop.querySelector('.dropdown__btn');
        this.click = this.drop.querySelector('.click-zone');
        this.list = this.drop.querySelector('.dropdown__list');
        this.items = this.drop.querySelectorAll('li');
        this.dropThisItem = this.drop.querySelector('.dropdown__this-item');
        this.startValue();
        this.dropMain();
        this.observer(this.btn, this.list);
    }
    startValue(){
        this.dropThisItem.innerHTML = this.items[0].textContent
    }
    dropMain(){
        document.addEventListener('click', (e) => {
            if(e.target.classList[0] !== this.click.classList[0]){
                this.drop.classList.remove("dropdown_active");
            }else{
                this.drop.classList.toggle("dropdown_active");
            }
        })
        this.items.forEach(item => {
            item.addEventListener('click', () => {
                this.dropThisItem.innerHTML = item.innerHTML
            })
        });
    }
    observer(btn, list){
        const options = {
            rootMargin: `0px 0px -${this.list.offsetHeight}px 0px`,
            threshold: 1 
        };  
        const observer = new IntersectionObserver(callback, options);  
        observer.observe(this.drop);

        function callback(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    list.style.top = `${btn.offsetHeight}px`
                } else {
                    list.style.top = `-${list.offsetHeight}px`
                }
            });
        }
    }
}
