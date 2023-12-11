function headerDropdown() {
  const dropdownHeaders = document.querySelectorAll('.top-header__drop-down');

  dropdownHeaders.forEach((dropdownHeader) => {
    dropdownHeader.addEventListener('click', (e) => {
      const list = e.target.closest('.drop-down__list-item');
      if (list) {
        const listItem = dropdownHeader.querySelector(
          '.drop-down__selected-list-item'
        );
        listItem.textContent = list.textContent;
      }
    });
  });
}

headerDropdown();

function headerDropdownMobile() {
  const dropdownItems = document.querySelectorAll(
    '.mobile-menu-dropdowns__item--witharrow'
  );
  dropdownItems.forEach((dropdownItem) => {
    const arrow = dropdownItem.querySelector('svg');
    const dropdown = dropdownItem.querySelector(
      '.mobile-menu-dropdowns__body-second'
    );

    dropdownItem.addEventListener('click', (e) => {
      e.preventDefault();
      if (dropdown) {
        dropdown.classList.toggle('active');
        arrow.classList.toggle('active');

        dropdown.addEventListener('click', (e) => {
          e.stopPropagation();
        });
      }
    });
  });
}
headerDropdownMobile();

function headerCategoriesDropdown() {
  const dropdown = document.querySelector('.menu__item--type--categories');
  const arrow = document.querySelector('.pull-down__arrow');
  const secondMenuHovers = document.querySelectorAll('#menuHover');
  
  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.add('active');
    arrow.classList.add('active');
  });

  let flagActive = false;

  secondMenuHovers.forEach((secondMenuHover) => {
    secondMenuHover.addEventListener('click', () => {
      secondMenuHovers.forEach((otherMenuHover) => {
        otherMenuHover.classList.remove('active');
      });

      secondMenuHover.classList.toggle('active');
      flagActive = !flagActive;
    });
  });
}

headerCategoriesDropdown();
