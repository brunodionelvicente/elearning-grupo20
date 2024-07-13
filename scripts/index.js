document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  
  // Verifica si el listener ya está añadido
  if (!navToggle.dataset.listenerAdded) {
    navToggle.addEventListener('click', () => {
      console.log("se hace clic");
      nav.classList.toggle('nav-open');
    });

    // Marca el botón como listener añadido
    navToggle.dataset.listenerAdded = 'true';
  }

  const optionListSection = document.querySelector('.optionList-section');
  const loader = document.querySelector('.loader');
  const loaderContainer = document.querySelector('.loader-container');

  function createArticle(course) {
    const article = document.createElement('article');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('article_image');
    const img = document.createElement('img');
    img.src = course.image;
    img.width = 250;
    img.height = 200;
    img.alt = course.title;
    imageDiv.appendChild(img);

    const textDiv = document.createElement('div');
    textDiv.classList.add('article_text');
    const title = document.createElement('h3');
    title.textContent = course.title;
    const description = document.createElement('p');
    description.textContent = course.description;
    textDiv.appendChild(title);
    textDiv.appendChild(description);

    article.appendChild(imageDiv);
    article.appendChild(textDiv);

    return article;
  }

  async function fetchCourses(token) {
    try {
      const response = await fetch('https://grupo20.up.railway.app/api/v1/course', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log({response})
      const courses = await response.json();
      console.log({courses})
      courses.data.forEach(course => {
        const article = createArticle(course);
        optionListSection.appendChild(article);
      });
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
    } finally {
      // Ocultar el loader después de obtener los cursos
      loaderContainer.style.display = 'none';
      loader.style.display = 'none';
    }
  }

  // Función para hacer login y obtener el token
  async function login() {
    try {
      const response = await fetch('https://grupo20.up.railway.app/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'bruno@dionel.com',
            password: 'bruno'
        })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log({data: data.data})
      return data.data.token;
    } catch (error) {
      console.error('Error al hacer login:', error);
    }
  }

  // Hacer login y luego obtener los cursos
  async function initialize() {
    loaderContainer.style.display = 'flex';
    loader.style.display = 'block'; 
      const token = await login();
      if (token) {
        fetchCourses(token);
      }
  }

  // Llamar a la función de inicialización
  initialize();
});