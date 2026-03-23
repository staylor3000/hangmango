// Hangmango game logic v=001

// ── QWERTY keyboard layout ─────────────────────────────────────────────
const KB_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M']
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
let selectedCategory = 'animals';
let selectedDifficulty = 'medium';

// ── Start game ─────────────────────────────────────────────────────────
function startGame(word, category, difficulty) {
  state = {
    word: word.toUpperCase(),
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
  letter = letter.toUpperCase();
  if (state.status !== 'playing') return;
  if (state.guessed.has(letter)) return;
  if (!/^[A-Z]$/.test(letter)) return;

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
    const allRevealed = [...state.word].every(c => state.guessed.has(c) || c === ' ');
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
  img.src = isWin ? `assets/panel-win-${state.winPanelIdx}.png` : `assets/panel-${state.wrongCount}.png`;
  img.classList.toggle('panel-win-glow', isWin);
  container.classList.remove('panel-shake');
}

function animatePanelChange(panelKey, isWin) {
  const flash = document.getElementById('panel-flash');
  const img = document.getElementById('panel-img');
  const container = document.getElementById('panel-container');
  const newSrc = isWin ? `assets/panel-win-${state.winPanelIdx}.png` : `assets/panel-${panelKey}.png`;

  if (panelTransitioning) {
    // Already mid-flash — just update the target image directly
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

// tracks which slot index just got lost (set before render, cleared after)
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
  justLostIndex = -1; // consumed
  slotsEl.setAttribute('aria-label', `${state.wrongCount} of ${MAX_WRONG} wrong guesses`);

  label.className = '';
  if (remaining <= 0) {
    label.textContent = '';
  } else if (remaining === 1) {
    label.textContent = 'Last chance!';
    label.classList.add('warn-danger');
  } else if (remaining === 2) {
    label.textContent = `${remaining} left`;
    label.classList.add('warn-high');
  } else if (remaining <= 3) {
    label.textContent = `${remaining} left`;
    label.classList.add('warn-mid');
  } else {
    label.textContent = `${remaining} left`;
  }
}

// ── Word display ───────────────────────────────────────────────────────
function buildTile(char) {
  const revealed = state.guessed.has(char);
  const missed   = state.status === 'lost' && !revealed;
  return `<span class="letter-tile${revealed ? ' revealed' : ''}${missed ? ' missed' : ''}">${revealed || state.status === 'lost' ? char : ''}</span>`;
}

function renderWord() {
  const display = document.getElementById('word-display');
  const isMultiWord = state.word.includes(' ');
  display.classList.toggle('multi-word', isMultiWord);

  if (isMultiWord) {
    // Wrap each word in a nowrap group so tiles never break mid-word
    display.innerHTML = state.word.split(' ')
      .map(word => `<span class="word-group">${[...word].map(buildTile).join('')}</span>`)
      .join('');
  } else {
    // Single word: tiles fill the line and shrink to fit
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
document.addEventListener('keydown', e => {
  if (e.key.length === 1 && /[a-zA-Z]/.test(e.key) && !e.metaKey && !e.ctrlKey) {
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
    hint.textContent = '✏️ Custom word';
    return;
  }
  const meta = CATEGORY_META[category];
  const diffLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  hint.textContent = `${meta.icon} ${meta.label} · ${diffLabel}`;
}

// ── Result modal ───────────────────────────────────────────────────────
function showResultModal(won) {
  const modal       = document.getElementById('result-modal');
  const header      = document.getElementById('modal-header');
  const title       = document.getElementById('modal-title');
  const wordReveal  = document.getElementById('modal-word-reveal');
  const playAgain   = document.getElementById('modal-play-again');
  const panelEl     = document.getElementById('modal-panel');
  const panelImg    = document.getElementById('modal-panel-img');
  const statsEl     = document.getElementById('modal-stats');
  const shareBtn    = document.getElementById('modal-share');

  header.className = 'hidden';
  title.textContent = '';
  wordReveal.textContent = '';
  playAgain.textContent  = won ? 'Next word 🥭' : 'Try again 🔄';

  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  const timeStr = `${m}:${s.toString().padStart(2, '0')}`;
  const wrongLabel = state.wrongCount === 1 ? 'wrong guess' : 'wrong guesses';

  // Panel image
  panelEl.classList.remove('hidden');
  panelImg.src = won ? `assets/panel-win-${state.winPanelIdx}.png` : `assets/panel-lose-${state.losePanelIdx}.png`;

  // Stats
  statsEl.classList.remove('hidden');
  if (won) {
    statsEl.innerHTML = `
      <div>🥭 <strong>${state.word}</strong></div>
      <div>${state.wrongCount} ${wrongLabel} &nbsp;·&nbsp; ⏱ ${timeStr}</div>
    `;
  } else {
    statsEl.innerHTML = `
      <div>💥 The word was <strong>${state.word}</strong></div>
      <div>${state.wrongCount} ${wrongLabel} &nbsp;·&nbsp; ⏱ ${timeStr}</div>
    `;
  }

  // Share button
  shareBtn.classList.remove('hidden');
  shareBtn.textContent = 'Share result 🥭';
  shareBtn.onclick = () => {
    const text = won
      ? `🥭 hangmango\nI guessed "${state.word}" with ${state.wrongCount} ${wrongLabel} in ${timeStr}!\nPlay free at hangmango.net`
      : `💥 hangmango\nI couldn't guess "${state.word}" — ${state.wrongCount} ${wrongLabel} in ${timeStr}!\nCan you do better? hangmango.net`;
    if (navigator.share) {
      navigator.share({ text, url: 'https://hangmango.net' }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        shareBtn.textContent = 'Copied! ✓';
        setTimeout(() => { shareBtn.textContent = 'Share result 🥭'; }, 2000);
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
    : getWord(state.category, state.difficulty);

  if (!word) {
    // Custom word: go back to setup
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
  // Category buttons
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedCategory = btn.dataset.category;
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Difficulty buttons
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedDifficulty = btn.dataset.difficulty;
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Play random word
  document.getElementById('play-random-btn').addEventListener('click', () => {
    const word = getWord(selectedCategory, selectedDifficulty);
    showScreen('game-screen');
    setCategoryHint(selectedCategory, selectedDifficulty);
    startGame(word, selectedCategory, selectedDifficulty);
  });

  // Custom word — show pass screen first
  document.getElementById('play-custom-btn').addEventListener('click', () => {
    const raw = document.getElementById('custom-word-input').value.trim();
    const errEl = document.getElementById('custom-word-error');
    if (raw.length < 2) {
      errEl.textContent = 'Enter at least 2 letters!';
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(raw)) {
      errEl.textContent = 'Letters only please!';
      return;
    }
    errEl.textContent = '';
    // Stash the word, show pass screen
    pendingCustomWord = raw;
    document.getElementById('custom-word-input').value = '';
    showScreen('pass-screen');
  });

  // Ready button on pass screen
  document.getElementById('ready-btn').addEventListener('click', () => {
    showScreen('game-screen');
    setCategoryHint('custom', 'custom');
    startGame(pendingCustomWord, 'custom', 'custom');
    pendingCustomWord = '';
  });

  // Menu button on game screen
  document.getElementById('menu-btn').addEventListener('click', goToSetup);

  // Modal buttons
  document.getElementById('modal-play-again').addEventListener('click', playAgainSameSettings);
  document.getElementById('modal-new-game').addEventListener('click', goToSetup);

  // Close modal on backdrop click
  document.querySelector('.modal-backdrop').addEventListener('click', goToSetup);

  // Allow pressing Enter in custom word input
  document.getElementById('custom-word-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('play-custom-btn').click();
  });
}

let pendingCustomWord = '';

// ── Preload all panel images so swaps are instant on mobile ────────────
function preloadPanels() {
  const load = src => { const img = new Image(); img.src = src; };
  for (let n = 0; n <= MAX_WRONG; n++) load(`assets/panel-${n}.png`);
  for (let n = 1; n <= 3; n++) {
    load(`assets/panel-win-${n}.png`);
    load(`assets/panel-lose-${n}.png`);
  }
}

document.addEventListener('DOMContentLoaded', () => { initSetup(); preloadPanels(); });
