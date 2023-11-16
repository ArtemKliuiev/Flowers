export default function pagination (quantityPages){
    const letfBtn = document.querySelector('.pagination__arrow_left');
    const rightBtn = document.querySelector('.pagination__arrow_right');
    const arrowActive = 'pagination__arrow_active';
    const pointActive = 'pagination__point_active';
    const pointContainer = document.querySelector('.pagination__points');

    let currentPoint = 0;
    let maxPoint = 7;
    let hideNum = 0;
    let lostPage = maxPoint;
    if(window.innerWidth < 768){
        maxPoint = 5
    }

    function opacityArrow(index){
        if(index === 0){
            letfBtn.classList.remove(arrowActive);
            rightBtn.classList.add(arrowActive);
        }else if (index > (quantityPages - 2)){
            letfBtn.classList.add(arrowActive);
            rightBtn.classList.remove(arrowActive);
        }else{
            letfBtn.classList.add(arrowActive);
            rightBtn.classList.add(arrowActive);
        }
    }

    function removeActive(){
        document.querySelectorAll('.' + pointActive).forEach(item => {
            item.classList.remove(pointActive)
        })
    }

    function addActive(index){
        const allBtn = document.querySelectorAll('.pagination__point');
        const currenHide = document.querySelectorAll('.pagination__point_hide').length;
        removeActive();
        allBtn[index].classList.add(pointActive);
        opacityArrow(index);


        if(index  >= (maxPoint - 1) && index < (quantityPages - 1)){
            hideNum = (index - maxPoint) + 1
            // lostPage = hideNum + maxPoint
            for(let i = 0; i <= hideNum; i++){
                allBtn[hideNum].classList.add('pagination__point_hide')
            }
        }
        
        if(currenHide >= (index -1) && index > 0){
            allBtn[index - 1].classList.remove('pagination__point_hide')
            // console.log(index - 1)
        }
        // console.log(currenHide, 'h')
        // console.log(currenHide >= (index -1))




    }

    function addClick(){
        const allBtn = document.querySelectorAll('.pagination__point');
        letfBtn.addEventListener('click', () => {
            if(currentPoint > 0){
                currentPoint--;
                addActive(currentPoint);   
            }
        });
        rightBtn.addEventListener('click', () => {
            if(currentPoint < (quantityPages - 1)){
                currentPoint++;
                addActive(currentPoint);
            }
        });
        allBtn.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentPoint = index;
                addActive(index);
            })
        });
    }

    function addPoints(num){
        pointContainer.innerHTML = '';
        let hide = '';
        for(let i = 1; i <= num; i++){
            if(i > maxPoint){
                hide = 'pagination__point_hide'
            }
            pointContainer.innerHTML += `
            <li class="pagination__point">${i}</li>
            `;
        }
        addClick();
        addActive(currentPoint);
    }

    addPoints(quantityPages)
}