let isStatus = document.querySelector('h4')

let add = document.getElementById('add')
let check = 0;

add.addEventListener('click', function() {
  if(check === 0) {
     isStatus.innerHTML = "Friends"
  isStatus.style.color = "green"
  add.innerHTML = "Remove Friend"
  check = 1;
  } else {
    isStatus.innerHTML = "Stranger"
  isStatus.style.color = "red"
  add.innerHTML = "Add Friend"
  check = 0;
  }
})



