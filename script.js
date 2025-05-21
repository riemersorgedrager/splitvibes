let currentMode = 'pistol'; // default weapon

// Mode switch buttons
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

  // Store cube data for accurate click targeting
  cube.dataset.x = x;
  cube.dataset.y = y;
  cube.dataset.size = size;

  cube.addEventListener('click', (e) => {
    handleAction(e.clientX, e.clientY);
  });

  document.getElementById('container').appendChild(cube);
}

function handleAction(clickX, clickY) {
  const container = document.getElementById('container');
  const rect = container.getBoundingClientRect();
  const relX = clickX - rect.left;
  const relY = clickY - rect.top;

  // Find the clicked cube based on mouse position
  const allCubes = Array.from(container.querySelectorAll('.cube'));
  const target = allCubes.find(cube => {
    const x = parseFloat(cube.dataset.x);
    const y = parseFloat(cube.dataset.y);
    const size = parseFloat(cube.dataset.size);
    return relX >= x && relX <= x + size && relY >= y && relY <= y + size;
  });

  if (!target) return;

  const x = parseFloat(target.dataset.x);
  const y = parseFloat(target.dataset.y);
  const size = parseFloat(target.dataset.size);

  if (currentMode === 'pistol') {
    splitCube(x, y, size);
  } else if (currentMode === 'shotgun') {
    shotgunBlast(x, y, size);
  } else if (currentMode === 'bazooka') {
    bazookaBoom(x, y, size);
  }
}

function splitCube(x, y, size) {
  const cube = findCube(x, y, size);
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

  // Always include the center cube
  splitCube(centerX, centerY, size);

  for (let i = 1; i < shots; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radius;
    const offsetX = Math.round(Math.cos(angle) * distance / size) * size;
    const offsetY = Math.round(Math.sin(angle) * distance / size) * size;
    splitCube(centerX + offsetX, centerY + offsetY, size);
  }
}

function bazookaBoom(centerX, centerY, size) {
  const radius = document.getElementById('container').offsetWidth / 3;
  const shots = 25;

  for (let i = 0; i < shots; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radius;
    const offsetX = Math.round(Math.cos(angle) * distance / size) * size;
    const offsetY = Math.round(Math.sin(angle) * distance / size) * size;
    splitCube(centerX + offsetX, centerY + offsetY, size);
  }
}

function findCube(x, y, size) {
  const allCubes = document.querySelectorAll('.cube');
  return Array.from(allCubes).find(cube =>
    parseFloat(cube.dataset.x) === x &&
    parseFloat(cube.dataset.y) === y &&
    parseFloat(cube.dataset.size) === size
  );
}

window.onload = () => {
  const size = document.getElementById('container').offsetWidth;
  createCube(0, 0, size);
};
