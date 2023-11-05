
function headerDropdown() {
    const dropdownHeaders = document.querySelectorAll('.top-header__drop-down');
    dropdownHeaders.forEach((dropdownHeader) => {
      dropdownHeader.addEventListener('click', (e) => {
        const list = e.target.closest('.drop-down__list-item');
        if (list) {
          const listItem = dropdownHeader.querySelector('.drop-down__selected-list-item');
          listItem.textContent = list.textContent;
        }
      });
    });
  }
  
  headerDropdown();
