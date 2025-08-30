// js is a sequential language but it can be asynchronous as well
// attachEvent()
// jQuery - on
// stops the event from bubbling up to the parent elements
  // e.preventDefault(); // prevents the default action of the event
  // e.stopImmediatePropagation(); // stops the event from bubbling up and prevents other listeners from
  // being called on the same element
 // type, timestamp, defaultPrevented
    // target, toElement, srcElement, currentTarget,
    // clientX, clientY, screenX, screenY
    // altkey, ctrlkey, shiftkey, keyCode

// document.getElementById('owl').onclick = function() {
//  alert("owl clicked");
// }


// document.getElementById('images').addEventListener('click', function(e){
//   // alert("owl clicked");
//   console.log("Clicked inside the ul");
// },false);

// document.getElementById('owl').addEventListener('click', function(e){
//   // alert("owl clicked");

//   console.log("owl clicked");
//   e.stopPropagation();

// },false)

// document.getElementById('google').addEventListener('click',function(e){
//         e.preventDefault();
//         e.stopPropagation()
//         console.log("google clicked");
//     }, false)


document.querySelector('#images').addEventListener('click',function(e){
  console.log(e.target.parentNode);
  let removeIt = e.target.parentNode;
  removeIt.remove();

}, false)
