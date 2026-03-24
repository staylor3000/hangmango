// Hangmango Turkish game logic v=001

// ── Turkish case conversion ──────────────────────────────────────────────
// Standard .toUpperCase() converts 'i' → 'I' (dotless), but Turkish needs
// 'i' (dotted) → 'İ' (dotted uppercase). By replacing 'i' before calling
// .toUpperCase(), all other Turkish chars (ş→Ş, ğ→Ğ, etc.) are handled
// correctly by the JS engine, and 'ı' (dotless) → 'I' also works correctly.
function toUppercaseTr(str) {
  return str.replace(/i/g, 'İ').toUpperCase();
}

// ── Accent normalisation (used for custom word validation only) ──────────
function normaliseTr(str) {
  return str
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .replace(/Ğ/g, 'ğ')
    .replace(/Ş/g, 'ş')
    .replace(/Ü/g, 'ü')
    .replace(/Ö/g, 'ö')
    .replace(/Ç/g, 'ç')
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// ── Turkish keyboard layout (29 letters — no Q, W or X) ─────────────────
// I  = dotless uppercase (U+0049) — matches 'ı' in words
// İ  = dotted uppercase  (U+0130) — matches 'i' in words
const KB_ROWS = [
  ['E','R','T','Y','U','I','O','P','Ğ','Ü'],
  ['A','S','D','F','G','H','J','K','L','Ş','İ'],
  ['Z','C','V','B','N','M','Ö','Ç']
];

const MAX_WRONG = 8;

// ── Stopwatch timer ─────────────────────────────────────────────────────
let timerInterval = null;
let timerSeconds  = 0;
let timerStarted  = false;

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds  = 0;
  timerStarted  = false;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const el = document.getElementById('timer-display');
  if (!el) return;
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  el.textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

// ── Game state ─────────────────────────────────────────────────────────
let state = {
  word: '',
  category: '',
  difficulty: '',
  guessed: new Set(),
  wrongCount: 0,
  status: 'idle' // idle | playing | won | lost
};

// Setup selections
let selectedCategory  = 'hayvanlar';
let selectedDifficulty = 'medium';

// ── Start game ─────────────────────────────────────────────────────────
function startGame(word, category, difficulty) {
  state = {
    word: toUppercaseTr(word),
    category,
    difficulty,
    guessed: new Set(),
    wrongCount: 0,
    status: 'playing',
    winPanelIdx:  Math.floor(Math.random() * 3) + 1,
    losePanelIdx: Math.floor(Math.random() * 3) + 1
  };
  startTimer();
  buildKeyboard();
  render();
}

// ── Guess a letter ─────────────────────────────────────────────────────
function guessLetter(letter) {
  letter = toUppercaseTr(letter);
  if (state.status !== 'playing') return;
  if (state.guessed.has(letter)) return;
  // Allow A-Z plus Turkish-specific characters
  if (!/^[A-ZÇĞİIÖŞÜ]$/.test(letter)) return;

  state.guessed.add(letter);

  // Start stopwatch on first guess
  if (!timerStarted) {
    timerStarted = true;
    timerInterval = setInterval(() => { timerSeconds++; updateTimerDisplay(); }, 1000);
  }

  if (!state.word.includes(letter)) {
    const prevWrong = state.wrongCount;
    state.wrongCount++;
    animateWrongGuess(prevWrong);
    if (state.wrongCount >= MAX_WRONG) state.status = 'lost';
  } else {
    const allRevealed = [...state.word].every(c => c === ' ' || state.guessed.has(c));
    if (allRevealed) {
      state.status = 'won';
      animatePanelChange('win', true);
    }
  }

  render();

  if (state.status === 'won' || state.status === 'lost') {
    clearInterval(timerInterval);
    timerInterval = null;
    setTimeout(() => showResultModal(state.status === 'won'), 700);
  }
}

// ── Render all game UI ─────────────────────────────────────────────────
function render() {
  renderPanel();
  renderLives();
  renderWord();
  updateKeyboard();
}

// ── Comic panel system ─────────────────────────────────────────────────
let panelTransitioning = false;

function renderPanel() {
  if (panelTransitioning) return;
  const img = document.getElementById('panel-img');
  const container = document.getElementById('panel-container');
  const isWin = state.status === 'won';
  img.src = isWin
    ? `../assets/panel-win-${state.winPanelIdx}.png`
    : `../assets/panel-${state.wrongCount}.png`;
  img.classList.toggle('panel-win-glow', isWin);
  container.classList.remove('panel-shake');
}

function animatePanelChange(panelKey, isWin) {
  const flash = document.getElementById('panel-flash');
  const img = document.getElementById('panel-img');
  const container = document.getElementById('panel-container');
  const newSrc = isWin
    ? `../assets/panel-win-${state.winPanelIdx}.png`
    : `../assets/panel-${panelKey}.png`;

  if (panelTransitioning) {
    img.src = newSrc;
    img.classList.toggle('panel-win-glow', isWin);
    return;
  }

  panelTransitioning = true;
  flash.classList.add('flashing');

  setTimeout(() => {
    img.src = newSrc;
    img.classList.toggle('panel-win-glow', isWin);
  }, 75);

  setTimeout(() => {
    flash.classList.remove('flashing');
    panelTransitioning = false;
    if (!isWin) {
      void container.offsetWidth;
      container.classList.add('panel-shake');
      container.addEventListener('animationend', () => container.classList.remove('panel-shake'), { once: true });
    }
  }, 150);
}

let justLostIndex = -1;

function animateWrongGuess(prevWrong) {
  justLostIndex = prevWrong;
  animatePanelChange(state.wrongCount, false);
}

// ── Lives strip ────────────────────────────────────────────────────────
function renderLives() {
  const slotsEl = document.getElementById('life-slots');
  const label   = document.getElementById('lives-label');
  const remaining = MAX_WRONG - state.wrongCount;

  slotsEl.innerHTML = '';
  for (let i = 0; i < MAX_WRONG; i++) {
    const slot = document.createElement('div');
    const isUsed     = i < state.wrongCount;
    const isJustLost = i === justLostIndex;
    slot.className = 'life-slot' + (isUsed ? ' used' : '') + (isJustLost ? ' just-lost' : '');
    slot.textContent = isUsed ? '✕' : '🥭';
    slotsEl.appendChild(slot);
  }
  justLostIndex = -1;
  slotsEl.setAttribute('aria-label', `${state.wrongCount} / ${MAX_WRONG} yanlış tahmin`);

  label.className = '';
  if (remaining <= 0) {
    label.textContent = '';
  } else if (remaining === 1) {
    label.textContent = 'Son hakkın!';
    label.classList.add('warn-danger');
  } else if (remaining === 2) {
    label.textContent = `${remaining} kaldı`;
    label.classList.add('warn-high');
  } else if (remaining <= 3) {
    label.textContent = `${remaining} kaldı`;
    label.classList.add('warn-mid');
  } else {
    label.textContent = `${remaining} kaldı`;
  }
}

// ── Word display ───────────────────────────────────────────────────────
function buildTile(char) {
  // state.word and state.guessed both use toUppercaseTr() — direct comparison works
  const revealed = state.guessed.has(char);
  const missed   = state.status === 'lost' && !revealed;
  return `<span class="letter-tile${revealed ? ' revealed' : ''}${missed ? ' missed' : ''}">${revealed || state.status === 'lost' ? char : ''}</span>`;
}

function renderWord() {
  const display = document.getElementById('word-display');
  const isMultiWord = state.word.includes(' ');
  display.classList.toggle('multi-word', isMultiWord);

  if (isMultiWord) {
    display.innerHTML = state.word.split(' ')
      .map(word => `<span class="word-group">${[...word].map(buildTile).join('')}</span>`)
      .join('');
  } else {
    display.innerHTML = [...state.word].map(buildTile).join('');
  }
}

// ── Keyboard ───────────────────────────────────────────────────────────
function buildKeyboard() {
  const kb = document.getElementById('keyboard');
  kb.innerHTML = KB_ROWS.map(row => {
    const keys = row.map(l => `<button class="key" data-letter="${l}">${l}</button>`).join('');
    return `<div class="kb-row">${keys}</div>`;
  }).join('');
}

function updateKeyboard() {
  document.querySelectorAll('.key[data-letter]').forEach(btn => {
    const l = btn.dataset.letter;
    const isPlaying = state.status === 'playing';
    btn.disabled = !isPlaying || state.guessed.has(l);
    btn.className = 'key';
    if (state.guessed.has(l)) {
      btn.classList.add(state.word.includes(l) ? 'key-correct' : 'key-wrong');
    }
  });
}

// ── Physical keyboard ──────────────────────────────────────────────────
// Handles both Turkish physical keyboard input and Latin keyboard input.
// toUppercaseTr() converts 'i' → 'İ' so physical 'i' key matches dotted İ in words.
// 'ı' (dotless) → 'I' via standard toUpperCase, matching dotless I in words.
document.addEventListener('keydown', e => {
  if (e.key.length === 1 && /[a-zA-ZçğıiöşüÇĞİIÖŞÜ]/.test(e.key) && !e.metaKey && !e.ctrlKey) {
    guessLetter(e.key);
  }
});

// ── On-screen keyboard clicks ──────────────────────────────────────────
document.addEventListener('click', e => {
  if (e.target.matches('.key[data-letter]')) {
    guessLetter(e.target.dataset.letter);
  }
});

// ── Screen switching ───────────────────────────────────────────────────
function showScreen(id) {
  ['setup-screen','pass-screen','game-screen'].forEach(s => {
    document.getElementById(s).classList.toggle('hidden', s !== id);
  });
}

// ── Category hint ──────────────────────────────────────────────────────
function setCategoryHint(category, difficulty) {
  const hint = document.getElementById('category-hint');
  if (!category || category === 'custom') {
    hint.textContent = '✏️ Özel kelime';
    return;
  }
  const meta = CATEGORY_META_TR[category];
  const diffLabels = { easy: 'Kolay', medium: 'Orta', hard: 'Zor' };
  const diffLabel = diffLabels[difficulty] || difficulty;
  hint.textContent = `${meta.icon} ${meta.label} · ${diffLabel}`;
}

// ── Result modal ───────────────────────────────────────────────────────
function showResultModal(won) {
  const modal      = document.getElementById('result-modal');
  const header     = document.getElementById('modal-header');
  const title      = document.getElementById('modal-title');
  const wordReveal = document.getElementById('modal-word-reveal');
  const playAgain  = document.getElementById('modal-play-again');
  const panelEl    = document.getElementById('modal-panel');
  const panelImg   = document.getElementById('modal-panel-img');
  const statsEl    = document.getElementById('modal-stats');
  const shareBtn   = document.getElementById('modal-share');

  header.className = 'hidden';
  title.textContent = '';
  wordReveal.textContent = '';
  playAgain.textContent  = won ? 'Sonraki kelime 🥭' : 'Tekrar dene 🔄';

  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  const timeStr   = `${m}:${s.toString().padStart(2, '0')}`;
  const wrongLabel = 'hatalı tahmin';

  panelEl.classList.remove('hidden');
  panelImg.src = won
    ? `../assets/panel-win-${state.winPanelIdx}.png`
    : `../assets/panel-lose-${state.losePanelIdx}.png`;

  statsEl.classList.remove('hidden');
  if (won) {
    statsEl.innerHTML = `
      <div>🥭 <strong>${state.word}</strong></div>
      <div>${state.wrongCount} ${wrongLabel} &nbsp;·&nbsp; ⏱ ${timeStr}</div>
    `;
  } else {
    statsEl.innerHTML = `
      <div>💥 Kelime <strong>${state.word}</strong> idi</div>
      <div>${state.wrongCount} ${wrongLabel} &nbsp;·&nbsp; ⏱ ${timeStr}</div>
    `;
  }

  shareBtn.classList.remove('hidden');
  shareBtn.textContent = 'Sonucu paylaş 🥭';
  shareBtn.onclick = () => {
    const text = won
      ? `🥭 hangmango\n"${state.word}" kelimesini ${state.wrongCount} ${wrongLabel} ile ${timeStr} içinde tahmin ettim!\nhangmango.net/tr/ adresinde ücretsiz oyna`
      : `💥 hangmango\n"${state.word}" kelimesini tahmin edemedim — ${state.wrongCount} ${wrongLabel}, ${timeStr}!\nSen daha iyi yapabilir misin? hangmango.net/tr/`;
    if (navigator.share) {
      navigator.share({ text, url: 'https://hangmango.net/tr/' }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        shareBtn.textContent = 'Kopyalandı! ✓';
        setTimeout(() => { shareBtn.textContent = 'Sonucu paylaş 🥭'; }, 2000);
      }).catch(() => {});
    }
  };

  modal.classList.remove('hidden');
  if (won) launchConfetti();
}

// ── Play Again / Change Category ───────────────────────────────────────
function playAgainSameSettings() {
  document.getElementById('result-modal').classList.add('hidden');
  const word = state.category === 'custom'
    ? null
    : getWordTR(state.category, state.difficulty);

  if (!word) {
    showScreen('setup-screen');
    return;
  }
  showScreen('game-screen');
  setCategoryHint(state.category, state.difficulty);
  startGame(word, state.category, state.difficulty);
}

function goToSetup() {
  document.getElementById('result-modal').classList.add('hidden');
  showScreen('setup-screen');
}

// ── Confetti ───────────────────────────────────────────────────────────
function launchConfetti() {
  const colors = [
    getComputedStyle(document.documentElement).getPropertyValue('--mango').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--mint').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--red').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--yellow').trim(),
  ];

  for (let i = 0; i < 64; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const size = 6 + Math.random() * 8;
    el.style.cssText = [
      `left: ${Math.random() * 100}vw`,
      `background: ${colors[Math.floor(Math.random() * colors.length)]}`,
      `animation-delay: ${Math.random() * 0.6}s`,
      `animation-duration: ${0.9 + Math.random() * 0.8}s`,
      `width: ${size}px`,
      `height: ${size}px`,
      `border-radius: ${Math.random() > 0.5 ? '50%' : '2px'}`,
    ].join(';');
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// ── Setup screen init ──────────────────────────────────────────────────
function initSetup() {
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.category;
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedDifficulty = btn.dataset.difficulty;
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  document.getElementById('play-random-btn').addEventListener('click', () => {
    const word = getWordTR(selectedCategory, selectedDifficulty);
    showScreen('game-screen');
    setCategoryHint(selectedCategory, selectedDifficulty);
    startGame(word, selectedCategory, selectedDifficulty);
  });

  document.getElementById('play-custom-btn').addEventListener('click', () => {
    const raw = document.getElementById('custom-word-input').value.trim();
    const errEl = document.getElementById('custom-word-error');
    if (raw.length < 2) {
      errEl.textContent = 'Lütfen en az 2 harf girin!';
      return;
    }
    if (!/^[a-zA-ZçğıiöşüÇĞİIÖŞÜ\s]+$/.test(raw)) {
      errEl.textContent = 'Lütfen sadece harf girin!';
      return;
    }
    errEl.textContent = '';
    pendingCustomWord = raw;
    document.getElementById('custom-word-input').value = '';
    showScreen('pass-screen');
  });

  document.getElementById('ready-btn').addEventListener('click', () => {
    showScreen('game-screen');
    setCategoryHint('custom', 'custom');
    startGame(pendingCustomWord, 'custom', 'custom');
    pendingCustomWord = '';
  });

  document.getElementById('menu-btn').addEventListener('click', goToSetup);
  document.getElementById('modal-play-again').addEventListener('click', playAgainSameSettings);
  document.getElementById('modal-new-game').addEventListener('click', goToSetup);
  document.querySelector('.modal-backdrop').addEventListener('click', goToSetup);

  document.getElementById('custom-word-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('play-custom-btn').click();
  });
}

let pendingCustomWord = '';

// ── Preload all panel images ───────────────────────────────────────────
function preloadPanels() {
  const load = src => { const img = new Image(); img.src = src; };
  for (let n = 1; n <= 3; n++) {
    load(`../assets/panel-win-${n}.png`);
    load(`../assets/panel-lose-${n}.png`);
  }
  for (let n = 0; n <= MAX_WRONG; n++) load(`../assets/panel-${n}.png`);
}

document.addEventListener('DOMContentLoaded', () => { initSetup(); preloadPanels(); });
