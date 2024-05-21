if (document.fonts && document.fonts.load) {
  document.fonts.load('1em "Material Symbols Outlined"')
    .then(function() {
      console.log('1em "Material Symbols Outlined" loaded');
      document.body.classList.add('fonts-loaded');
    })
    .catch(function(error) {
      console.error('Error loading font:', error);
    });
} else {
  console.warn('document.fonts.load not supported');
}