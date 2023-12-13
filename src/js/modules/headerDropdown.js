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

function searchDropdown() {
  const searchDropDown = document.querySelectorAll('.search-drop-down__header');

  searchDropDown.forEach((item) => {
    const menuSearch = item.querySelector('.search-dropdown');
    const menuArrow = item.querySelector('.search-drop-down__header-arrow');

    item.addEventListener('click', (e) => {
      e.stopPropagation();

      closeAllDropdowns();

      menuSearch.classList.add('active');
      if (menuArrow) {
        menuArrow.classList.add('active');
      }
    });
  });

  document.addEventListener('click', () => {
    closeAllDropdowns();
  });

  function closeAllDropdowns() {
    searchDropDown.forEach((item) => {
      const menuSearch = item.querySelector('.search-dropdown');
      const menuArrow = item.querySelector('.search-drop-down__header-arrow');

      menuSearch.classList.remove('active');
      if (menuArrow) {
        menuArrow.classList.remove('active');
      }
    });
  }
}

searchDropdown();

function headerDropdownMobile() {
  const dropdownItems = document.querySelectorAll(
    '.mobile-menu-dropdowns__item--witharrow'
  );
  let currentDropdown = null;

  dropdownItems.forEach((dropdownItem) => {
    const arrow = dropdownItem.querySelector('svg');
    const dropdown = dropdownItem.querySelector(
      '.mobile-menu-dropdowns__body-second'
    );

    dropdownItem.addEventListener('click', (e) => {
      e.preventDefault();

      if (currentDropdown && currentDropdown !== dropdown) {
        currentDropdown.classList.remove('active');
        currentDropdown
          .closest('.mobile-menu-dropdowns__item--witharrow')
          .querySelector('svg')
          .classList.remove('active');
      }

      if (dropdown) {
        dropdown.classList.toggle('active');
        arrow.classList.toggle('active');

        currentDropdown = dropdown;
      }
    });

    if (dropdown) {
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });
}

headerDropdownMobile();

function headerCategoriesDropdown() {
  const dropdown = document.querySelector('.menu__item--type--categories');
  const arrow = document.querySelector('.pull-down__arrow');
  const secondMenuHovers = document.querySelectorAll('#menuHover');

  let prevMenuHover = null;
  let prevArrowSecondary = null;

  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.add('active');
    arrow.classList.add('active');
  });

  secondMenuHovers.forEach((secondMenuHover) => {
    secondMenuHover.addEventListener('click', (e) => {
      e.stopPropagation();

      if (prevArrowSecondary) {
        prevArrowSecondary.classList.remove('active');
      }

      if (prevMenuHover) {
        prevMenuHover.classList.remove('active');
      }

      let arrowSecondary = secondMenuHover.querySelector('#arrowSecondary');
      arrowSecondary.classList.add('active');

      secondMenuHover.classList.toggle('active');

      prevMenuHover = secondMenuHover;
      prevArrowSecondary = arrowSecondary;
    });
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      if (prevArrowSecondary) {
        prevArrowSecondary.classList.remove('active');
      }

      if (prevMenuHover) {
        prevMenuHover.classList.remove('active');
      }

      dropdown.classList.remove('active');
      arrow.classList.remove('active');
    }
  });
}

headerCategoriesDropdown();
