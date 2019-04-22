"use strict";

function checkValid(){ 
  let found1= 0;
  let found2= 0;
  let found3= 0;
  let jSave1=0;
  let jSave2=0;
  let jSave3=0;
  validSudoku=true;

  for(let i=1; i<10; i++){ //all numbers
    for(let l=1; l<10; l++){ // this is vert/hori line or box depending what is checked.
      found1=0;
      found2=0;
      found3=0;
      jSave1=0;
      jSave2=0;
      jSave3=0;
      for(let j=0; j<numObjects.length; j++){  // loops all spots
        if(numObjects[j].number==i && numObjects[j].horiL==l){ // these next 3 if statements adds counter for each number found in line/box
          found1++;                                          // when found it sets it false and remembers jSave so if there was only 1 it can reset it back
          numObjects[j].invalidH=true;
          jSave1=j;
        }
        if(numObjects[j].number==i && numObjects[j].vertL==l){
          found2++;
          numObjects[j].invalidV=true;
          jSave2=j;
        }
        if(numObjects[j].number==i && numObjects[j].boxB==l){
          found3++;
          numObjects[j].invalidB=true;
          jSave3=j;
        }
      }
          
      if(found1==1){
        numObjects[jSave1].invalidH=false;
      }else if(found1>1){
        validSudoku=false;
      }

      if(found2==1){
        numObjects[jSave2].invalidV=false;
      }else if(found2>1){
        validSudoku=false;
      }

      if(found3==1){
        numObjects[jSave3].invalidB=false;
      }else if(found3>1){
        validSudoku=false;
      }
    }
  }
}

function oneSmallNum(){
  if(!validSudoku)return [];
  let changes=[];
  let changeDetails=[];
  let adder=0;
  let saved=null;
  for(let i=0; i<numObjects.length; i++){
    for(let j=0; j<9; j++){
      if(numObjects[i].smallNum[j]){
        adder++;
        saved=j;
      }
    }
    if(adder==1){
      numObjects[i].setNumber(saved+1);
      changeDetails=[i, saved+1];
      changes.push(changeDetails);
    }
    adder=0;
    saved=null;
  }
  return changes;
}

function crossMethod(){
  if(!validSudoku)return
  for(let i=0; i<numObjects.length; i++){ //loops all spots
    for(let j=0; j<numObjects.length; j++){ //loops all for one spot to remove smallNums
      if(j!=i && numObjects[j].horiL==numObjects[i].horiL ||numObjects[j].vertL==numObjects[i].vertL || numObjects[j].boxB==numObjects[i].boxB ){ //has to have same vert/hori line to remove
        numObjects[j].smallNum[numObjects[i].number-1]=false;
      }
    }
  }
}

function isValidNumber(i){
  return numObjects[i].number!=0 && numObjects[i].invalidH==false && numObjects[i].invalidV ==false && numObjects[i].invalidB==false;//valid number
}

function lineMethod(){
  if(!validSudoku)return []
  let timesHori=0;
  let timesVert=0;
  let timesBox=0;
  let horiS=null;
  let vertiS=null;
  let boxS=null;
  let changes=[];
  let changeDetails=[];

  for(let j=0; j<9; j++){ //loops all numbers
    for(let k=1; k<10; k++){ //loops all rows/lines/boxes
      for(let i=0; i<numObjects.length; i++){ //loops all spots
        //next 3 if statements: adder rises if it finds number j with same hori/verti/box 
        //if there is a case where adder only went up once then its the only spot a 
        //number can be in that hori/verti/box and the next 3 if statements set the number.
        if((numObjects[i].smallNum[j] && numObjects[i].horiL==k) || numObjects[i].number==j+1 && numObjects[i].horiL==k){ //left of or is smallnums and right of or is numbers
          timesHori++;
          horiS=i;
        }
        if((numObjects[i].smallNum[j] && numObjects[i].vertL==k) || numObjects[i].number==j+1 && numObjects[i].vertL==k){
          timesVert++;
          vertiS=i;
        }
        if((numObjects[i].smallNum[j] && numObjects[i].boxB==k) || numObjects[i].number==j+1 && numObjects[i].boxB==k){
          timesBox++;
          boxS=i;
        }

      }
      if(timesHori==1 && numObjects[horiS].number==0){  //&& numObjects[horiS].number==0  was added just so changes -array doesn't have results that already had a number
        numObjects[horiS].setNumber(j+1);
        changeDetails=[horiS, j+1];
        changes.push(changeDetails);
      }
      if(timesVert==1 && numObjects[vertiS].number==0){
        numObjects[vertiS].setNumber(j+1);
        changeDetails=[vertiS, j+1];
        changes.push(changeDetails);
      }
      if(timesBox==1 && numObjects[boxS].number==0){
        numObjects[boxS].setNumber(j+1);
        changeDetails=[boxS, j+1];
        changes.push(changeDetails);
      }
      
      timesHori=0;  //checking next hori/verti/box so adders should be 0
      timesVert=0;
      timesBox=0;
    }
  }
  return changes;
}

function pairMethod(){
  if(!validSudoku)return
  let storeArray=[];
  let count=0;
  let hori=0;
  let vert=0;

  for(let j=0; j<9; j++){  //loop numbers
    for(let k=1; k<10; k++){   //loop boxes
      for(let i=0; i<numObjects.length; i++){ //loop objects
        if(numObjects[i].number==j+1 && numObjects[i].boxB==k || numObjects[i].smallNum[j] && numObjects[i].boxB==k){  //counts all smallnumber j:s in box k and saves the locations in array
          storeArray.push(i);
          count++;
        }
      }
      if (count>1 && count <4){   // 2 or 3 smallNumbers j in box k ==> pairMethod possible if they are all lined vertically or horizontally
                                  //next 4 sections are practically the same but 2/3 numbers and hori/vert line
       if (storeArray.length==2){ //smallNums in hori/vert line inside box. 2 or 3
        if (numObjects[storeArray[0]].horiL ==numObjects[storeArray[1]].horiL){  //smallNums are horizontal
          hori=numObjects[storeArray[0]].horiL;
          for(let i=0; i<numObjects.length; i++){
            if(numObjects[i].horiL==hori && i!=storeArray[0] && i!=storeArray[1]){ //removes smallNums J from the horizontal line but not the original 2
              numObjects[i].smallNum[j]=false;
            }
          }
        }

        if (numObjects[storeArray[0]].vertL ==numObjects[storeArray[1]].vertL){
          vert=numObjects[storeArray[0]].vertL;
          for(let i=0; i<numObjects.length; i++){
            if(numObjects[i].vertL==vert && i!=storeArray[0] && i!=storeArray[1]){
              numObjects[i].smallNum[j]=false;
            }
          }
        }
       }

       
       if (storeArray.length==3){
        if (numObjects[storeArray[0]].horiL==numObjects[storeArray[1]].horiL && numObjects[storeArray[0]].horiL==numObjects[storeArray[2]].horiL){
          hori=numObjects[storeArray[0]].horiL;
          for(let i=0; i<numObjects.length; i++){
            if(numObjects[i].horiL==hori && i!=storeArray[0] && i!=storeArray[1] && i!=storeArray[2]){
              numObjects[i].smallNum[j]=false;
            }
          }      
        }
        if (numObjects[storeArray[0]].vertL ==numObjects[storeArray[1]].vertL && numObjects[storeArray[0]].vertL==numObjects[storeArray[2]].vertL){
          vert=numObjects[storeArray[0]].vertL;
          for(let i=0; i<numObjects.length; i++){
            if(numObjects[i].vertL==vert && i!=storeArray[0] && i!=storeArray[1] && i!=storeArray[2]){
              numObjects[i].smallNum[j]=false;
            }
          }         
        }
       }
      } 
    storeArray=[];
    count=0;
    }
  }
}

function hiddenPairs(){
  if(!validSudoku)return
  crossMethod();  //must do this first or you can get invalid smallNums. TODO: remove this line and make this methods button only active when crossmethod has been pressed
  let horiS=[];
  let vertS=[];
  let boxS=[];
  horiS.push([],[],[],[],[],[],[],[],[]);
  vertS.push([],[],[],[],[],[],[],[],[]);
  boxS.push([],[],[],[],[],[],[],[],[]);
  let combined=[];

  for(let k=1; k<10; k++){//loop lines/boxes and each line/box executes the method findPairs
    for(let j=0; j<9; j++){  //loop numbers
      for(let i=0; i<numObjects.length; i++){ //loop objects
        if(numObjects[i].smallNum[j]&& numObjects[i].horiL==k){
            horiS[j].push(i);
        }
        if(numObjects[i].smallNum[j]&& numObjects[i].vertL==k){
          vertS[j].push(i);
        
        }
        if(numObjects[i].smallNum[j]&& numObjects[i].boxB==k){
        boxS[j].push(i);
      
        }
      }
    }
    combined.push(horiS,vertS,boxS);
    findPairs();
    combined=[];
    horiS=[];
    vertS=[];
    boxS=[];
    horiS.push([],[],[],[],[],[],[],[],[]);
    vertS.push([],[],[],[],[],[],[],[],[]);
    boxS.push([],[],[],[],[],[],[],[],[]);

  } 

 function findPairs(){
  let same = true;
  let sameLength=0;
  let count=1;
  let saveNums=[];
  let found=false;

  for (let c=0; c<3; c++){ //0=horisontal , 1=vertical, 2 =box checking.

  
  for (let i=0; i<9; i++){  //all numbers
    if(combined[c][i].length>1 && combined[c][i].length<=4){  //the line/box has a number i that fits only in 1-4 spots. if >1 is set to >0 this actually also becomes lineMethod, but its cooler this way.
      saveNums.push(i);                           //this array has the numbers from pairs so we know what to remove from smallNums
      sameLength=combined[c][i].length;                 //saves the length so we know if we are looking for pairs, 3s or 4s.
      for(let j=0; j<9; j++){                      //loops through numbers trying to find another number that fits in the same amount of spots as i
        if(j!=i && combined[c][j].length==combined[c][i].length){//finds possible pair
          for(let k=0; k<combined[c][i].length; k++){  //checks if the possible pair has the exact same spots it can go to
            if(combined[c][i][k]!=combined[c][j][k]){
              same=false;
            }
          }
          if(same){
            count++;
            saveNums.push(j);
          }
          same=true;
        }
      }
      if(count==sameLength){      //we found count amount of numbers (2-4) that fit in count amount of spots in the same line/box. 
        for(let l=0; l<9; l++){   //all numbers
          for(let u=0; u<sameLength; u++){  //loops through spots (1-4)
            for(let y=0; y<saveNums.length; y++){  //loops through numbers that the pairs have in common
             if(saveNums[y]==l) found=true;
          }
          if(!found) numObjects[combined[c][i][u]].smallNum[l]=false;  //removes all numbers from smallNum that are not the same as the ones in pairs
        }
        found=false;
        } 
      }
      count=1;
      saveNums=[];
    }
  }
}
 }
}
function bruteMethod(){ //solving sudoku with guessing and backtracking if guess goes wrong.
  if(isComplete()) return true;
  for(let i=0; i<numObjects.length; i++){
    if(numObjects[i].number==0){
      for (let j=1; j<10; j++){
        let changes=[];
        let changes2=[];
        validSudoku=true;
        numObjects[i].setNumber(j);
        //in addition to guessing number (setNumber(j)) do the regular methods to speed up the solving (get to invalid sudoku faster with wrong guess)
        crossMethod();
        changes =lineMethod();
        changes=changes.concat(oneSmallNum());
        checkValid();
        if(validSudoku){
          if(bruteMethod())return true;
        }
        numObjects[i].setNumber(0);     //here a guess has gone wrong so we set the guess to 0. also set the smallNum and changes back to 0 because they were created from the wrong guess
        for(let h=0;h<numObjects.length; h++){
          if(numObjects[h].number==0)numObjects[h].smallNum=[true,true,true,true,true,true,true,true,true];
        }
        for(let k=0; k<changes.length; k++){
          numObjects[changes[k][0]].setNumber(0);
        }
        validSudoku=false;
      }return false;
    }
  }
}


function isComplete(){
  if(!validSudoku) return false
  let count=0;
  for(let i=0; i<numObjects.length; i++){
    if(numObjects[i].number!=0){
      count++;
    }
  }
  if (count==81){
    return true;
  }
  return false;
}