function addLanguage(lang) {
  const li = document.createElement('li');
  li.innerHTML = `${lang}`;
  document.querySelector('.language').appendChild(li);
}

addLanguage('python');
addLanguage('Ruby');



function addoptlang(lang) {
  const li = document.createElement('li');
  // const addText = document.createTextNode(lang);
  // li.appendChild(addText);
  li.appendChild(document.createTextNode(lang));
  document.querySelector('.language').appendChild(li);

}
addLanguage('C++');

// Edit

const editLang = document.querySelector("li:nth-child(3)");
// editLang.innerHTML = "ruby"

const newli = document.createElement('li');
newli.textContent = "Golang";
editLang.replaceWith(newli);

// Edit 2

const firstlang = document.querySelector("li:nth-child(1)");
firstlang.outerHTML = '<li>Typescript</li>';

//Remove

const removelang = document.querySelector("li:last-child");
removelang.remove();
