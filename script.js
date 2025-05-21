function createCube(x, y, size) {
  const cube = document.createElement('div');
  cube.classList.add('cube');
  cube.style.left = `${x}px`;
  cube.style.top = `${y}px`;
  cube.style.width = `${size}px`;
  cube.style.height = `${size}px`;

  // Add random animation delay for organic feel
  cube.style.animationDelay = `${Math.random() * 0.3}s`;

  cube.addEventListener('mouseover', (e) => {
    cube.remove();

    const newSize = size / 2;
    if (newSize < 10) return;

    for (let dx = 0; dx < 2; dx++) {
      for (let dy = 0; dy < 2; dy++) {
        createCube(x + dx * newSize, y + dy * newSize, newSize);
      }
    }

    // Optional: sparkle on split
    sparkle(e.pageX, e.pageY);
  });

  document.getElementById('container').appendChild(cube);
}

// Optional sparkle effect
function sparkle(x, y) {
  const dot = document.createElement('div');
  dot.className = 'sparkle';
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 500);
}

window.onload = () => {
  createCube(0, 0, 400);
};
