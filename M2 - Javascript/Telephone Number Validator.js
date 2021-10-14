function telephoneCheck(str) {

let myBool = false;

let regex1 = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/      //555-555-5555
let regex2 = /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/   //(555)555-5555
let regex3 = /^1*( )*\([0-9]{3}\)( )*[0-9]{3}-[0-9]{4}$/  //(555) 555-5555
let regex4 = /^[0-9]{3} [0-9]{3} [0-9]{4}$/      //555 555 5555
let regex5 = /^[0-9]{10}$/                       //5555555555
let regex6 = /^1 [0-9]{3}( |-)[0-9]{3}( |-)[0-9]{4}$/    //1 555 555 5555

if (regex1.test(str)) {
  myBool = true;
}
if (regex2.test(str)) {
  myBool = true;
}
if (regex3.test(str)) {
  myBool = true;
}
if (regex4.test(str)) {
  myBool = true;
}
if (regex5.test(str)) {
  myBool = true;
}
if (regex6.test(str)) {
  myBool = true;
}
  return myBool;
}

console.log(telephoneCheck("555-555-5555"));