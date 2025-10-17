const container = document.querySelector('.card-container');
  const left = document.querySelector('.arrow.left');
  const right = document.querySelector('.arrow.right');

  right.onclick = () => container.scrollBy({ left: 300, behavior: 'smooth' });
  left.onclick = () => container.scrollBy({ left: -300, behavior: 'smooth' });