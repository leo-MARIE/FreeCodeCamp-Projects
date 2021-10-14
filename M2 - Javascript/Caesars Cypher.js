function coding(num) {                    // coding function that takes only the letters
    if (num>=65 && num <= 77) {
      return num + 13;
    } else if (num>=78 && num <= 90) {
      return num - 13;
    } else {return num;}
    }
    
function rot13(str) {
    
    let inputArr = str.split("");                                 
    let utfArr = inputArr.map (letter => letter.charCodeAt());
    let utfCodedArr = utfArr.map (number => coding(number) );
    let outputArr = utfCodedArr.map (number => String.fromCharCode(number));
    
    return outputArr.join("");
    }
    
    console.log(rot13("SERR PBQR PNZC"));


