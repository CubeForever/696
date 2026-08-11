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

const MAIN_LINE = '流烬燃，生日快乐！';
const SUB_LINE = '愿今天所有的惊喜和甜，都只为你而来。';
let typeTimer = null;
function typewriter(el, text, speed = 130, done) {
  let i = 0; el.textContent = '';
  typeTimer = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) { clearInterval(typeTimer); done && done(); }
  }, speed);
}

const CANDLE_COUNT = 8;
const candleLayer = document.getElementById('candles');
for (let i = 0; i < CANDLE_COUNT; i++) {
  const candle = document.createElement('div');
  candle.className = 'candle';
  candle.innerHTML = '<div class="flame"></div>';
  candle.addEventListener('click', () => {
    if (candle.classList.contains('out')) return;
    candle.classList.add('out');
    puffSmoke(candle);
    if (!candleLayer.querySelector('.candle:not(.out)')) setTimeout(birthdayFireworks, 500);
  });
  candleLayer.appendChild(candle);
}
function puffSmoke(candle) {
  const s = document.createElement('div'); s.className = 'smoke';
  candle.appendChild(s); setTimeout(() => s.remove(), 1200);
}
function birthdayFireworks() {
  document.getElementById('fireworks').textContent = '🎆 流烬燃，生日快乐！🎆';
  for (let i = 0; i < 8; i++) {
    setTimeout(() => burstConfetti(Math.random() * innerWidth, Math.random() * innerHeight * 0.5, 60), i * 180);
  }
}

document.getElementById('startBtn').addEventListener('click', () => {
  burstConfetti(window.innerWidth / 2, window.innerHeight / 2);
  setTimeout(() => { for (let i = 0; i < 6; i++) burstConfetti(Math.random() * innerWidth, Math.random() * innerHeight * 0.4, 50); }, 200);
  rainHearts();
  typewriter(document.getElementById('typeArea'), MAIN_LINE, 130, () => {
    document.getElementById('greetSub').style.opacity = 1;
  });
  setTimeout(() => document.getElementById('greeting').scrollIntoView({ behavior: 'smooth' }), 700);
});
