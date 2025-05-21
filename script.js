let currentMode = 'pistol'; // Default weapon mode

// 🎯 Set up weapon switching
document.querySelectorAll('.weapon').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.weapon').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    currentMode = btn.dataset.mode;
  });
});

// 🧊 Create a single cube at a given x/y/size
function createCube(x, y, size) {
  const cube = document.createElement('div');
  cube.classList.add('cube');
  cube.style.left = `${x}px`;
  cube.style.top = `${y}px`;
  cube.style.width = `${size}px`;
  cube.style.height = `${size}px`;

  cube.dataset.x = x;
  cube.dataset.y = y;
  cube.dataset.size = size;

  cube.addEventListener('click', (e) => {
    handleAction(e.clientX, e.clientY);
  });

  document.getElementById('container').appendChild(cube);
}

function handleAction(clickX, clickY) {
  const spread = {
    pistol: 0,
    shotgun: 25,
    bazooka: 60
  };

  const shots = {
    pistol: 1,
    shotgun: 15,
    bazooka: 100
  };

  const radius = spread[currentMode];
  const count = shots[currentMode];
  const delay = 30; // ms between each simulated click

  for (let i = 0; i < count; i++) {
    const offsetX = i === 0 ? 0 : (Math.random() * 2 - 1) * radius;
    const offsetY = i === 0 ? 0 : (Math.random() * 2 - 1) * radius;

    setTimeout(() => {
      fireAt(clickX + offsetX, clickY + offsetY);
    }, i * delay);
  }
}


// 🧨 Fire a single shot at a given screen coordinate
function fireAt(clickX, clickY) {
  const container = document.getElementById('container');
  const rect = container.getBoundingClientRect();
  const relX = clickX - rect.left;
  const relY = clickY - rect.top;

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

  splitCube(x, y, size);
}

// 💥 Basic 4-way cube split (recursive limit based on size)
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

// 🔍 Find cube by exact grid coords (used for removal)
function findCube(x, y, size) {
  const allCubes = document.querySelectorAll('.cube');
  return Array.from(allCubes).find(cube =>
    parseFloat(cube.dataset.x) === x &&
    parseFloat(cube.dataset.y) === y &&
    parseFloat(cube.dataset.size) === size
  );
}

// 🚀 Initialize
window.onload = () => {
  const size = document.getElementById('container').offsetWidth;
  createCube(0, 0, size);
};
