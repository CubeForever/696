const FLOAT_EMOJIS = ['🎈','💗','⭐','🌸','🫧'];
function spawnFloats(container, count) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'float-item';
    el.textContent = FLOAT_EMOJIS[i % FLOAT_EMOJIS.length];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (16 + Math.random() * 22) + 'px';
    el.style.animationDuration = (8 + Math.random() * 10) + 's';
    el.style.animationDelay = (-Math.random() * 12) + 's';
    container.appendChild(el);
  }
}

const CONFETTI_COLORS = ['#FF8FB1','#FFD98E','#FF8A5C','#C9A8E8','#A8E8C8','#FFFFFF'];
function burstConfetti(x, y, count = 80) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    const angle = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 220;
    p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
    p.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
    p.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1400);
  }
}
function rainHearts(count = 30) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.className = 'heart-rain';
    h.textContent = Math.random() > 0.5 ? '💗' : '💕';
    h.style.left = Math.random() * 100 + 'vw';
    h.style.animationDelay = Math.random() * 2 + 's';
    h.style.fontSize = (14 + Math.random() * 20) + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 6000);
  }
}

spawnFloats(document.getElementById('floatLayer'), 14);

document.getElementById('startBtn').addEventListener('click', () => {
  burstConfetti(window.innerWidth / 2, window.innerHeight / 2);
  setTimeout(() => { for (let i = 0; i < 6; i++) burstConfetti(Math.random() * innerWidth, Math.random() * innerHeight * 0.4, 50); }, 200);
  rainHearts();
  setTimeout(() => document.getElementById('greeting').scrollIntoView({ behavior: 'smooth' }), 700);
});
