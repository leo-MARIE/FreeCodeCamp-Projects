function sumArray(arr) {
  let accu = 0;
  for (let i = 0; i<arr.length; i++) {
    accu = accu + arr[i];
  }
  return accu;
}

function roundValue(value) {
  return Math.round(value*100)/100;
}

function checkCashRegister(price, cash, cid) {
  let cidConstArr = cid.map(item => item[1]);
  let cidArr = cid.concat();
  let myArr = [];
  let due = cash - price;
  let rest = due;
  let myObj = {
    status: "",
    change: cid,
    };


  let dueOneHundred = Math.floor(rest/100);
  if(cidArr[8][1] >= dueOneHundred*100) {
    myArr.push(["ONE HUNDRED", dueOneHundred*100])
    rest = roundValue(rest - dueOneHundred*100);
    cidArr[8][1] = cidArr[8][1] - dueOneHundred*100; 
  } else if (cidArr[8][1] < dueOneHundred*100) {
    myArr.push(["ONE HUNDRED", cidArr[8][1]]);
    rest = roundValue(rest - cidArr[8][1]);
    cidArr[8][1] = 0;
  }


  let dueTwenty = Math.floor(rest/20);
  if(cidArr[7][1] >= dueTwenty*20) {
    myArr.push(["TWENTY", dueTwenty*20])
    rest = roundValue(rest - dueTwenty*20);
    cidArr[7][1] = cidArr[7][1] - dueTwenty*20; 
  } else if (cidArr[7][1] < dueTwenty*20) {
    myArr.push(["TWENTY", cidArr[7][1]]);
    rest = roundValue(rest - cidArr[7][1]);
    cidArr[7][1] = 0;
  }


  let dueTen = Math.floor(rest/10);
  if(cidArr[6][1] >= dueTen*10) {
    myArr.push(["TEN", dueTen*10])
    rest = roundValue(rest - dueTen*10);
    cidArr[6][1] = cidArr[6][1] - dueTen*10; 
  } else if (cidArr[6][1] < dueTen*10) {
    myArr.push(["TEN", cidArr[6][1]]);
    rest = roundValue(rest - cidArr[6][1]);
    cidArr[6][1] = 0;
  }


  let dueFive = Math.floor(rest/5);
  if(cidArr[5][1] >= dueFive*5) {
    myArr.push(["FIVE", dueFive*5])
    rest = roundValue(rest - dueFive*5);
    cidArr[5][1] = cidArr[5][1] - dueFive*5; 
  } else if (cidArr[5][1] < dueFive*5) {
    myArr.push(["FIVE", cidArr[5][1]]);
    rest = roundValue(rest - cidArr[5][1]);
    cidArr[5][1] = 0;
  }

  let dueOne = Math.floor(rest/1);
  if(cidArr[4][1] >= dueOne*1) {
    myArr.push(["ONE", dueOne*1])
    rest = roundValue(rest - dueOne*1);
    cidArr[4][1] = cidArr[4][1] - dueOne*1; 
  } else if (cidArr[4][1] < dueOne*1) {
    myArr.push(["ONE", cidArr[4][1]]);
    rest = roundValue(rest - cidArr[4][1]);
    cidArr[4][1] = 0;
  }

  let dueQuarter = Math.floor(rest/0.25);
  if(cidArr[3][1] >= dueQuarter*0.25) {
    myArr.push(["QUARTER", dueQuarter*0.25])
    rest = roundValue(rest - dueQuarter*0.25);
    cidArr[3][1] = cidArr[3][1] - dueQuarter*0.25; 
  } else if (cidArr[3][1] < dueQuarter*0.25) {
    myArr.push(["QUARTER", cidArr[3][1]]);
    rest = roundValue(rest - cidArr[3][1]);
    cidArr[3][1] = 0;
  }

  let dueDime = Math.floor(rest/0.1);
  if(cidArr[2][1] >= dueDime*0.1) {
    myArr.push(["DIME", dueDime*0.1])
    rest = roundValue(rest - dueDime*0.1);
    cidArr[2][1] = cidArr[2][1] - dueDime*0.1;
  } else if (cidArr[2][1] < dueDime*0.1) {
    myArr.push(["DIME", cidArr[2][1]]);
    rest = roundValue(rest - cidArr[2][1]);
    cidArr[2][1] = 0;
  }
 
  let dueNickel = Math.floor(rest/0.05);
  if(cidArr[1][1] >= dueNickel*0.05) {
    myArr.push(["NICKEL", dueNickel*0.05])
    rest = roundValue(rest - dueNickel*0.05);
    cidArr[1][1] = cidArr[1][1] - dueNickel*0.05;
  } else if (cidArr[1][1] < dueNickel*0.05) {
    myArr.push(["NICKEL", cidArr[1][1]]);
    rest = roundValue(rest - cidArr[1][1]);
    cidArr[1][1] = 0;
  }


  let duePenny = Math.floor(rest/0.01);
  if(cidArr[0][1] >= duePenny*0.01) {
    myArr.push(["PENNY", duePenny*0.01])
    rest = roundValue(rest - duePenny*0.01);
    cidArr[0][1] = cidArr[0][1] - duePenny*0.01;
  } else if (cidArr[0][1] < duePenny*0.01) {
    myArr.push(["PENNY", cidArr[0][1]]);
    rest = roundValue(rest - cidArr[0][1]);
    cidArr[0][1] = 0;
  }

let cidArrValue = cidArr.map(item => item[1]);

myArr = myArr.filter(item => item[1] != 0);


if (rest>0) {
  myObj.status = "INSUFFICIENT_FUNDS";
  myObj.change = [];
} else if (sumArray(cidArrValue) > 0) {
  myObj.status = "OPEN";
  myObj.change = myArr;
} else {
  myObj.status = "CLOSED";
  myObj.change = cid;
for (let i = 0; i<myObj.change.length; i++) {
  myObj.change[i][1] = cidConstArr[i];
}   // for i 
}   // else

  return myObj;
}


console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));