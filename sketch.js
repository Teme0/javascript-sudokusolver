"use strict";


function preload() {
  
}

var numObjects=[];
var number;
var inputNum=0;
var validSudoku=true;
var invalidNum=0;
var invalidVert=0;
var invalidHori=0;
var invalidBox=0;

function setup(preset) {
  var canvas = createCanvas(600, 462);
  let plusX=0;
  let plusY=0;
  let hori=1;
  let vert=1;
  let boxB=1;
  let num=0;

  for(let i=1; i<82; i++){
      if(preset){
        num=preset[i-1];
      }
      number = new createNumberSlot(18+plusX,25+plusY,0+num,hori,vert,boxB);
      plusX+=50;
      numObjects.push(number);
      vert++;
      if(i%3==0 && !i%9==0){
        boxB++;
      }
        if(i%9==0){
            hori++;
            vert-=9;
            boxB-=3;
            plusY+=50;
            plusX-=450;
        }
        if(i%27==0){
          boxB+=3;
        }
    
    
}
    //numObjects[15].number=5;
 


}

function mouseClicked() {
  for(let i=0; i<numObjects.length; i++){
      if(mouseX>=numObjects[i].x-12 && mouseX<=numObjects[i].x+35 &&mouseY>=numObjects[i].y-19 && mouseY<=numObjects[i].y+28 ){
        if(keyCode-48<=9 && keyCode-48>=0){
          numObjects[i].setNumber(keyCode-48);
        } 
       
      }
  }
 // var a = performance.now();

  checkValid();
 // var b = performance.now();
  //console.log(b-a);
}

function keyPressed() {
  if(keyCode-48<=9 && keyCode-48>=0){
    inputNum=keyCode-48;
  }
  

}
function drawLines() {
  let plusX=0;
  let plusY=0;
  for(let i=0; i<10; i++){
    strokeWeight(1);
    if(i%3==0){
      strokeWeight(3);
    }
    line(5, 5+plusY, 455, 5+plusY);
    line(5+plusX, 5, 5+plusX, 455);
    plusY+=50;
    plusX+=50;
} 
  

}
function resetFunction(preset){
  numObjects.splice(0,numObjects.length);
  setup(preset);
  }

  
    function preSets() {
      //Getting Value
      var selObj = document.getElementById("preSetSelector");
      var selValue = selObj.options[selObj.selectedIndex].value;
      //Setting Value
      let preset1= 			
      [8,7,6,9,0,0,0,0,0, 			//requires boxline
       0,1,0,0,0,6,0,0,0,
       0,4,0,3,0,5,8,0,0,
       4,0,0,0,0,0,2,1,0,
       0,9,0,5,0,0,0,0,0,
       0,5,0,0,4,0,3,0,6,
       0,2,9,0,0,0,0,0,8,
       0,0,4,6,9,0,1,7,3,
       0,0,0,0,0,1,0,0,4];
      let preset2= 			
       [0,6,0,0,9,2,0,0,0, 			//requires boxline
        0,2,0,0,3,7,0,0,6,
        4,8,0,0,0,0,7,0,9,
        5,4,0,0,7,0,0,0,0,
        0,0,0,9,1,0,0,0,0,
        0,0,9,0,0,0,0,8,1,
        0,0,8,0,0,0,4,0,0,
        0,0,4,5,0,0,0,3,0,
        0,0,0,3,0,4,0,7,0];
        let preset3=
       [3,0,0, 0,0,0, 8,0,5, 
				0,2,9, 0,0,0, 4,0,0,
				0,0,0, 2,4,7, 0,0,0,			
				0,0,3, 0,0,0, 0,0,8,		//req boxline and hidden pair 6,3 6,4
				0,0,0, 0,5,0, 0,0,4,
				0,1,0, 0,7,0, 6,0,0,
				1,0,5, 0,0,9, 0,0,0,
				4,0,0, 0,8,0, 0,1,0,
        0,0,2, 0,0,0, 0,0,3];
        
      if(selValue==1){
          resetFunction(preset1);
      }
      if(selValue==2){
        resetFunction(preset2);
      }
      if(selValue==3){
        resetFunction(preset3);
      }
      selObj.selectedIndex=0;
  }
  


function draw() {

    background(200); 
    for(let i=0; i<numObjects.length; i++){
      numObjects[i].show();
    }
    textSize(60);
    text(inputNum, width-100, 100);
    textSize(20);
    if(validSudoku){
      text("Valid Sudoku", width-135, 150);
    }else{
      text("Invalid Sudoku", width-135, 150);
    }
    
    drawLines();
    
    
}
