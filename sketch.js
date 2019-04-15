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

function setup() {
  var canvas = createCanvas(600, 462);
  let plusX=0;
  let plusY=0;
  let hori=1;
  let vert=1;
  let boxB=1;

  for(let i=1; i<82; i++){
      
      number = new createNumberSlot(18+plusX,25+plusY,0,hori,vert,boxB);
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
function resetFunction(){
  numObjects.splice(0,numObjects.length);
  setup();
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
