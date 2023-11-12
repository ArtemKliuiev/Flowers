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
  const dropdownItems = document.querySelectorAll('.mobile-menu-dropdowns__item--witharrow');
    dropdownItems.forEach((dropdownItem) => {
      const arrow = dropdownItem.querySelector('svg');
      const dropdown = dropdownItem.querySelector('.mobile-menu-dropdowns__body-second');

      dropdownItem.addEventListener('click', (e) => {
        e.preventDefault();
        if(dropdown) {
          dropdown.classList.toggle('active');
          arrow.classList.toggle('active');

          dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
          });
        }
        
      })
    })

}
headerDropdownMobile();
