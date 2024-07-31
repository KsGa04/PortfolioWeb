document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
      const leftButton = item.querySelector('.button-left');
      const rightButton = item.querySelector('.button-right');
      const projectName = `project${index + 1}`;
  
      // Initial image load
      loadImage(projectName);
  
      leftButton.addEventListener('click', () => {
        prevImage(projectName);
      });
  
      rightButton.addEventListener('click', () => {
        nextImage(projectName);
      });
    });
  });
  
  function loadImage(projectName) {
    fetch(`/get_image/${projectName}`)
      .then(response => response.json())
      .then(data => {
        const img = document.querySelector(`[alt="project${projectName.slice(-1)}"] `);
        img.src = `../static/images/${data.image}`;
      })
      .catch(error => console.error('Error loading image:', error));
  }
  
  function nextImage(projectName) {
    fetch(`/next_image/${projectName}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        const img = document.querySelector(`[alt="project${projectName.slice(-1)}"]`);
        img.src = `../static/images/${data.image}`;
      })
      .catch(error => console.error('Error loading next image:', error));
  }
  
  function prevImage(projectName) {
    fetch(`/prev_image/${projectName}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        const img = document.querySelector(`[alt="project${projectName.slice(-1)}"]`);
        img.src = `../static/images/${data.image}`;
      })
      .catch(error => console.error('Error loading previous image:', error));
  }
