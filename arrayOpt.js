"use strict";
function checkValid(){
      let found= 0;
      let i=1;
      let l;
      let j;
      validSudoku=true;
      let jSave=0;

      for(j=0; j<numObjects.length; j++){ // all objects
        numObjects[j].invalid=false;
      }

      for(i=1; i<10; i++){ //all numbers
        jSave=0;
        for(l=1; l<10; l++){ //all horisontal lines
          found=0;
          for(j=0; j<numObjects.length; j++){ // all objects
            if(numObjects[j].number==i && numObjects[j].horiL==l){
              found++;
              numObjects[j].invalidH=true;
              jSave=j;
             }
          }
          if(found==1){
            numObjects[jSave].invalidH=false;
            
       }else if(found>1){
        validSudoku=false;
       }
        }
        
        jSave=0;
        for(l=1; l<10; l++){ //all vertical columns
          found=0;
          for(j=0; j<numObjects.length; j++){ // all objects
            if(numObjects[j].number==i && numObjects[j].vertL==l){
              found++;
              numObjects[j].invalidV=true;
              jSave=j;
            }
          }
          if(found==1){
            numObjects[jSave].invalidV=false;
       }else if(found>1){
        validSudoku=false;
       }
        }
        jSave=0;
        for(l=1; l<10; l++){ //all boxes
          found=0;
          for(j=0; j<numObjects.length; j++){ // all objects
            if(numObjects[j].number==i && numObjects[j].boxB==l){
              found++;
              numObjects[j].invalidB=true;
              jSave=j;
            }
          }
          if(found==1){
            numObjects[jSave].invalidB=false;
       }else if(found>1){
        validSudoku=false;
       }
        }
      }
}

function oneSmallNum(){
  if(!validSudoku)return
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
    }
    adder=0;
    saved=null;
  }
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
  if(!validSudoku)return
  let timesHori=0;
  let timesVert=0;
  let timesBox=0;
  let horiS=null;
  let vertiS=null;
  let boxS=null;

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
      if(timesHori==1){
        numObjects[horiS].setNumber(j+1);
      }
      if(timesVert==1){
        numObjects[vertiS].setNumber(j+1);
      }
      if(timesBox==1){
        numObjects[boxS].setNumber(j+1);
      }
      
      timesHori=0;  //checking next hori/verti/box so adders should be 0
      timesVert=0;
      timesBox=0;
    }
  }
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
   
    if (count>1 && count <4){   // 2 or 3 smallNum j in box k ==> pairMethod possible if they are all lined vertically or horizontally
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


  function bruteMethod(){
    if(isComplete()) return true;
    for(let i=0; i<numObjects.length; i++){
      if(numObjects[i].number==0){
        for (let j=1; j<10; j++){
          validSudoku=true;
          numObjects[i].setNumber(j);
          checkValid();
          if(validSudoku){
            if(bruteMethod())return true;
          }
          numObjects[i].setNumber(0);
          validSudoku=true;
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