function menuSwitch() {
  const categoryMenuButton = document.getElementById('categoryMenuButton');
  const categoryMenu = document.getElementById('categoryMenu');
  categoryMenuButton.addEventListener('click', () => {
    categoryMenu.classList.add('_active');
  });
}

menuSwitch();
