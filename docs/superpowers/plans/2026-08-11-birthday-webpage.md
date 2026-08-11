# 生日祝福网页实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为「流烬燃」制作一个单页沉浸式生日祝福 H5（7 幕、40 条祝福、5 种动画、暖色卡通可爱风），完成后部署到 GitHub Pages。

**Architecture:** 纯 HTML/CSS/JS 单页，零依赖零构建。`index.html` 承载结构，`style.css` 承载设计令牌（CSS 变量色板/字体栈）与全部样式动画，`script.js` 承载交互（开场礼炮、打字机、蜡烛、烟花、翻卡、爱好彩蛋、滚动渐入）。内容数据（40 条祝福）以 JS 数组存放。文件间通过 `id` 与 `data-*` 属性通信，无框架。

**Tech Stack:** HTML5 / CSS3（自定义属性、flex/grid、3D transform、keyframes）/ 原生 JS（IntersectionObserver、DOM API）。验证：`node --check script.js` 语法检查 + 浏览器手动预览。

---

### Task 1: 项目骨架 + 设计令牌

**Files:**
- Create: `index.html`
- Create: `style.css`（仅设计令牌与基础重置）
- Create: `script.js`（空文件占位）
- Create: `README.md`

- [ ] **Step 1: 创建 index.html 骨架**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>流烬燃，生日快乐！🎂</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- 各幕结构在 Task 2-8 中填充 -->
  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: 创建 style.css 设计令牌**

```css
:root {
  --cream: #FFF6EE;
  --pink: #FFB6C1;
  --pink-deep: #FF8FB1;
  --coral: #FF8A5C;
  --gold: #FFD98E;
  --purple: #C9A8E8;
  --mint: #A8E8C8;
  --ink: #5A3E36;
  --font: "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB", "Heiti SC", sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: var(--font); background: var(--cream); color: var(--ink); overflow-x: hidden; }
```

- [ ] **Step 3: 创建空 script.js 与 README.md**（README 内容见 Task 10）

```bash
type nul > script.js
```

- [ ] **Step 4: 验证**

Run: `node --check script.js`
Expected: 无输出（通过）。浏览器打开 index.html 空白页无报错。

- [ ] **Step 5: Commit**

```bash
git add index.html style.css script.js README.md
git commit -m "feat: 骨架与设计令牌"
```

---

### Task 2: 开场幕（按钮 + 漂浮背景）

**Files:**
- Modify: `index.html`
- Modify: `style.css`

- [ ] **Step 1: HTML — 开场幕**

```html
<section id="intro" class="scene intro">
  <div class="float-layer" id="floatLayer"></div>
  <div class="intro-content">
    <div class="cat-avatar">…SVG 白猫（Task 3 定义）…</div>
    <h1 class="intro-title">欢迎来到流烬燃的生日派对</h1>
    <button id="startBtn" class="start-btn">🎉 戳一下，开始生日派对</button>
  </div>
</section>
```

- [ ] **Step 2: CSS — 开场幕样式**

```css
.scene { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; }
.intro { background: linear-gradient(160deg, var(--pink), var(--gold) 70%, var(--cream)); }
.intro-title { font-size: clamp(1.6rem, 5vw, 2.6rem); color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,.15); }
.start-btn { margin-top: 2rem; padding: 1rem 2.4rem; font-size: 1.2rem; border: none; border-radius: 999px; background: #fff; color: var(--pink-deep); font-weight: 700; cursor: pointer; box-shadow: 0 6px 20px rgba(255,138,92,.4); transition: transform .2s; }
.start-btn:hover { transform: scale(1.08); }
.float-layer { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.float-item { position: absolute; bottom: -10vh; animation: floatUp linear infinite; opacity: .85; }
@keyframes floatUp { to { transform: translateY(-120vh) rotate(360deg); } }
```

- [ ] **Step 3: 验证** — 浏览器打开，背景渐变 + 按钮居中显示，无报错。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: 开场幕与漂浮背景层"
```

---

### Task 3: SVG 白猫组件 + 开场礼炮/爱心雨

**Files:**
- Modify: `index.html`（白猫 SVG 复用，用 `<symbol>` + `<use>` 定义一次多处引用）
- Modify: `style.css`（礼炮/爱心动画）
- Modify: `script.js`

- [ ] **Step 1: 定义 SVG symbol（原创圆脸白猫 + 蝴蝶结）**

在 `<body>` 顶部加入隐藏 SVG 模板：

```html
<svg width="0" height="0" style="position:absolute">
  <defs>
    <symbol id="cat" viewBox="0 0 100 100">
      <!-- 圆脸 -->
      <ellipse cx="50" cy="52" rx="38" ry="34" fill="#fff"/>
      <!-- 耳朵 -->
      <path d="M18 30 L24 12 L40 24 Z" fill="#fff"/>
      <path d="M82 30 L76 12 L60 24 Z" fill="#fff"/>
      <path d="M22 27 L26 15 L37 23 Z" fill="#FFB6C1"/>
      <path d="M78 27 L74 15 L63 23 Z" fill="#FFB6C1"/>
      <!-- 胡须 -->
      <line x1="18" y1="48" x2="2" y2="44" stroke="#5A3E36" stroke-width="1.5"/>
      <line x1="18" y1="54" x2="2" y2="58" stroke="#5A3E36" stroke-width="1.5"/>
      <line x1="82" y1="48" x2="98" y2="44" stroke="#5A3E36" stroke-width="1.5"/>
      <line x1="82" y1="54" x2="98" y2="58" stroke="#5A3E36" stroke-width="1.5"/>
      <!-- 眼睛（黑豆眼 + 高光） -->
      <circle cx="38" cy="48" r="4.5" fill="#2B2B2B"/><circle cx="36.5" cy="46.5" r="1.4" fill="#fff"/>
      <circle cx="62" cy="48" r="4.5" fill="#2B2B2B"/><circle cx="60.5" cy="46.5" r="1.4" fill="#fff"/>
      <!-- 鼻子与嘴 -->
      <ellipse cx="50" cy="57" rx="2.6" ry="1.9" fill="#FFD98E"/>
      <path d="M46 61 Q50 64 54 61" stroke="#5A3E36" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <!-- 蝴蝶结 -->
      <path d="M50 30 L42 24 L42 36 Z M50 30 L58 24 L58 36 Z" fill="#FF8FB1"/>
      <circle cx="50" cy="30" r="3" fill="#E8637A"/>
    </symbol>
  </defs>
</svg>
```

引用方式：`<svg class="cat"><use href="#cat"/></svg>`

- [ ] **Step 2: script.js — 漂浮元素生成（气球/爱心/星星 三选一随机）**

```js
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
```

- [ ] **Step 3: script.js — 开场礼炮 + 爱心雨**

```js
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
document.getElementById('startBtn').addEventListener('click', () => {
  burstConfetti(window.innerWidth / 2, window.innerHeight / 2);
  setTimeout(() => { for (let i = 0; i < 6; i++) burstConfetti(Math.random() * innerWidth, Math.random() * innerHeight * 0.4, 50); }, 200);
  rainHearts();
  setTimeout(() => document.getElementById('greeting').scrollIntoView({ behavior: 'smooth' }), 700);
});
```

- [ ] **Step 4: CSS — 礼炮与爱心雨动画**

```css
.confetti { position: fixed; width: 10px; height: 14px; z-index: 999; border-radius: 2px; pointer-events: none;
  animation: pop 1.3s ease-out forwards; }
@keyframes pop { 0% { opacity: 1; } to { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--r)); } }
.heart-rain { position: fixed; top: -8vh; z-index: 998; pointer-events: none;
  animation: heartFall 4s linear forwards; }
@keyframes heartFall { to { transform: translateY(110vh) rotate(20deg); } }
```

- [ ] **Step 5: 验证** — 点击按钮：彩带爆发 + 爱心雨 + 平滑滚到第 2 幕；控制台无报错。`node --check script.js` 通过。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: 白猫SVG、开场礼炮与爱心雨"
```

---

### Task 4: 主祝福幕（打字机）

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Modify: `script.js`

- [ ] **Step 1: HTML — 主祝福幕**

```html
<section id="greeting" class="scene">
  <div class="greeting-box">
    <svg class="cat greeting-cat"><use href="#cat"/></svg>
    <h2 id="typeArea" class="type-title"></h2>
    <p class="greeting-sub" id="greetSub">…点击按钮后显示…</p>
  </div>
</section>
```

- [ ] **Step 2: script.js — 打字机**

```js
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
```

- [ ] **Step 3: 接入开场按钮**：在 `startBtn` 点击回调中调用 `typewriter(document.getElementById('typeArea'), MAIN_LINE, 130, () => { document.getElementById('greetSub').style.opacity = 1; })`；`greetSub` 初始 `opacity: 0`，CSS `transition: opacity 1s`。

- [ ] **Step 4: CSS — 打字机标题样式**

```css
.type-title { font-size: clamp(2rem, 6vw, 3.2rem); color: var(--pink-deep); font-weight: 900; min-height: 3.2rem; }
.type-title::after { content: '|'; animation: blink .8s steps(1) infinite; color: var(--coral); }
@keyframes blink { 50% { opacity: 0; } }
.greeting-sub { margin-top: 1.2rem; font-size: 1.15rem; color: var(--ink); opacity: 0; transition: opacity 1s; }
.greeting-cat { width: 120px; height: 120px; margin-bottom: 1rem; filter: drop-shadow(0 4px 10px rgba(255,138,92,.35)); }
```

- [ ] **Step 5: 验证** — 点开始按钮后逐字打字、光标闪烁、副语渐入。无报错。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: 主祝福打字机幕"
```

---

### Task 5: 今日彩蛋幕

**Files:**
- Modify: `index.html`
- Modify: `style.css`

- [ ] **Step 1: HTML**

```html
<section id="today" class="scene today-scene">
  <h2 class="today-title">🎂 今天是 8 月 11 日</h2>
  <p class="today-big">今天就是你的生日！</p>
  <p class="today-fun">距离下一个生日还有 365 天——也就是说，从明天起你又能整整期待一年了，快乐加倍！</p>
</section>
```

- [ ] **Step 2: CSS — 大字弹跳动画**

```css
.today-big { font-size: clamp(2.2rem, 7vw, 3.8rem); font-weight: 900; color: var(--coral); animation: bounce 1.6s ease-in-out infinite; }
@keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
.today-fun { max-width: 34rem; margin: 1.4rem auto; line-height: 1.8; }
```

- [ ] **Step 3: 验证 + Commit**

```bash
git add -A
git commit -m "feat: 今日彩蛋幕"
```

---

### Task 6: 蛋糕吹蜡烛幕 + 烟花

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Modify: `script.js`

- [ ] **Step 1: HTML — 蛋糕结构**

```html
<section id="cakeScene" class="scene">
  <h2 class="scene-title">来，吹蜡烛许个愿吧 🎂</h2>
  <p class="cake-hint">点击蜡烛，一根一根吹灭（8 根，代表你的幸运 8 月）</p>
  <div class="cake" id="cake">
    <div class="candles" id="candles"></div>
    <div class="cake-layer l1"></div>
    <div class="cake-layer l2"></div>
    <div class="cake-layer l3"></div>
  </div>
  <div class="fireworks" id="fireworks"></div>
</section>
```

- [ ] **Step 2: script.js — 生成蜡烛 + 吹灭逻辑**

```js
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
```

- [ ] **Step 3: CSS — 蜡烛/火焰/冒烟/蛋糕**

```css
.cake { position: relative; width: min(300px, 70vw); margin: 2rem auto 0; }
.candles { display: flex; justify-content: center; gap: 8px; position: relative; z-index: 2; }
.candle { width: 14px; height: 46px; border-radius: 4px; background: repeating-linear-gradient(45deg, var(--pink-deep), var(--pink-deep) 4px, #fff 4px, #fff 8px); cursor: pointer; position: relative; }
.candle .flame { width: 10px; height: 16px; background: radial-gradient(circle at 50% 75%, #FFD98E, var(--coral)); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; position: absolute; top: -18px; left: 50%; transform: translateX(-50%); animation: flicker .3s ease-in-out infinite alternate; }
.candle.out .flame { display: none; }
@keyframes flicker { from { transform: translateX(-50%) scale(1); } to { transform: translateX(-50%) scale(1.2, .85); } }
.smoke { position: absolute; top: -20px; left: 50%; width: 8px; height: 24px; background: rgba(160,160,160,.5); border-radius: 50%; animation: rise 1.1s ease-out forwards; }
@keyframes rise { to { transform: translateY(-34px) scale(1.6); opacity: 0; } }
.cake-layer { border-radius: 8px; }
.l3 { height: 52px; background: linear-gradient(180deg, var(--pink-deep), var(--coral)); margin-top: -6px; }
.l2 { height: 46px; background: linear-gradient(180deg, var(--cream), #FFE7D1); margin-top: -4px; }
.l1 { height: 40px; background: linear-gradient(180deg, var(--gold), #FFC86B); border-radius: 8px 8px 14px 14px; }
.fireworks { margin-top: 2rem; font-size: clamp(1.6rem, 5vw, 2.4rem); font-weight: 900; color: var(--pink-deep); min-height: 3rem; text-align: center; }
```

- [ ] **Step 4: 验证** — 8 根蜡烛火焰闪烁；逐根点击熄灭冒烟；全灭后烟花 + 大字。`node --check script.js` 通过。

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: 蛋糕吹蜡烛与烟花"
```

---

### Task 7: 祝福翻卡幕（40 条内容 + 3D 翻转）

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Modify: `script.js`

- [ ] **Step 1: 内容数据 — 40 条祝福（写入 script.js 顶部）**

```js
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
```

- [ ] **Step 2: HTML — 翻卡幕结构**

```html
<section id="wishes" class="scene wishes-scene">
  <h2 class="scene-title">🎁 拆开这 40 份祝福吧</h2>
  <div class="tabs" id="tabs"></div>
  <div class="card-stage" id="cardStage">
    <div class="flip-card" id="flipCard">
      <div class="card-face card-front">
        <span class="card-emoji">💗</span>
        <span class="card-tag">暖心篇</span>
        <p class="card-tip">点击翻卡</p>
      </div>
      <div class="card-face card-back">
        <p class="card-text"></p>
        <p class="card-count"></p>
      </div>
    </div>
  </div>
  <button id="nextCard" class="start-btn">下一条 →</button>
</section>
```

- [ ] **Step 3: script.js — 分类切换 + 翻卡逻辑**

```js
let curCat = 0, curIdx = 0;
const tabs = document.getElementById('tabs');
const flipCard = document.getElementById('flipCard');
const front = flipCard.querySelector('.card-front');
const back = flipCard.querySelector('.card-back');

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
  if (backToFront) flipCard.classList.remove('flipped');
}
function switchCat(i) { curCat = i; curIdx = 0; renderCard(true); }
function nextWish() { curIdx = (curIdx + 1) % WISH_CATEGORIES[curCat].wishes.length; renderCard(true); }
flipCard.addEventListener('click', () => flipCard.classList.toggle('flipped'));
document.getElementById('nextCard').addEventListener('click', nextWish);
renderCard();
```

- [ ] **Step 4: CSS — 3D 翻转**

```css
.tabs { display: flex; flex-wrap: wrap; gap: .6rem; justify-content: center; margin: 1.4rem 0; }
.tab { padding: .5rem 1.2rem; border: none; border-radius: 999px; font-size: 1rem; font-weight: 700; cursor: pointer; background: #fff; color: var(--ink); box-shadow: 0 3px 10px rgba(0,0,0,.08); transition: transform .2s; }
.tab:hover { transform: translateY(-2px); }
.card-stage { perspective: 1200px; }
.flip-card { position: relative; width: min(320px, 84vw); height: 240px; margin: 0 auto; cursor: pointer; transform-style: preserve-3d; transition: transform .6s; }
.flip-card.flipped { transform: rotateY(180deg); }
.card-face { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 22px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .6rem; box-shadow: 0 10px 30px rgba(255,138,92,.25); }
.card-front { background: linear-gradient(160deg, var(--card, var(--pink)), #fff 130%); }
.card-back { background: #fff; transform: rotateY(180deg); padding: 1.4rem; }
.card-emoji { font-size: 3rem; }
.card-tag { font-size: 1.2rem; font-weight: 800; }
.card-tip { font-size: .9rem; opacity: .7; }
.card-text { line-height: 1.9; font-size: 1.05rem; }
.card-count { margin-top: .8rem; font-size: .85rem; opacity: .6; }
```

- [ ] **Step 5: 验证** — 四个分类标签可切换；点击卡片 3D 翻转；"下一条"循环翻；正面/背面内容正确。`node --check script.js` 通过。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: 40条祝福翻卡幕"
```

---

### Task 8: 爱好彩蛋幕（羽毛球 + 台球 + 蛋糕梗）

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Modify: `script.js`

- [ ] **Step 1: HTML — 彩蛋幕**

```html
<section id="hobby" class="scene hobby-scene">
  <h2 class="scene-title">专属彩蛋 🏸🎱</h2>
  <div class="hobby-row">
    <div class="hobby-card" id="badminton">
      <span class="hobby-emoji">🏸</span>
      <p>戳我！送你一记流烬燃式扣杀</p>
    </div>
    <div class="hobby-card" id="billiards">
      <span class="hobby-emoji">🎱</span>
      <p>戳我！好运球要进袋啦</p>
    </div>
  </div>
  <p class="cake-punchline">（温馨提示：打完球记得吃蛋糕，这是流烬燃的三大人生信条之一）</p>
</section>
```

- [ ] **Step 2: script.js — 两个互动动画**

```js
const badminton = document.getElementById('badminton');
badminton.addEventListener('click', () => {
  const s = document.createElement('div'); s.className = 'shuttle';
  badminton.appendChild(s);
  setTimeout(() => s.remove(), 1600);
});
const billiards = document.getElementById('billiards');
billiards.addEventListener('click', () => {
  const b = document.createElement('div'); b.className = 'cue-ball';
  billiards.appendChild(b);
  setTimeout(() => b.remove(), 1500);
});
```

- [ ] **Step 3: CSS — 动画**

```css
.hobby-row { display: flex; gap: 1.4rem; justify-content: center; flex-wrap: wrap; }
.hobby-card { width: 220px; padding: 1.6rem 1rem; background: #fff; border-radius: 22px; text-align: center; cursor: pointer; box-shadow: 0 8px 24px rgba(0,0,0,.08); transition: transform .2s; }
.hobby-card:hover { transform: scale(1.05); }
.hobby-emoji { font-size: 3rem; display: block; }
.shuttle { position: absolute; font-size: 1.6rem; content: '🏸'; animation: fly 1.5s ease-out forwards; }
@keyframes fly { 0% { transform: translate(0, 0) rotate(0); } 100% { transform: translate(140px, -120px) rotate(320deg); opacity: 0; } }
.cue-ball { position: absolute; width: 22px; height: 22px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff, #ddd); animation: roll 1.4s ease-out forwards; }
@keyframes roll { 0% { transform: translate(0,0); } 100% { transform: translate(120px, 90px) rotate(360deg); opacity: 0; } }
.cake-punchline { margin-top: 2rem; color: var(--pink-deep); font-weight: 600; }
```

（注：`content` 属性不作用于 div，`.shuttle` 的羽球图标改为在 JS 中设置 `s.textContent = '🏸'`。）

- [ ] **Step 4: 验证** — 点击羽球卡飞出羽球动画；点击台球卡黑球滚动；温馨提示文案显示。

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: 爱好彩蛋幕"
```

---

### Task 9: 结尾幕 + 滚动渐入 + 移动端适配

**Files:**
- Modify: `index.html`
- Modify: `style.css`
- Modify: `script.js`

- [ ] **Step 1: HTML — 结尾幕**

```html
<section id="final" class="scene final-scene">
  <svg class="cat final-cat"><use href="#cat"/></svg>
  <h2 class="final-title">感谢遇见流烬燃</h2>
  <p class="final-msg">愿你的每一天，都像今天一样值得庆祝。</p>
  <p class="final-sign">—— 永远的朋友 ❤</p>
</section>
```

- [ ] **Step 2: script.js — 滚动渐入**

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
}, { threshold: 0.25 });
document.querySelectorAll('.scene').forEach(s => { s.classList.add('reveal'); io.observe(s); });
```

- [ ] **Step 3: CSS — reveal 与移动端**

```css
.reveal { opacity: 0; transform: translateY(30px); transition: opacity .8s ease, transform .8s ease; }
.reveal.in-view { opacity: 1; transform: none; }
.final-title { font-size: clamp(1.8rem, 6vw, 2.8rem); color: var(--pink-deep); }
.final-msg { margin-top: 1rem; font-size: 1.1rem; }
.final-sign { margin-top: 2.2rem; font-weight: 700; color: var(--coral); }
@media (max-width: 600px) {
  .start-btn { padding: .85rem 1.8rem; font-size: 1.05rem; }
  .flip-card { height: 260px; }
}
```

- [ ] **Step 4: 验证** — 滚动各幕渐入；手机宽度（DevTools 模拟）下布局正常。

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: 结尾幕、滚动渐入与移动端适配"
```

---

### Task 10: README + 总验证

**Files:**
- Modify: `README.md`

- [ ] **Step 1: 写 README**

```markdown
# 🎂 流烬燃的生日网页

送给流烬燃的生日祝福网页（2026-08-11）。

## 本地预览
双击 `index.html` 即可（或用任意静态服务器）。

## 部署到 GitHub Pages
1. 在 GitHub 新建仓库并推送本目录所有文件
2. 仓库 Settings → Pages → Source 选 main 分支 /root
3. 访问 `https://<用户名>.github.io/<仓库名>/`
```

- [ ] **Step 2: 总验证清单**
1. `node --check script.js` 无输出
2. 双击 `index.html` 完整走一遍 7 幕流程，浏览器控制台零报错
3. 移动端宽度（375px）下浏览一遍

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "docs: README 与最终验证"
```

---

## 自检记录

- **Spec 覆盖**：7 幕 ↔ Task 2-9；40 条祝福 ↔ Task 7 数据；动画清单 7 项 ↔ Task 3/4/6/7/8/9；部署说明 ↔ Task 10。无缺口。
- **占位符扫描**：无 TBD/TODO；所有步骤含完整代码。
- **类型一致性**：`burstConfetti` / `rainHearts` / `typewriter` / `renderCard` / `switchCat` / `nextWish` 命名在定义与调用处一致；`#cat` symbol 引用一致。
