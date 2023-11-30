function stickyHeader() {
  let isHeaderScrolled = false;

  window.addEventListener('scroll', () => {
    const stickyHeaders = document.querySelectorAll('.header');
    const burger = document.querySelector('.icon-menu');

    if (burger) {
      burger.addEventListener('click', () => {
        stickyHeaders.forEach((stickyHeader) => {
          if (stickyHeader.classList.contains('header-scroll')) {
            stickyHeader.classList.remove('header-scroll');
            
          }
          if (!burger.classList.contains('_active') && window.scrollY > 0) {
            stickyHeader.classList.add('header-scroll');
            
          }
        });
      });
    }

    stickyHeaders.forEach((stickyHeader) => {
      if (!isHeaderScrolled && window.scrollY > 0) {
        stickyHeader.classList.add('header-scroll');
        isHeaderScrolled = true;

      } else if (isHeaderScrolled && window.scrollY === 0) {
        stickyHeader.classList.remove('header-scroll');
        isHeaderScrolled = false;
      }
    });
  });
}

stickyHeader();
