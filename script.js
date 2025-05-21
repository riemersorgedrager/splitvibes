function createCube(x, y, size) {
  const cube = document.createElement('div');
  cube.classList.add('cube');
  cube.style.left = `${x}px`;
  cube.style.top = `${y}px`;
  cube.style.width = `${size}px`;
  cube.style.height = `${size}px`;

  function handleInteraction(e) {
    cube.remove();

    const newSize = size / 2;
    if (newSize < 10) return;

    for (let dx = 0; dx < 2; dx++) {
      for (let dy = 0; dy < 2; dy++) {
        createCube(x + dx * newSize, y + dy * newSize, newSize);
      }
    }
  }

  // Mouse hover
  cube.addEventListener('mouseover', handleInteraction);
  // Mobile touch
  cube.addEventListener('touchstart', handleInteraction, { passive: true });

  document.getElementById('container').appendChild(cube);
}

window.onload = () => {
  createCube(0, 0, document.getElementById('container').offsetWidth);
};
