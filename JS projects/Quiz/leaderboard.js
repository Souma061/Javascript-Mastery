/**
 * @fileoverview Leaderboard management and local storage persistence
 * Handles score saving, loading, and display for both universal and category-specific leaderboards
 * @author Souma061
 * @version 1.0.0
 */

/**
 * Formats a timestamp for human-readable display in leaderboards
 *
 * @function
 * @param {string|number|Date} ts - Timestamp to format (ISO string, Unix timestamp, or Date object)
 * @returns {string} Formatted date string or "—" if invalid
 *
 * @example
 * formatTimestamp("2025-08-28T10:30:00.000Z");
 * // Returns: "Aug 28, 2025, 10:30 AM"
 */
function formatTimestamp(ts) {
  if (!ts) return '—';
  try {
    const d = new Date(ts);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  } catch {
    return '—';
  }
}

/**
 * Loads and displays the universal leaderboard from localStorage
 * Shows top scores across all categories and difficulties
 *
 * @function
 * @global
 */
function loadLeaderBoard() {
  const leaderBoard = JSON.parse(localStorage.getItem("leaderBoard")) || [];
  const list = document.getElementById("leaderboard");
  if (!list) return;
  list.innerHTML = "";
  leaderBoard.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    const when = formatTimestamp(item.ts);
    li.innerHTML = `<span>${item.name} - ${item.score}</span><small class="text-muted">${when}</small>`;
    list.appendChild(li);
  });
}

/**
 * Loads and displays the category-specific leaderboard
 * Shows top scores for the current quiz category only
 *
 * @function
 * @global
 * @requires currentCategoryId - Global variable with current category
 */
function loadCategoryLeaderBoard() {
  const key = `leaderBoard_${currentCategoryId}`;
  const leaderBoard = JSON.parse(localStorage.getItem(key)) || [];
  const list = document.getElementById("category-leaderboard");
  if (!list) return;
  list.innerHTML = "";
  leaderBoard.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    const when = formatTimestamp(item.ts);
    li.innerHTML = `<span>${item.name} - ${item.score}</span><small class="text-muted">${when}</small>`;
    list.appendChild(li);
  });
}

/**
 * Save Score Button Event Handler
 * Saves user's score to both universal and category-specific leaderboards
 * Prevents duplicate entries and maintains top 5 rankings
 *
 * @listens click#save-score-btn
 * @requires score - Global score variable
 * @requires currentCategoryId - Global category ID
 * @requires hasSaved - Global flag to prevent duplicate saves
 */
document.getElementById('save-score-btn').addEventListener('click', () => {
  const name = document.getElementById('username').value.trim();
  if (!name || hasSaved) return;
  const nowIso = new Date().toISOString();

  let leaderBoard = JSON.parse(localStorage.getItem('leaderBoard')) || [];
  // Deduplicate by name (case-insensitive): keep highest score
  const idx = leaderBoard.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
  if (idx !== -1) {
    if (score > (leaderBoard[idx].score ?? 0)) {
      leaderBoard[idx].score = score;
      leaderBoard[idx].ts = nowIso;
    }
  } else {
    leaderBoard.push({ name, score, ts: nowIso });
  }
  leaderBoard.sort((a, b) => {
    if ((b.score ?? 0) !== (a.score ?? 0)) return (b.score ?? 0) - (a.score ?? 0);
    const at = a.ts ? Date.parse(a.ts) : 0;
    const bt = b.ts ? Date.parse(b.ts) : 0;
    return at - bt; // earlier first when scores tie
  });
  leaderBoard = leaderBoard.slice(0, 5);
  localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard));

  loadLeaderBoard();
  // Save to category-specific leaderboard
  const key = `leaderBoard_${currentCategoryId}`;
  let catBoard = JSON.parse(localStorage.getItem(key)) || [];
  const cidx = catBoard.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
  if (cidx !== -1) {
    if (score > (catBoard[cidx].score ?? 0)) {
      catBoard[cidx].score = score;
      catBoard[cidx].ts = nowIso;
    }
  } else {
    catBoard.push({ name, score, ts: nowIso });
  }
  catBoard.sort((a, b) => {
    if ((b.score ?? 0) !== (a.score ?? 0)) return (b.score ?? 0) - (a.score ?? 0);
    const at = a.ts ? Date.parse(a.ts) : 0;
    const bt = b.ts ? Date.parse(b.ts) : 0;
    return at - bt;
  });
  catBoard = catBoard.slice(0, 5);
  localStorage.setItem(key, JSON.stringify(catBoard));
  loadCategoryLeaderBoard();
  // Lock after one save for this result
  hasSaved = true;
  document.getElementById('save-score-btn').disabled = true;
});

// Enable/disable save as user types a name
const usernameInputEl = document.getElementById('username');
if (usernameInputEl) {
  usernameInputEl.addEventListener('input', () => {
    const saveBtn = document.getElementById('save-score-btn');
    if (!saveBtn) return;
    saveBtn.disabled = usernameInputEl.value.trim().length === 0 || hasSaved;
  });
}

// Result screen clear buttons
const clearBtn = document.getElementById('clear-leaderboard-btn');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    localStorage.removeItem('leaderBoard');
    loadLeaderBoard();
  });
}

const clearCatBtn = document.getElementById('clear-category-leaderboard-btn');
if (clearCatBtn) {
  clearCatBtn.addEventListener('click', () => {
    const key = `leaderBoard_${currentCategoryId}`;
    localStorage.removeItem(key);
    loadCategoryLeaderBoard();
  });
}

/**
 * Main Menu Leaderboard Management Module
 * Handles leaderboard display and interactions from the start screen
 * Manages both universal and category-specific leaderboard views
 *
 * @namespace MainMenuLeaderboards
 * @function
 * @global
 */
(function initMainMenuLeaderboards() {
  const viewBtn = document.getElementById('view-leaderboard-btn');
  const backBtn = document.getElementById('back-to-start-btn');
  const clearMainBtn = document.getElementById('clear-leaderboard-main-btn');
  const clearCatMainBtn = document.getElementById('clear-category-leaderboard-main-btn');

  function renderList(listEl, items) {
    if (!listEl) return;
    listEl.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      const when = formatTimestamp(item.ts);
      li.innerHTML = `<span>${item.name} - ${item.score}</span><small class="text-muted">${when}</small>`;
      listEl.appendChild(li);
    });
  }

  function sortEntries(arr) {
    return [...arr].sort((a, b) => {
      if ((b.score ?? 0) !== (a.score ?? 0)) return (b.score ?? 0) - (a.score ?? 0);
      const at = a.ts ? Date.parse(a.ts) : 0;
      const bt = b.ts ? Date.parse(b.ts) : 0;
      return at - bt;
    }).slice(0, 5);
  }

  function populateMainLeaderboards() {
    // Universal
    const universal = sortEntries(JSON.parse(localStorage.getItem('leaderBoard')) || []);
    renderList(document.getElementById('leaderboard-main'), universal);

    // Category-specific based on current selection on start screen
    const catSelect = document.getElementById('category');
    const selectedOption = catSelect ? catSelect.selectedOptions[0] : null;
    const catId = selectedOption ? selectedOption.value : 'any';
    const catLabel = selectedOption ? selectedOption.textContent : '—';
    const catKey = `leaderBoard_${catId}`;
    const catEntries = sortEntries(JSON.parse(localStorage.getItem(catKey)) || []);
    const labelEl = document.getElementById('lb-main-category-label');
    if (labelEl) labelEl.textContent = catLabel || '—';
    renderList(document.getElementById('category-leaderboard-main'), catEntries);
  }

  if (viewBtn) {
    viewBtn.addEventListener('click', () => {
      document.getElementById('start-screen')?.classList.add('d-none');
      document.getElementById('leaderboard-screen')?.classList.remove('d-none');
      populateMainLeaderboards();
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      document.getElementById('leaderboard-screen')?.classList.add('d-none');
      document.getElementById('start-screen')?.classList.remove('d-none');
    });
  }

  if (clearMainBtn) {
    clearMainBtn.addEventListener('click', () => {
      localStorage.removeItem('leaderBoard');
      populateMainLeaderboards();
    });
  }

  if (clearCatMainBtn) {
    clearCatMainBtn.addEventListener('click', () => {
      const catSelect = document.getElementById('category');
      const selectedOption = catSelect ? catSelect.selectedOptions[0] : null;
      const catId = selectedOption ? selectedOption.value : 'any';
      const catKey = `leaderBoard_${catId}`;
      localStorage.removeItem(catKey);
      populateMainLeaderboards();
    });
  }
})();
