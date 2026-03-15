// Hangmango game logic v=001

// ── QWERTY keyboard layout ─────────────────────────────────────────────
const KB_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M']
];

const MAX_WRONG = 6;

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
    status: 'playing'
  };
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

  if (!state.word.includes(letter)) {
    const prevWrong = state.wrongCount;
    state.wrongCount++;
    animateBranchShake(prevWrong);
    if (state.wrongCount >= MAX_WRONG) state.status = 'lost';
  } else {
    const allRevealed = [...state.word].every(c => state.guessed.has(c) || c === ' ');
    if (allRevealed) state.status = 'won';
  }

  render();

  if (state.status === 'won' || state.status === 'lost') {
    setTimeout(() => showResultModal(state.status === 'won'), 700);
  }
}

// ── Render all game UI ─────────────────────────────────────────────────
function render() {
  renderMango();
  renderWrongDots();
  renderWord();
  updateKeyboard();
}

// ── Mango scene ────────────────────────────────────────────────────────
function renderMango() {
  const scene = document.getElementById('mango-scene');
  scene.dataset.state = state.wrongCount;
}

function animateBranchShake(prevWrong) {
  // Only shake on the first wrong guess; from guess 2+ the branch stays bent
  if (prevWrong === 0) {
    const bark = document.querySelector('.branch-bark');
    bark.classList.remove('shake');
    void bark.offsetWidth; // force reflow to restart animation
    bark.classList.add('shake');
  }
}

// ── Wrong dots ─────────────────────────────────────────────────────────
function renderWrongDots() {
  const container = document.getElementById('wrong-dots');
  container.innerHTML = '';
  for (let i = 0; i < MAX_WRONG; i++) {
    const dot = document.createElement('span');
    dot.className = i < state.wrongCount ? 'try-dot used' : 'try-dot';
    dot.textContent = i < state.wrongCount ? '❌' : '🥭';
    container.appendChild(dot);
  }
  container.setAttribute('aria-label', `${state.wrongCount} of ${MAX_WRONG} wrong guesses`);
}

// ── Word display ───────────────────────────────────────────────────────
function renderWord() {
  const display = document.getElementById('word-display');
  display.innerHTML = [...state.word].map(char => {
    if (char === ' ') return '<span class="word-space"></span>';
    const revealed = state.guessed.has(char);
    const missed   = state.status === 'lost' && !revealed;
    return `<span class="letter-tile${revealed ? ' revealed' : ''}${missed ? ' missed' : ''}">${revealed || state.status === 'lost' ? char : ''}</span>`;
  }).join('');
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

  header.className = won ? 'won-header' : 'lost-header';
  title.textContent = won ? '🥭 You got it!' : '💥 Splat!';
  wordReveal.textContent = won ? '' : `The word was: ${state.word}`;
  playAgain.textContent  = won ? 'Next word 🥭' : 'Try again 🔄';

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
    getComputedStyle(document.documentElement).getPropertyValue('--coral').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--mint').trim(),
    getComputedStyle(document.documentElement).getPropertyValue('--purple').trim(),
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

document.addEventListener('DOMContentLoaded', initSetup);
