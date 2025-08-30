let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
const wordInput = document.getElementById('wordInput');
const btn = document.getElementById('searchBtn');
btn.addEventListener('click', async () => {
  const word = document.getElementById('wordInput').value.trim();
  if (!word) {
    alert('Please enter a word');
    return;
  }

  const url = `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '80cf020586mshc2eeff66146f383p1b8fa8jsncf7c64a5cbab',
      'x-rapidapi-host': 'dictionary-by-api-ninjas.p.rapidapi.com'
    }
  };
  try {
    document.getElementById('word').innerText = 'Loading...';
    document.getElementById('definition').innerText = "";

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.definition) {
      document.getElementById('word').innerText = data.word;
      document.getElementById('definition').innerText = data.definition || "No definition found.";
      addToHistory(word);
    } else {
      document.getElementById('word').innerText = "Word not found";
      document.getElementById('definition').innerText = "";
    }
  } catch (error) {
    console.log(error);
    document.getElementById('word').innerText = "Error fetching definition";

  }
  // Clear the input field after search
  wordInput.value = '';

});
function renderHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';
  searchHistory.forEach(word => {
    const li = document.createElement('li');
    li.textContent = word;
    li.addEventListener('click', () => {
      document.getElementById('wordInput').value = word;
      btn.click();
    });
    historyList.appendChild(li);
  });
}
function addToHistory(word) {
  if (!searchHistory.includes(word)) {
    searchHistory.unshift(word);
    if (searchHistory.length > 15) {
      searchHistory.pop();
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderHistory();
  }
}


wordInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    btn.click();
  }
});
document.getElementById('clearHistory').addEventListener('click', () => {
  searchHistory = [];
  localStorage.removeItem('searchHistory');
  renderHistory();
});
renderHistory();
