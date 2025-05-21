let currentMode = 'pistol'; // default

// Mode switching
document.querySelectorAll('.weapon').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.weapon').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    currentMode = btn.dataset.mode;
  });
});

function createCube(x, y, size) {
  const cube = document.createElement('div');
  cube.classList.add('cube');
  cube.style.left = `${x}px`;
  cube.style.top = `${y}px`;
  cube.style.width = `${size}px`;
  cube.style.height = `${size}px`;

  cube.addEventListener('mouseover', (e) => {
    handleAction(x, y, size);
  });

  document.getElementById('container').appendChild(cube);
}

function handleAction(x, y, size) {
  if (currentMode === 'pistol') {
    splitCube(x, y, size);
  } else if (currentMode === 'shotgun') {
    shotgunBlast(x, y, size);
  } else if (currentMode === 'bazooka') {
    bazookaBoom(x, y, size);
  }
}

function splitCube(x, y, size) {
  const cube = document.querySelector(`.cube[style*="left: ${x}px"][style*="top: ${y}px"]`);
  if (cube) cube.remove();

  const newSize = size / 2;
  if (newSize < 10) return;

  for (let dx = 0; dx < 2; dx++) {
    for (let dy = 0; dy < 2; dy++) {
      createCube(x + dx * newSize, y + dy * newSize, newSize);
    }
  }
}

function shotgunBlast(centerX, centerY, size) {
  const radius = document.getElementById('container').offsetWidth / 6;
  const shots = 6;

  // Always one dead center
  splitCube(centerX, centerY, size);

  for (let i = 1; i < shots; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radius;
    const offsetX = Math.round(Math.cos(angle) * distance);
    const offsetY = Math.round(Math.sin(angle) * distance);
    splitCube(centerX + offsetX, centerY + offsetY, size);
  }
}

function bazookaBoom(centerX, centerY, size) {
  const radius = document.getElementById('container').offsetWidth / 3;
  const shots = 25;

  for (let i = 0; i < shots; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radius;
    const offsetX = Math.round(Math.cos(angle) * distance);
    const offsetY = Math.round(Math.sin(angle) * distance);
    splitCube(centerX + offsetX, centerY + offsetY, size);
  }
}

window.onload = () => {
  createCube(0, 0, document.getElementById('container').offsetWidth);
};
