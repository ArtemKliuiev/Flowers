function order() {
    const productNameContainer = document.querySelectorAll('.basket__card');
    
    if (productNameContainer) {
      parsedBasket.forEach((item) => {
        const productNameElement = document.createElement('p');
        productNameElement.textContent = item.productName;
        
        
      });
    }
  }

  order();