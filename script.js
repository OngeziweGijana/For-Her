const garden = document.getElementById('garden');
const hint = document.getElementById('hint');
const flowerCountEl = document.getElementById('flowerCount');
const rotatingMessageEl = document.getElementById('rotating-message');

let flowerCount = 0;

const petalColors = [
  ['#fca5a5', '#ef4444'],
  ['#f9a8d4', '#db2777'],
  ['#fde68a', '#f59e0b'],
  ['#a5f3fc', '#0891b2'],
  ['#d8b4fe', '#9333ea'],
  ['#bbf7d0', '#16a34a'],
  ['#fdba74', '#ea580c']
];

const messages = [
  "Every flower planted here honours a woman whose story was cut short.",
  "South Africa has one of the highest femicide rates in the world — this must change.",
  "She was somebody's daughter. She was somebody's mother. She mattered.",
  "Silence protects abusers. Speaking out protects lives.",
  "#NotOneMore — every life lost to femicide is one too many.",
  "Support survivors. Believe survivors. Stand with survivors.",
  "A safer South Africa for women starts with all of us.",
  "Grow awareness the way you grow this garden — one act at a time.",
  "Report abuse. Check in on the women around you. Break the cycle.",
  "Her name deserved to be remembered for more than how she died."
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createFlowerSVG(colorPair) {
  const [petalColor, centerColor] = colorPair;
  const size = randomBetween(40, 70);
  const stemHeight = randomBetween(60, 110);

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size + stemHeight);
  svg.setAttribute("viewBox", `0 0 100 ${100 + (stemHeight / size) * 100}`);

  const stemTop = 100;
  const stemBottom = 100 + (stemHeight / size) * 100;

  const stem = document.createElementNS(svgNS, "path");
  stem.setAttribute("d", `M50,${stemTop} Q${45 + Math.random() * 10},${stemTop + (stemBottom - stemTop) / 2} 50,${stemBottom}`);
  stem.setAttribute("stroke", "#22c55e");
  stem.setAttribute("stroke-width", "4");
  stem.setAttribute("fill", "none");
  svg.appendChild(stem);

  const leaf = document.createElementNS(svgNS, "ellipse");
  leaf.setAttribute("cx", 50 + (Math.random() > 0.5 ? 12 : -12));
  leaf.setAttribute("cy", stemTop + (stemBottom - stemTop) * 0.5);
  leaf.setAttribute("rx", 10);
  leaf.setAttribute("ry", 5);
  leaf.setAttribute("fill", "#16a34a");
  leaf.setAttribute("transform", `rotate(${Math.random() > 0.5 ? 30 : -30} 50 ${stemTop + (stemBottom - stemTop) * 0.5})`);
  svg.appendChild(leaf);

  const petalCount = 6;
  for (let i = 0; i < petalCount; i++) {
    const angle = (360 / petalCount) * i;
    const petal = document.createElementNS(svgNS, "ellipse");
    petal.setAttribute("cx", "50");
    petal.setAttribute("cy", "30");
    petal.setAttribute("rx", "14");
    petal.setAttribute("ry", "22");
    petal.setAttribute("fill", petalColor);
    petal.setAttribute("transform", `rotate(${angle} 50 50)`);
    petal.setAttribute("opacity", "0.95");
    svg.appendChild(petal);
  }

  const center = document.createElementNS(svgNS, "circle");
  center.setAttribute("cx", "50");
  center.setAttribute("cy", "50");
  center.setAttribute("r", "12");
  center.setAttribute("fill", centerColor);
  svg.appendChild(center);

  return svg;
}

function growFlower(x, y) {
  const flowerWrapper = document.createElement('div');
  flowerWrapper.className = 'flower';
  flowerWrapper.style.left = `${x}px`;
  flowerWrapper.style.top = `${y}px`;

  const colorPair = petalColors[Math.floor(Math.random() * petalColors.length)];
  const svg = createFlowerSVG(colorPair);
  flowerWrapper.appendChild(svg);

  garden.appendChild(flowerWrapper);

  flowerCount++;
  flowerCountEl.textContent = flowerCount;
}

garden.addEventListener('click', (e) => {
  hint.classList.add('hidden');
  const rect = garden.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  growFlower(x, y);
});

let messageIndex = 0;
function rotateMessages() {
  rotatingMessageEl.style.opacity = 0;
  setTimeout(() => {
    rotatingMessageEl.textContent = messages[messageIndex];
    rotatingMessageEl.style.opacity = 1;
    messageIndex = (messageIndex + 1) % messages.length;
  }, 600);
}

rotatingMessageEl.textContent = messages[0];
messageIndex = 1;
setInterval(rotateMessages, 5000);
