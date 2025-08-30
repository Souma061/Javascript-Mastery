  const parent = document.querySelector('.parent');
  // console.log(parent);
  // console.log(parent.children);
  // console.log(parent.children[1].innerHTML);

  for (let i = 0; i < parent.children.length; i++) {
    console.log(parent.children[i].innerHTML);
  }

  parent.children[0].style.color = 'red';
  parent.children[1].style.color = 'green';
  parent.children[2].style.color = 'blue';
  parent.children[3].style.color = 'yellow';

  // console.log(parent.firstElementChild);
  // console.log(parent.lastElementChild);


  console.log("NODES: ", parent.childNodes);

