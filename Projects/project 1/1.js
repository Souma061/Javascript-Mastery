const form = document.querySelector('form')
form.addEventListener('submit',function(e){
  e.preventDefault()

  const height = parseInt(document.querySelector('#height').value)
  const weight = parseInt(document.querySelector('#weight').value)
  const results = document.querySelector('#results')

  if(isNaN(height) || height <= 0 || isNaN(weight) || weight <= 0) {
    results.innerHTML = 'Please give a valid number';
  } else {
    const bmi = weight / ((height / 100) ** 2);
    results.innerHTML = `Your BMI is ${bmi.toFixed(2)}`;
    if(bmi < 18.5) {
      results.innerHTML += ' You are underweight.';
    } if(bmi >= 18.5 && bmi < 24.9) {
      results.innerHTML += ' You have a normal weight.';
    } if(bmi >= 25) {
      results.innerHTML += ' You are overweight.';
    }
  }
})



