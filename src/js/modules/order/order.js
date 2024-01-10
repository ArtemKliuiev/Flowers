function order() {
    const productNameContainer = document.querySelectorAll('.basket__card');
    console.log('order');
    
    // if (productNameContainer) {
    //   parsedBasket.forEach((item) => {
    //     const productNameElement = document.createElement('p');
    //     productNameElement.textContent = item.productName;
        
        
    //   });
    // }




    const checkboxes = document.querySelectorAll('.order__form-left-button-wrapper');
    console.log(checkboxes);
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('active')
      })
    })
  }

  order();