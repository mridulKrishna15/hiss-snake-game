//game constants//
let inputDir= {x:0,y:0};
let movesound= new Audio('Snake.mp3');
let gameoversound= new Audio('Game Over.mp3');
let bgmusic= new Audio('bgmusic.mp3');
let foodsound= new Audio('eating.mp3');
let score=0;
let speed=5;
let lastPaintTime=0;
let snakearr = [
    {x: 13, y: 15}
]
let food= {x: 1, y: 15};

//game functions//
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime= ctime;
   // console.log(ctime);
    gameEngine();

}
function isCollide(snake){
 //khud se takra gya
 for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x=== snake[0].x && snake[i].y=== snake[0].y)
      return true;
 }
 if(snake[0].x>=18 || snake[0].x<=0 )
    return true;
    if( snake[0].y>=18 || snake[0].y<=0)
    return true;
}


function gameEngine(){
    //part 1:updating snake variable array
    if(isCollide(snakearr)){
        gameoversound.play();
        bgmusic.pause();
        inputDir={x:0,y:0};
        alert("Game over: press any key to play again ");
        snakearr=[
            {x: 13, y: 15}
        ];
        bgmusic.play();
        score=0;document.getElementById('score').innerHTML=score;

    };

    //if you ate food increase score and regenerate food
    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y})
        let a=2;
        let b=16;
         food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
         foodsound.play();
         score++;
         document.getElementById('score').innerHTML=score;
    
    }

    //snake moving
    for (let i = snakearr.length-2; i>=0 ; i--) {
        
        snakearr[i+1]={...snakearr[i]};
        
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;


    // display the snake 
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);


        

    });
    //display food
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart= food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);



}



//main logic//
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0 , y:1} //start game
    bgmusic.play();
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
                console.log("ArrowDown");
                inputDir.x=0;
                inputDir.y=1;
                break;

        case "ArrowLeft":
                    console.log("ArrowLeft");
                    inputDir.x=-1;
            inputDir.y=0;
                    break;

        case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x=1;
            inputDir.y=0;
        break;
        default:
            break;
    }
})