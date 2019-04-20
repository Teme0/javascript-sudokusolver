"use strict";

function createNumberSlot(x,y,number,hori,vert,boxB){
  this.x=x;
  this.y=y;
  this.empty=false;
  this.number=number;
  this.smallNum=[false,false,false,false,false,false,false,false,false];
  this.horiL=hori;
  this.vertL=vert;
  this.boxB=boxB;
  this.invalidH=false;
  this.invalidV=false;
  this.invalidB=false;

  if(number==0){
    this.smallNum=[true,true,true,true,true,true,true,true,true];
  }

  this.show = function(){
    if(!this.empty){
      if(this.number!=0){
        textSize(32);
        push();
        if (!validSudoku && this.invalidH==true || this.invalidV ==true|| this.invalidB==true){
          fill(255,0,0);
        }
        text(this.number, this.x+5, this.y+18);
        pop();
      }else if(this.number==0){
        textSize(12);
        //text(this.horiL+""+this.vertL+""+this.boxB, this.x-8, this.y+29);
        let plusX=0;
        let plusY=0;
        for(let i=1; i<10; i++){
          if(this.smallNum[i-1]){
            text(i, this.x+plusX, this.y+plusY);
          }
          plusX+=10;
          if(i==3 || i==6){
          plusY+=10;
          plusX-=30;
          } 
        }  
      }
    }
  }
  this.setNumber = function(number){
    this.number=number;
    for(let i=0; i<9; i++){
      this.smallNum[i]=false;
    }
    if(number==0){
      this.smallNum=[true,true,true,true,true,true,true,true,true];
    }
    this.empty=false;
  }
 }