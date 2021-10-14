function convertToRoman(num) {

let thousands = Math.floor(num / 1000);
let rest = num - thousands*1000;
let hundreds = Math.floor(rest / 100);
rest = rest - hundreds*100;
let tens = Math.floor(rest / 10);
rest = rest - tens*10;
let ones = rest;
let myControlArr = [thousands, hundreds, tens, ones];
let myArr = [];
let myStr = "";

for (let i = 0; i<thousands; i++) {       //thousands
  myArr.push("M");
}
if(hundreds >=0 && hundreds <=3) {        //hundreds
      for (let i = 0; i<hundreds; i++) {
      myArr.push("C");
    };  
  }
else if (hundreds == 4) {
    myArr.push("CD");
}
else if (hundreds >=5 && hundreds <=8) {
    myArr.push("D");
    for (let i = 0; i<hundreds-5; i++) {
      myArr.push("C");
  };
}
else {
    myArr.push("CM");
}
if(tens >=0 && tens <=3) {        //tens
      for (let i = 0; i<tens; i++) {
      myArr.push("X");
    };  
  }
else if (tens == 4) {
    myArr.push("XL");
}
else if (tens >=5 && tens <=8) {
    myArr.push("L");
    for (let i = 0; i<tens-5; i++) {
      myArr.push("X");
  };
}
else {
    myArr.push("XC");
}
if(ones >=0 && ones <=3) {        //ones
      for (let i = 0; i<ones; i++) {
      myArr.push("I");
    };  
  }
else if (ones == 4) {
    myArr.push("IV");
}
else if (ones >=5 && ones <=8) {
    myArr.push("V");
    for (let i = 0; i<ones-5; i++) {
      myArr.push("I");
  };
}
else {
    myArr.push("IX");
}

myStr = myArr.join("");

return myStr;
}

console.log(convertToRoman(36));