/**
 * @fileoverview UI helpers and visual updates for Quiz Game
 * Handles progress indicators, animations, theme switching, and visual feedback
 * @author Souma061
 * @version 1.0.0
 */

/**
 * Updates the progress bar and question counter in the quiz interface
 * Shows current question number out of total questions
 *
 * @function
 * @global
 */
function updateProgressUI() {
  const progressText = document.getElementById('progress');
  const bar = document.getElementById('progress-bar');
  const total = questions.length || 1;
  const current = currentIndex + 1;
  if (progressText) progressText.textContent = `Question ${current} of ${total}`;
  if (bar) {
    const pct = Math.min(100, Math.max(0, (current / total) * 100));
    bar.style.width = `${pct}%`;
    bar.setAttribute('aria-valuenow', String(Math.round(pct)));
  }
}

/**
 * Updates the live score badge displayed during quiz
 * Provides real-time feedback of current score to user
 *
 * @function
 * @global
 */
function updateLiveScore() {
  const badge = document.getElementById('live-score');
  if (badge) badge.textContent = `Score: ${score}`;
}

/**
 * Animates the timer progress bar and adds visual urgency in final seconds
 * Changes color to red and adds flashing animation when time is low
 *
 * @function
 * @global
 */
function updateTimerBar() {
  const timerBar = document.getElementById('timer-bar');
  if (!timerBar) return;
  const pct = Math.max(0, Math.min(100, (timeLeft / 15) * 100));
  timerBar.style.width = `${pct}%`;
  if (timeLeft <= 3) {
    timerBar.classList.add('bg-danger', 'flash');
  } else {
    timerBar.classList.remove('bg-danger', 'flash');
  }
}

// Hook into updateTimer to also update the bar
const __origUpdateTimer = typeof updateTimer === 'function' ? updateTimer : null;
if (__origUpdateTimer) {
  updateTimer = function wrappedUpdateTimer() {
    __origUpdateTimer();
    updateTimerBar();
  };
}

/**
 * Renders the complete quiz review showing all questions and answers
 * Displays user's answers vs correct answers with color-coded badges
 *
 * @function
 * @global
 * @requires reviewItems - Global array of question review data
 */
function renderReview() {
  const reviewList = document.getElementById('review');
  if (!reviewList) return;
  reviewList.innerHTML = '';
  reviewItems.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = 'list-group-item';
    const isCorrect = item.given === item.correct;
    row.innerHTML = `
      <div class="small text-muted mb-1">Q${i + 1}</div>
      <div class="fw-semibold mb-1">${item.question}</div>
      <div>
        <span class="badge ${isCorrect ? 'bg-success' : 'bg-danger'} me-2">Your answer: ${item.given}</span>
        <span class="badge bg-secondary">Correct: ${item.correct}</span>
      </div>
    `;
    reviewList.appendChild(row);
  });
}

/**
 * Creates animated floating score feedback near the target element
 * Shows point value gained and animates upward with fade out
 *
 * @function
 * @param {HTMLElement} targetEl - Element to position the animation near
 * @param {string} [text='+10'] - Text to display (e.g., '+10', '+5')
 *
 * @example
 * showScoreFloat(buttonElement, '+10');
 * // Creates floating "+10" animation above the button
 */
function showScoreFloat(targetEl, text = '+10') {
  if (!targetEl) return;
  const rect = targetEl.getBoundingClientRect();
  const el = document.createElement('div');
  el.className = 'score-float';
  el.textContent = text;
  // Position centered near the top of the button
  const top = rect.top + window.scrollY - 6; // start a bit above
  const left = rect.left + window.scrollX + rect.width / 2; // center x
  el.style.top = `${top}px`;
  el.style.left = `${left}px`;
  // Compute travel to top edge of the main container
  const container = document.querySelector('.container');
  const cRect = container ? container.getBoundingClientRect() : { top: 0 };
  // Travel distance in pixels up (negative value for translateY)
  const dy = (top - (cRect.top + window.scrollY) - 12) * -1; // small margin
  el.style.setProperty('--float-dx', '-50%');
  el.style.setProperty('--float-dy', `${dy}px`);
  // Duration proportional to distance, clamped between 800ms and 1600ms
  const duration = Math.max(800, Math.min(1600, Math.abs(dy) * 3));
  el.style.setProperty('--float-duration', `${Math.round(duration)}ms`);
  document.body.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

/**
 * Theme Toggle Module
 * Manages light/dark theme switching with persistence and accessibility
 * Uses Bootstrap 5.3 data-bs-theme attribute and localStorage for persistence
 *
 * @namespace ThemeToggle
 * @function
 * @global
 */
(function initTheme() {
  const root = document.documentElement;
  const body = document.body;
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  function applyTheme(mode) {
    // Bootstrap 5.3 native theming via data-bs-theme
    root.setAttribute('data-bs-theme', mode);
    // Optional body class for custom CSS hooks
    body.classList.toggle('theme-dark', mode === 'dark');
    // Button label
    btn.textContent = mode === 'dark' ? 'Light' : 'Dark';
    btn.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
  }

  const saved = localStorage.getItem('quiz_theme');
  const initial = saved === 'dark' || saved === 'light' ? saved : 'light';
  applyTheme(initial);

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('quiz_theme', next);
  });
})();
