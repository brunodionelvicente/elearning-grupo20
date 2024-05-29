document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  console.log({navToggle, nav})
  
  // Verifica si el listener ya está añadido
  if (!navToggle.dataset.listenerAdded) {
    navToggle.addEventListener('click', () => {
      console.log("se hace clic");
      nav.classList.toggle('nav-open');
    });

    // Marca el botón como listener añadido
    navToggle.dataset.listenerAdded = 'true';
  }
});