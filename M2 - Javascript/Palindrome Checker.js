function palindrome(str) {

  let myStr = str.toLowerCase();    
  let myArr = myStr.split("");     // split in an array
  let myRegex = /[a-z0-9]/;
  let myIndex = 0;
  let myReversedArr = [];
  let myBool = true;
  
  let myFilteredArr = myArr.filter(item => myRegex.test(item))  //remove non alphanumerical
  
  for (let i = 0; i<myFilteredArr.length; i++) {
    myReversedArr.unshift(myFilteredArr[i]);              //reverse filtered array
  }
  
  for (let i = 0; i<myFilteredArr.length; i++) {
    if(myFilteredArr[i] != myReversedArr[i]) {
      myBool = false;
    }   //if
  }   //for i
  
  if (myBool) {
    return true;
  } else {return false;}
  
  }
  
  console.log(palindrome("eye"));