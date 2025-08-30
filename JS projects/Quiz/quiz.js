/**
 * @fileoverview Core quiz logic and state management
 * @author Souma061
 * @version 1.0.0
 */

// ===== GLOBAL STATE VARIABLES =====

/** @type {Array<Object>} Array of quiz questions fetched from API */
let questions = [];

/** @type {number} Current question index (0-based) */
let currentIndex = 0;

/** @type {number} Player's current score */
let score = 0;

/** @type {number|null} Timer interval ID for cleanup */
let timeInterval;

/** @type {number} Time remaining for current question in seconds */
let timeLeft = 15;

/** @type {boolean} Prevents multiple leaderboard saves per quiz session */
let hasSaved = false;

/** @type {number} Number of questions selected by user */
let selectedAmount = 20;

/**
 * @type {Object} Context information for current quiz session
 * @property {string} categoryLabel - Display name of selected category
 * @property {string} difficultyLabel - Display name of selected difficulty
 */
let metaContext = { categoryLabel: '', difficultyLabel: '' };

/**
 * @type {Array<Object>} Review data for completed questions
 * @property {string} question - The question text
 * @property {string} correct - The correct answer
 * @property {string} given - User's selected answer
 */
let reviewItems = [];

/** @type {string|null} Current category ID for leaderboard segmentation */
let currentCategoryId = null;

/**
 * @type {Object} Lifeline usage tracking (single use per game)
 * @property {boolean} fiftyFifty - Whether 50/50 lifeline has been used
 * @property {boolean} skip - Whether skip lifeline has been used
 */
let lifelines = { fiftyFifty: false, skip: false };

/** @type {boolean} Track if 50/50 was used on current question (affects scoring) */
let fiftyUsedOnQuestion = false;

// ===== EVENT HANDLERS =====

/**
 * Start Quiz Button Click Handler
 * Initializes quiz session, fetches questions from API, and transitions to quiz screen
 *
 * @async
 * @function
 * @listens click#start-btn
 */
document.getElementById('start-btn').addEventListener('click', async () => { // Start quiz
  const startBtn = document.getElementById('start-btn');
  const categorySelect = document.getElementById('category');
  const category = categorySelect.value;
  const difficulty = document.getElementById('difficulty').value;
  const amountEl = document.getElementById('amount');
  selectedAmount = Number(amountEl?.value || 20);

  // Prevent double clicks while loading
  startBtn.disabled = true;
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.classList.remove('d-none');
  try {
    questions = await fetchQuizQuestions(selectedAmount, category, difficulty);
  } catch (e) {
    console.error(e);
    alert('Failed to fetch questions. Please try again.');
    startBtn.disabled = false;
    if (overlay) overlay.classList.add('d-none');
    return;
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    alert('No questions found for the selected options. Try different settings.');
    startBtn.disabled = false;
    return;
  }

  currentIndex = 0;
  score = 0;
  hasSaved = false;
  reviewItems = [];
  lifelines = { fiftyFifty: false, skip: false };

  // Build context labels using the selected option's text so Surprise categories show nicely
  const selectedOption = categorySelect?.selectedOptions?.[0];
  const rawLabel = selectedOption?.text?.trim() || 'Any';
  metaContext.categoryLabel = rawLabel.replace(/^Surprise:\s*/i, '');
  const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : 'Any';
  metaContext.difficultyLabel = (difficulty && difficulty !== 'any') ? cap(difficulty) : 'Any';
  document.getElementById('ctx-category').textContent = metaContext.categoryLabel;
  document.getElementById('ctx-difficulty').textContent = metaContext.difficultyLabel;
  currentCategoryId = String(category || 'any');

  document.getElementById('start-screen').classList.add('d-none');
  document.getElementById('quiz-screen').classList.remove('d-none');

  loadQuestions();
  startBtn.disabled = false;
  if (overlay) overlay.classList.add('d-none');
});

// Surprise category picker (fetch a category from API that is not already in the dropdown)
const randomCatBtn = document.getElementById('random-category-btn');

/**
 * Fetches a random category from the API that isn't in the current dropdown
 * Adds it as a "Surprise" option and selects it automatically
 *
 * @async
 * @function
 * @throws {Error} When API request fails or no categories available
 */
async function pickSurpriseCategoryNotInList() {
  const sel = document.getElementById('category');
  if (!sel) return;
  if (randomCatBtn) randomCatBtn.disabled = true;
  try {
    const res = await fetch('https://opentdb.com/api_category.php');
    if (!res.ok) throw new Error(`Category fetch failed: ${res.status}`);
    const data = await res.json();
    const apiCats = Array.isArray(data?.trivia_categories) ? data.trivia_categories : [];

    const existingIds = new Set(
      Array.from(sel.options)
        .map(o => Number(o.value))
        .filter(v => Number.isFinite(v))
    );

    let candidates = apiCats.filter(c => !existingIds.has(Number(c.id)));
    if (candidates.length === 0) candidates = apiCats;
    if (candidates.length === 0) throw new Error('No categories from API');

    const picked = candidates[Math.floor(Math.random() * candidates.length)];


    const existingOpt = Array.from(sel.options).find(o => String(o.value) === String(picked.id));
    const oldSurprise = sel.querySelector('option[data-surprise="1"]');
    if (existingOpt) {
      if (oldSurprise && oldSurprise !== existingOpt) oldSurprise.remove();
      sel.value = String(picked.id);
      return;
    }


    if (oldSurprise) oldSurprise.remove();
    const opt = new Option(`Surprise: ${picked.name}`, String(picked.id));
    opt.setAttribute('data-surprise', '1');
    sel.add(opt);
    sel.value = String(picked.id);
  } catch (err) {
    console.error(err);
    // Fallback: pick any existing option
    const options = Array.from(sel.options);
    if (options.length > 0) sel.selectedIndex = Math.floor(Math.random() * options.length);
  } finally {
    if (randomCatBtn) randomCatBtn.disabled = false;
  }
}

if (randomCatBtn) {
  randomCatBtn.addEventListener('click', pickSurpriseCategoryNotInList);
}

// Cleanup: if user changes category away from Surprise, remove the temporary option
const categorySelectEl = document.getElementById('category');
if (categorySelectEl) {
  categorySelectEl.addEventListener('change', () => {
    const sel = categorySelectEl;
    const selected = sel.selectedOptions && sel.selectedOptions[0];
    const surpriseOpt = sel.querySelector('option[data-surprise="1"]');
    if (surpriseOpt && selected !== surpriseOpt) {
      surpriseOpt.remove();
    }
    // Disable Surprise Me if user picked a category from the dropdown
    if (randomCatBtn) {
      randomCatBtn.disabled = true;
    }
  });
}


/**
 * Fetches quiz questions from Open Trivia Database API
 *
 * @async
 * @function
 * @param {number} amount - Number of questions to fetch (1-50)
 * @param {string} category - Category ID or 'any' for random category
 * @param {string} difficulty - 'easy', 'medium', 'hard', or 'any'
 * @returns {Promise<Array<Object>>} Array of processed question objects
 * @throws {Error} When network request fails or API returns error
 *
 * @example
 * const questions = await fetchQuizQuestions(10, '9', 'easy');
 * // Returns: [{ question: "...", options: [...], answer: "..." }, ...]
 */
async function fetchQuizQuestions(amount, category, difficulty) {
  const params = new URLSearchParams();
  params.set('amount', String(amount));
  params.set('type', 'multiple');
  // Append category if a valid value is provided (OpenTDB expects a number > 0)
  if (category && category !== 'any' && category !== '0' && !Number.isNaN(Number(category)) && Number(category) > 0) {
    params.set('category', String(category));
  }
  // Append difficulty only if specifically chosen
  if (difficulty && difficulty !== 'any') {
    params.set('difficulty', String(difficulty));
  }

  const url = `https://opentdb.com/api.php?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Network error: ${res.status}`);
  const data = await res.json();

  // response_code: 0 = Success
  if (data.response_code !== 0 || !Array.isArray(data.results)) return [];

  return data.results.map(q => ({
    question: decodeHtml(q.question),
    options: [...q.incorrect_answers, q.correct_answer]
      .map(opt => decodeHtml(opt))
      .sort(() => Math.random() - 0.5),
    answer: decodeHtml(q.correct_answer)
  }));
}

/**
 * Decodes HTML entities in strings received from API
 * Prevents XSS and ensures proper display of special characters
 *
 * @function
 * @param {string} str - String containing HTML entities
 * @returns {string} Decoded string safe for display
 *
 * @example
 * decodeHtml("What&#039;s the capital of France?");
 * // Returns: "What's the capital of France?"
 */
function decodeHtml(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

/**
 * Loads current question into the UI and sets up interactive elements
 * Manages timer, progress display, option buttons, and lifeline states
 *
 * @function
 * @fires updateProgressUI
 * @fires updateLiveScore
 */
function loadQuestions() { // Load current question and options into the UI
  clearInterval(timeInterval);
  timeLeft = 15;
  // Reset per-question 50/50 usage flag
  fiftyUsedOnQuestion = false;
  document.getElementById('timer').innerHTML = `Time Left = ${timeLeft}s`;
  timeInterval = setInterval(updateTimer, 1000);
  // Reset timer bar to 100%
  const timerBar = document.getElementById('timer-bar');
  if (timerBar) {
    timerBar.style.width = '100%';
    timerBar.classList.remove('bg-danger', 'flash');
  }
  const q = questions[currentIndex];
  if (!q) {
    endQuiz();
    return;
  }
  updateProgressUI();
  document.getElementById('question').innerHTML = q.question;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = "list-group-item list-group-item-action";
    btn.innerText = opt;
    btn.setAttribute('type', 'button');
    btn.setAttribute('tabindex', '0');
    btn.onclick = () => selectAnswer(btn, q.answer);
    // Mark correct for reliable 50/50 (data attribute)
    if (opt === q.answer) btn.dataset.correct = '1';
    optionsDiv.appendChild(btn);

  });
  document.getElementById('next-btn').disabled = true;
  updateLiveScore();
  // Move focus to first option for keyboard users
  const firstBtn = optionsDiv.querySelector('button');
  if (firstBtn) firstBtn.focus();

  // Reset lifeline button states (disabled when used)
  const btn5050 = document.getElementById('lifeline-5050');
  const btnSkip = document.getElementById('lifeline-skip');
  if (btn5050) btn5050.disabled = lifelines.fiftyFifty;
  if (btnSkip) btnSkip.disabled = lifelines.skip;
}

/**
 * Handles user's answer selection and provides immediate feedback
 * Updates score, shows correct/incorrect styling, and enables next button
 *
 * @function
 * @param {HTMLButtonElement} button - The clicked answer button
 * @param {string} correctAnswer - The correct answer text for comparison
 * @fires showScoreFloat - If answer is correct
 * @fires updateLiveScore
 */
function selectAnswer(button, correctAnswer) {
  const options = document.querySelectorAll('#options button');
  options.forEach(btn => btn.disabled = true);

  if (button.innerText === correctAnswer) {
    button.classList.add('list-group-item-success');
    score += fiftyUsedOnQuestion ? 5 : 10;
    // Instant visual feedback for correct answers
    if (typeof showScoreFloat === 'function') {
      showScoreFloat(button, fiftyUsedOnQuestion ? '+5' : '+10');
    }
  } else {
    button.classList.add("list-group-item-danger");
    options.forEach(btn => {
      if (btn.innerText === correctAnswer) {
        btn.classList.add('list-group-item-success');
      }
    });

  }
  // Push review item
  const currentQ = questions[currentIndex];
  reviewItems.push({ question: currentQ.question, correct: currentQ.answer, given: button.innerText });
  clearInterval(timeInterval);
  document.getElementById('next-btn').disabled = false;
  updateLiveScore();
  // Focus Next button for quick progression via keyboard
  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) nextBtn.focus();
}

document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestions();
  } else {
    endQuiz();
  }
});

// Lifeline: 50/50 — disable two wrong options randomly (single use per game)
const lifeline5050Btn = document.getElementById('lifeline-5050');
if (lifeline5050Btn) {
  lifeline5050Btn.addEventListener('click', () => {
    if (lifelines.fiftyFifty) return;
    const q = questions[currentIndex];
    if (!q) return;
    const optionsEl = document.getElementById('options');
    const optionButtons = Array.from(optionsEl.querySelectorAll('button'));
    const wrongs = optionButtons.filter(b => b.dataset.correct !== '1' && !b.disabled);
    if (wrongs.length <= 1) return;
    // Remove two random wrongs
    for (let i = 0; i < 2 && wrongs.length > 0; i++) {
      const idx = Math.floor(Math.random() * wrongs.length);
      const btn = wrongs.splice(idx, 1)[0];
      btn.disabled = true;
      btn.classList.add('option-hidden');
      btn.setAttribute('aria-hidden', 'true');
    }
    // Mark that 50/50 was used for the current question to adjust scoring
    fiftyUsedOnQuestion = true;
    lifelines.fiftyFifty = true;
    lifeline5050Btn.disabled = true;
  });
}

// Lifeline: Skip Question — move to next question without penalty (single use per game)
const lifelineSkipBtn = document.getElementById('lifeline-skip');
if (lifelineSkipBtn) {
  lifelineSkipBtn.addEventListener('click', () => {
    if (lifelines.skip) return;
    lifelines.skip = true;
    lifelineSkipBtn.disabled = true;
    // Log review as skipped
    const currentQ = questions[currentIndex];
    if (currentQ) {
      reviewItems.push({ question: currentQ.question, correct: currentQ.answer, given: '(skipped)' });
    }
    clearInterval(timeInterval);
    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestions();
    } else {
      endQuiz();
    }
  });
}

/**
 * Updates the countdown timer and handles time expiry
 * Automatically advances to next question when time runs out
 *
 * @function
 * @fires updateTimerBar - Updates visual timer progress
 */
function updateTimer() {
  timeLeft--;
  document.getElementById('timer').innerHTML = `Time Left = ${timeLeft}s`;
  if (timeLeft <= 0) {
    clearInterval(timeInterval);

    const options = document.querySelectorAll('#options button');
    options.forEach(btn => btn.disabled = true);
    const q = questions[currentIndex];
    options.forEach(btn => {
      if (q && btn.innerText === q.answer) {
        btn.classList.add('list-group-item-success');
      }
    });
    // Add to review as unanswered
    const currentQ = questions[currentIndex];
    reviewItems.push({ question: currentQ.question, correct: currentQ.answer, given: '(no answer)' });
    // Briefly show the correct answer, then auto-advance
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.disabled = true; // avoid double navigation
    setTimeout(() => {
      currentIndex++;
      if (currentIndex < questions.length) {
        loadQuestions();
      } else {
        endQuiz();
      }
    }, 900);
  }
}

/**
 * Ends the quiz session and transitions to results screen
 * Prepares leaderboards, enables score saving, and shows review
 *
 * @function
 * @fires loadLeaderBoard
 * @fires loadCategoryLeaderBoard
 * @fires renderReview
 */
function endQuiz() {
  clearInterval(timeInterval);
  document.getElementById('quiz-screen').classList.add('d-none');
  document.getElementById('result-screen').classList.remove('d-none');
  document.getElementById('score').innerHTML = score;
  // Prep save controls
  hasSaved = false;
  const nameInput = document.getElementById('username');
  const saveBtn = document.getElementById('save-score-btn');
  if (nameInput) nameInput.value = '';
  if (saveBtn) saveBtn.disabled = true; // will be enabled when user types a name
  loadLeaderBoard();
  loadCategoryLeaderBoard();
  const lbCatLabel = document.getElementById('lb-category-label');
  if (lbCatLabel) lbCatLabel.textContent = metaContext.categoryLabel;
  renderReview();
  // Move focus to name input to encourage saving
  if (nameInput) nameInput.focus();
}

document.getElementById('restart-btn').addEventListener('click', () => {
  clearInterval(timeInterval);
  document.getElementById('options').innerHTML = '';
  document.getElementById('timer').innerHTML = '';
  document.getElementById('result-screen').classList.add('d-none');
  document.getElementById('start-screen').classList.remove('d-none');
  hasSaved = false;
  const saveBtn = document.getElementById('save-score-btn');
  const nameInput = document.getElementById('username');
  if (nameInput) nameInput.value = '';
  if (saveBtn) saveBtn.disabled = true;
});

// Keyboard shortcuts: 1-4 to select options, Enter for Next
document.addEventListener('keydown', (e) => {
  const quizVisible = !document.getElementById('quiz-screen').classList.contains('d-none');
  if (!quizVisible) return;
  const optionButtons = Array.from(document.querySelectorAll('#options button:not(.option-hidden)'));
  // Number keys 1-4
  if (/^[1-4]$/.test(e.key)) {
    const index = Number(e.key) - 1;
    if (optionButtons[index] && !optionButtons[index].disabled) {
      optionButtons[index].click();
    }
  }
  // Enter for Next
  if (e.key === 'Enter') {
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn && !nextBtn.disabled) {
      nextBtn.click();
    }
  }
});
