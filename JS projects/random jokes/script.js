//random jokes generator using an API


const jokes = document.getElementById('joke');
const button = document.getElementById('btn');
const apiSelector = document.getElementById('apiSelector');

// Define available APIs
const apis = {
  official: 'https://official-joke-api.appspot.com/random_joke',
  // Add more APIs here, e.g.:
   chuck: 'https://api.chucknorris.io/jokes/random'
};


// async function randomJoke() {
//   try {
//     const response = await fetch('https://official-joke-api.appspot.com/random_joke');
//     const data = await response.json();
//     jokes.innerHTML = `${data.setup} <br> <b>${data.punchline}</b>`;

//     localStorage.setItem("lastJoke", JSON.stringify(data));
//   }
//   catch(error) {
//     jokes.innerHTML = "Failed to fetch a joke. Please try again later.";
//     console.log(error);

//   }
//   fetch('https://official-joke-api.appspot.com/random_joke')
//     .then((Response) => {
//       return Response.json();
//     }).then((data) => {
//       jokes.innerHTML = `${data.setup} <br> <b>${data.punchline}</b>`;
//       localStorage.setItem("lastJoke", JSON.stringify(data));
//     }).catch((Error) => {
//       jokes.innerHTML = "Failed to fetch a joke. Please try again later.";
//       console.log(Error);
//     });

// }






// window.onload = () => {
//   const savedJoke = JSON.parse(localStorage.getItem("lastJoke"));
//   if (savedJoke) {
//     jokes.innerHTML = `${savedJoke.setup} <br> <b>${savedJoke.punchline}</b>`;
//   }
// };

// button.addEventListener('click', randomJoke);


function randomJoke() {
  if (!apiSelector) {
    jokes.innerHTML = "API selector not found.";
    return;
  }
  const selectedApi = apiSelector.value;
  let url = apis[selectedApi];
  if (!url) {
    jokes.innerHTML = "Please select a valid API.";
    return;
  }
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then((data) => {
      if (selectedApi === "official") {
        jokes.innerHTML = `${data.setup} <br> <b>${data.punchline}</b>`;
        localStorage.setItem("lastJoke", JSON.stringify(data));
      } else if (selectedApi === "chuck") {
        jokes.innerHTML = data.value;
        localStorage.setItem("lastJoke", JSON.stringify(data));
      } else {
        jokes.innerHTML = "Joke format not supported for this API.";
      }
    })
    .catch((error) => {
      jokes.innerHTML = "Failed to fetch a joke. Please try again later.";
      console.log("Fetch error:", error);
    });
}



window.onload = () => {
  const savedJoke = JSON.parse(localStorage.getItem("lastJoke"));
  if (savedJoke) {
    if (savedJoke.setup) {
      jokes.innerHTML = `${savedJoke.setup} <br> <b>${savedJoke.punchline}</b>`;
    } else if (savedJoke.value) {
      jokes.innerHTML = `${savedJoke.value}`;
    }
  }
};

button.addEventListener('click', randomJoke);
