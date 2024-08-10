document.addEventListener('DOMContentLoaded',()=>{   // DOMContentLoaded -is saying that i get every html file be read before loading this javascript filein layman it is more to establish every event in order
const grid=document.querySelector('.grid');
const scoreDisplay=document.getElementById('score');
const width=8;
const squares=[];
let score=0;


const candyColors=[
    'red',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue'
]

// create Board
  function createBoard(){
    for(let i=0;i<width*width;i++){
          const square=document.createElement('div')
          square.setAttribute('draggable',true);
          square.setAttribute('id',i);
          let randomColor=Math.floor(Math.random()*candyColors.length) // to get random color pick number from the array
          
           square.style.backgroundColor=candyColors[randomColor]
          grid.appendChild(square);
          squares.push(square)

    }
  }
  createBoard();

  // drag the candies
let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced
  squares.forEach(square=>square.addEventListener('dragstart',dragStart))
  squares.forEach(square=>square.addEventListener('dragend',dragEnd))
  squares.forEach(square=>square.addEventListener('dragover',dragOver))
  squares.forEach(square=>square.addEventListener('dragenter',dragEnter))
  squares.forEach(square=>square.addEventListener('dragleave',dragLeave))
  squares.forEach(square=>square.addEventListener('drop',dragDrop))
   function dragStart(){
    colorBeingDragged=this.style.backgroundColor
    console.log(colorBeingDragged);
    squareIdBeingDragged=parseInt(this.id);
   console.log(this.id,'dragstart');
   }
   
   function dragOver(e){
    e.preventDefault()
    console.log(this.id,'dragOver');
   }
   function dragEnter(e){
    e.preventDefault()
    console.log(this.id,'dragEnter');
   }
   function dragLeave(){
    console.log(this.id,'dragLeave');
   }
   
   function dragDrop(){
    console.log(this.id,'dragDrop');
    colorBeingReplaced=this.style.backgroundColor
    squareIdBeingReplaced=parseInt(this.id)
    this.style.backgroundColor=colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundColor=colorBeingReplaced
   }
   function dragEnd(){
    console.log(this.id,'dragEnd');
    // what are our valid moves?
    let validMoves=[squareIdBeingDragged -1 ,// square 
    squareIdBeingDragged -width,  //square 59,
     squareIdBeingDragged +1,         // square 68
     squareIdBeingDragged  +width ];   // square 75
     let validMove=validMoves.includes(squareIdBeingReplaced)
     if(squareIdBeingReplaced && validMove){
       squareIdBeingReplaced=null
     }else if(squareIdBeingReplaced && !validMove){
      squares[squareIdBeingReplaced].style.backgroundColor=colorBeingReplaced
      squares[squareIdBeingDragged].style.backgroundColor=colorBeingDragged

     }else{
        squares[squareIdBeingDragged].style.backgroundColor=colorBeingDragged
     }
    }
  // drop candies onces some have been cleared 
   function  moveDown(){
       for(i=0;i<55;i++){
           if(squares[i+width].style.backgroundColor===''){
          squares[i+width].style.backgroundColor=squares[i].style.backgroundColor
          squares[i].style.backgroundColor=''
               const firstRow=[0,1,2,3,4,5,6,7]
               const isFirstRow =firstRow.includes(i)
               if(isFirstRow && squares[i].style.backgroundColor===''){
                let randomColor=Math.floor(Math.random()+candyColors.length)
                squares[i].style.backgroundColor = candyColors[randomColor]
               }
           }
       }
   }

   // checking for the matches
   // check for row of four
   function checkRowForFour(){
    for(i=0;i<60;i++){
 let rowOfFour=[i,i+1,i+2,i+3]
 let decidedColor=squares[i].style.backgroundColor
 const isBlank=squares[i].style.backgroundColor===''
 const notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55] // not valid index to check 
 if(notValid.includes(i)){
        continue
 }

 if(rowOfFour.every(index=> squares[index].style.backgroundColor===decidedColor && !isBlank)){
    score+=4;
    scoreDisplay.innerHTML=score
    rowOfFour.forEach(index=>{
       squares[index].style.backgroundColor=''
    })
    }
   }
   }
   checkRowForFour();

// check for col of four
function checkColForFour(){
    for(let i=0;i<47;i++){
 let colOfFour=[i,i+width,i+2*width,i+width*3]
 let decidedColor=squares[i].style.backgroundColor
 const isBlank=squares[i].style.backgroundColor===''

 if(colOfFour.every(index=> index < squares.length && squares[index].style.backgroundColor===decidedColor && !isBlank)){
    score+=4;
    scoreDisplay.innerHTML=score
    colOfFour.forEach(index=>{
       squares[index].style.backgroundColor=''
    })
    }
   }
   }
   checkColForFour();


  // checking for the matches
   // check for row of three
   function checkRowForThree(){
    for(i=0;i<61;i++){
 let rowOfThree=[i,i+1,i+2]
 let decidedColor=squares[i].style.backgroundColor
 const isBlank=squares[i].style.backgroundColor===''
 const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55]; // not valid index to check 
 if(notValid.includes(i)){
        continue
 }

 if(rowOfThree.every(index=> squares[index].style.backgroundColor===decidedColor && !isBlank)){
    score+=3;
    scoreDisplay.innerHTML=score
    rowOfThree.forEach(index=>{
       squares[index].style.backgroundColor=''
    })
    }
   }
   }
   checkRowForThree();

// check for col of three
function checkColForThree(){
    for(i=0;i<47;i++){
 let colOfThree=[i,i+width,i+2*width]
 let decidedColor=squares[i].style.backgroundColor
 const isBlank=squares[i].style.backgroundColor===''

 if(colOfThree.every(index=> squares[index].style.backgroundColor===decidedColor && !isBlank)){
    score+=3;
    scoreDisplay.innerHTML=score
    colOfThree.forEach(index=>{
       squares[index].style.backgroundColor=''
    })
    }
   }
   }
   checkColForThree();

 window.setInterval(function(){
    moveDown()
    checkRowForFour()
    checkColForFour()
    checkRowForThree()
    checkColForThree()
 },100)

 









})
