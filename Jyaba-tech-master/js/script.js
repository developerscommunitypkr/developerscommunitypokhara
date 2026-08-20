// Developers Community Pokhara - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const hamburger = document.querySelector('.td-header__hamburger');
  const mobileMenu = document.querySelector('.td-header__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('td-header__mobile-menu--open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  
  const mobileLinks = document.querySelectorAll('.td-header__mobile-inner .td-header__link');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu) {
        mobileMenu.classList.remove('td-header__mobile-menu--open');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
