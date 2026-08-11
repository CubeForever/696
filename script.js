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
    h.style.setProperty('--sx', (Math.random() * 120 - 60) + 'px');
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

const WISH_CATEGORIES = [
  { key: 'warm', name: '暖心篇', emoji: '💗', color: '#FF8FB1',
    wishes: [
      '世界偶尔吵闹，但你永远是一处安静温暖的角落，生日快乐。',
      '愿你每天醒来，阳光和好心情都刚好够用。',
      '希望你的小确幸比烦恼多，笑容比星星亮。',
      '累了就停下来歇歇，你已经做得很好了。',
      '愿你的善良被人温柔以待，愿你被这个世界偏爱。',
      '生日只是一天，但你值得被宠爱的日子，应该比一年365天还要多。',
      '愿你的眼里有光，心里有糖，脚下的路都通向喜欢的地方。',
      '如果快乐是门手艺，你一定是个匠人。今天，好好犒劳自己。',
      '不用急着长大，也不用急着完美，你本来就很好。',
      '祝你今年：想吃就吃，想睡就睡，想要的都得到。'
    ] },
  { key: 'praise', name: '夸夸篇', emoji: '🌟', color: '#FFD98E',
    wishes: [
      '开朗是你的超能力，只要你在场，空气都变热闹。',
      '你的大度让所有小心眼都显得多余，和你相处真舒服。',
      '积极乐观的流烬燃，就像自带小太阳，走到哪里亮到哪里。',
      '你笑起来的样子，比生日蛋糕上的糖霜还甜。',
      '球场上的你挥拍有力，生活中的你温柔有光。',
      '你是我认识的人里，把"正能量"活成日常的第一名。',
      '你的朋友圈如果有温度，一定比海南的夏天还暖。',
      '外向又真诚的你，是人群里最亮的那颗糖。',
      '论好人缘，你排第二，没人敢排第一。',
      '今天的你比昨天更棒，明天的你会比今天更耀眼。'
    ] },
  { key: 'funny', name: '搞笑篇', emoji: '😆', color: '#A8E8C8',
    wishes: [
      '祝你生日蛋糕自由！奶油管够，热量归零。',
      '听说你爱吃蛋糕——那祝你今天吃到的每一口，都不会长胖。',
      '羽毛球打不过你没关系，但我祝你以后每颗球都过网！',
      '台球桌上祝你杆杆进洞，人生路上祝你步步高升。',
      '生日快乐！你负责开心，蛋糕负责长胖，分工明确。',
      '愿你的烦心事都像打飞的羽毛球，一去不回头。',
      '今天你最大，说什么都对，吃什么都不胖。',
      '祝你今年运气好到，连台球都替你走位。',
      '生日快乐，流烬燃！许愿的时候记得闭上眼睛，不然愿望会偷看你。',
      '你不开心的时候，就去吃块蛋糕吧，一块不够就两块。'
    ] },
  { key: 'friend', name: '友情篇', emoji: '🤝', color: '#C9A8E8',
    wishes: [
      '认识你真好，你的生日是我的专属庆祝日。',
      '愿我们的友谊，像你的笑容一样，历久弥新。',
      '你是我生活里的加分项，生日快乐，我的好朋友。',
      '谢谢你把快乐分享给我，你的生日一定要更快乐。',
      '不管多远，你的每个生日我都想准时送达祝福。',
      '愿我们一起去更多球场，吃更多蛋糕，聊更多废话。',
      '你值得这世上所有的美好，包括我这个朋友。（厚脸皮一下）',
      '生日快乐！我们的友谊保质期：永久。',
      '你是我愿意深夜畅聊、随时奔赴的朋友。',
      '下一个生日，下下个生日，我都还要祝你快乐。'
    ] }
];

const tabs = document.getElementById('tabs');
const flipCard = document.getElementById('flipCard');
const front = flipCard.querySelector('.card-front');
const back = flipCard.querySelector('.card-back');
let curCat = 0, curIdx = 0;

WISH_CATEGORIES.forEach((cat, i) => {
  const b = document.createElement('button');
  b.className = 'tab'; b.textContent = cat.emoji + ' ' + cat.name;
  b.style.setProperty('--tab', cat.color);
  b.addEventListener('click', () => switchCat(i));
  tabs.appendChild(b);
});
function renderCard(backToFront = false) {
  const cat = WISH_CATEGORIES[curCat];
  flipCard.style.setProperty('--card', cat.color);
  front.querySelector('.card-emoji').textContent = cat.emoji;
  front.querySelector('.card-tag').textContent = cat.name;
  back.querySelector('.card-text').textContent = cat.wishes[curIdx];
  back.querySelector('.card-count').textContent = (curIdx + 1) + ' / ' + cat.wishes.length;
  if (backToFront) {
    flipCard.classList.remove('flipped');
    flipCard.classList.remove('card-pop');
    void flipCard.offsetWidth;
    flipCard.classList.add('card-pop');
  }
}
function switchCat(i) { curCat = i; curIdx = 0; renderCard(true); }
function nextWish() { curIdx = (curIdx + 1) % WISH_CATEGORIES[curCat].wishes.length; renderCard(true); }
flipCard.addEventListener('click', () => flipCard.classList.toggle('flipped'));
document.getElementById('nextCard').addEventListener('click', nextWish);
renderCard();

const badminton = document.getElementById('badminton');
const rallyMsg = document.createElement('div');
rallyMsg.className = 'rally-msg';
badminton.appendChild(rallyMsg);
let rallyCount = 0, rallyTimer = null;
const RALLY_MSGS = {
  5: '5 连击！流烬燃看了都想拜师 🏸',
  10: '10 连击！你已经是扣杀王了！',
  15: '15 连击！羽毛球之神降临！'
};
badminton.addEventListener('click', () => {
  rallyCount++;
  const s = document.createElement('div'); s.className = 'shuttle'; s.textContent = '🏸';
  badminton.appendChild(s);
  setTimeout(() => s.remove(), 900);
  for (let g = 0; g < 3; g++) {
    const gh = document.createElement('div'); gh.className = 'shuttle-ghost';
    gh.style.animationDelay = (-0.11 * (g + 1)) + 's';
    badminton.appendChild(gh);
    setTimeout(() => gh.remove(), 900);
  }
  const msg = RALLY_MSGS[rallyCount];
  if (msg) { rallyMsg.textContent = msg; rallyMsg.classList.add('show', 'big'); setTimeout(() => rallyMsg.classList.remove('big'), 600); }
  else if (rallyCount > 1) { rallyMsg.textContent = '连击 ×' + rallyCount + '！'; rallyMsg.classList.add('show'); }
  badminton.classList.remove('shake'); void badminton.offsetWidth; badminton.classList.add('shake');
  clearTimeout(rallyTimer);
  rallyTimer = setTimeout(() => { rallyCount = 0; rallyMsg.classList.remove('show'); }, 1800);
});

const billiards = document.getElementById('billiards');
const BALL_COLORS = ['#FF8FB1', '#FFD98E', '#A8E8C8'];
billiards.addEventListener('click', () => {
  const cue = document.createElement('div'); cue.className = 'cue-stick';
  billiards.appendChild(cue); setTimeout(() => cue.remove(), 600);
  const balls = [{ color: '#2B2B2B', white: true }].concat(BALL_COLORS.map(c => ({ color: c })));
  balls.forEach((b, i) => {
    const el = document.createElement('div'); el.className = 'ball';
    if (b.white) el.innerHTML = '<i></i>';
    el.style.background = b.color;
    const ang = Math.random() * Math.PI * 2;
    const dist = 70 + Math.random() * 80;
    el.style.setProperty('--tx', Math.cos(ang) * dist + 'px');
    el.style.setProperty('--ty', Math.sin(ang) * dist + 'px');
    el.style.setProperty('--rd', (Math.random() * 540 - 270) + 'deg');
    el.style.animationDelay = (i * 0.05) + 's';
    billiards.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  });
  const flash = document.createElement('div'); flash.className = 'pocket-flash'; flash.textContent = '✨';
  billiards.appendChild(flash); setTimeout(() => flash.remove(), 1100);
  const toast = document.createElement('div'); toast.className = 'billiards-toast'; toast.textContent = '一杆进洞！好运已到账 🎱';
  billiards.appendChild(toast); setTimeout(() => toast.remove(), 1400);
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
}, { threshold: 0.25 });
document.querySelectorAll('.scene').forEach(s => { s.classList.add('reveal'); io.observe(s); });

document.getElementById('startBtn').addEventListener('click', () => {
  burstConfetti(window.innerWidth / 2, window.innerHeight / 2);
  setTimeout(() => { for (let i = 0; i < 6; i++) burstConfetti(Math.random() * innerWidth, Math.random() * innerHeight * 0.4, 50); }, 200);
  rainHearts();
  typewriter(document.getElementById('typeArea'), MAIN_LINE, 1000, () => {
    document.getElementById('greetSub').style.opacity = 1;
  });
  setTimeout(() => document.getElementById('greeting').scrollIntoView({ behavior: 'smooth' }), 700);
});
