function randomOtp(num) {
  let otp = "";
  for(let i = 0;i < num;i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

console.log(randomOtp(5));



