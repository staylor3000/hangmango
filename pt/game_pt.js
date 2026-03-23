// Hangmango Brazilian Portuguese game logic v=001

// ── Accent normalisation ────────────────────────────────────────────────
// Players press unaccented keys (A-Z). This strips accents so pressing
// "A" matches "Ã", "Â", "Á", "C" matches "Ç", etc.
function normalise(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

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
let selectedCategory = 'animais';
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

  // Normalised match: "A" matches "Ã", "Â", "Á", "C" matches "Ç", etc.
  const normLetter = normalise(letter);
  const wordHasLetter = [...state.word].some(c => normalise(c) === normLetter);

  if (!wordHasLetter) {
    const prevWrong = state.wrongCount;
    state.wrongCount++;
    animateWrongGuess(prevWrong);
    if (state.wrongCount >= MAX_WRONG) state.status = 'lost';
  } else {
    const allRevealed = [...state.word].every(c =>
      c === ' ' || state.guessed.has(normalise(c).toUpperCase())
    );
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
  slotsEl.setAttribute('aria-label', `${state.wrongCount} de ${MAX_WRONG} tentativas erradas`);

  label.className = '';
  if (remaining <= 0) {
    label.textContent = '';
  } else if (remaining === 1) {
    label.textContent = 'Última chance!';
    label.classList.add('warn-danger');
  } else if (remaining === 2) {
    label.textContent = `${remaining} restantes`;
    label.classList.add('warn-high');
  } else if (remaining <= 3) {
    label.textContent = `${remaining} restantes`;
    label.classList.add('warn-mid');
  } else {
    label.textContent = `${remaining} restantes`;
  }
}

// ── Word display ───────────────────────────────────────────────────────
function buildTile(char) {
  // Check if the normalised version of this character has been guessed
  const normChar = normalise(char).toUpperCase();
  const revealed = state.guessed.has(normChar);
  const missed   = state.status === 'lost' && !revealed;
  // Display the original accented character
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
      const normL = normalise(l);
      const isCorrect = [...state.word].some(c => normalise(c) === normL);
      btn.classList.add(isCorrect ? 'key-correct' : 'key-wrong');
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
    hint.textContent = '✏️ Palavra personalizada';
    return;
  }
  const meta = CATEGORY_META_PT[category];
  const diffLabels = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' };
  const diffLabel = diffLabels[difficulty] || difficulty;
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
  playAgain.textContent  = won ? 'Próximo 🥭' : 'Tentar novamente 🔄';

  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  const timeStr = `${m}:${s.toString().padStart(2, '0')}`;
  const wrongLabel = state.wrongCount === 1 ? 'erro' : 'erros';

  // Panel image
  panelEl.classList.remove('hidden');
  panelImg.src = won
    ? `../assets/panel-win-${state.winPanelIdx}.png`
    : `../assets/panel-lose-${state.losePanelIdx}.png`;

  // Stats
  statsEl.classList.remove('hidden');
  if (won) {
    statsEl.innerHTML = `
      <div>🥭 <strong>${state.word}</strong></div>
      <div>${state.wrongCount} ${wrongLabel} &nbsp;·&nbsp; ⏱ ${timeStr}</div>
    `;
  } else {
    statsEl.innerHTML = `
      <div>💥 A palavra era <strong>${state.word}</strong></div>
      <div>${state.wrongCount} ${wrongLabel} &nbsp;·&nbsp; ⏱ ${timeStr}</div>
    `;
  }

  // Share button
  shareBtn.classList.remove('hidden');
  shareBtn.textContent = 'Compartilhar resultado 🥭';
  shareBtn.onclick = () => {
    const text = won
      ? `🥭 hangmango\nAdivinhei "${state.word}" com ${state.wrongCount} ${wrongLabel} em ${timeStr}!\nJogue grátis em hangmango.net/pt/`
      : `💥 hangmango\nNão consegui adivinhar "${state.word}" — ${state.wrongCount} ${wrongLabel} em ${timeStr}!\nVocê consegue? hangmango.net/pt/`;
    if (navigator.share) {
      navigator.share({ text, url: 'https://hangmango.net/pt/' }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        shareBtn.textContent = 'Copiado! ✓';
        setTimeout(() => { shareBtn.textContent = 'Compartilhar resultado 🥭'; }, 2000);
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
    : getWordPT(state.category, state.difficulty);

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
    const word = getWordPT(selectedCategory, selectedDifficulty);
    showScreen('game-screen');
    setCategoryHint(selectedCategory, selectedDifficulty);
    startGame(word, selectedCategory, selectedDifficulty);
  });

  // Custom word — show pass screen first
  document.getElementById('play-custom-btn').addEventListener('click', () => {
    const raw = document.getElementById('custom-word-input').value.trim();
    const errEl = document.getElementById('custom-word-error');
    if (raw.length < 2) {
      errEl.textContent = 'Digite pelo menos 2 letras!';
      return;
    }
    if (!/^[a-zA-ZáéíóúâêôãõàçÁÉÍÓÚÂÊÔÃÕÀÇ\s]+$/.test(raw)) {
      errEl.textContent = 'Apenas letras, por favor!';
      return;
    }
    errEl.textContent = '';
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
  // Win/lose panels first — shown in modal at game end, prioritise caching
  for (let n = 1; n <= 3; n++) {
    load(`../assets/panel-win-${n}.png`);
    load(`../assets/panel-lose-${n}.png`);
  }
  // Gameplay panels (shown progressively, more time to load)
  for (let n = 0; n <= MAX_WRONG; n++) load(`../assets/panel-${n}.png`);
}

document.addEventListener('DOMContentLoaded', () => { initSetup(); preloadPanels(); });
