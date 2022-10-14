window.addEventListener("load", (event)=> {
  let squares  = document.querySelectorAll("#board > div");
  
  squares.forEach((sqr)=> {
      sqr.classList.add("square");
      sqr.innerHTML = " ";
  
  });

  let winCondition = [[0,1,2],[3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], [0,4,8] , [2,4,6]];

  let Winner_X = 0;
  let Winner_O = 0;
  let player_X = true;
  let player_O = false;
  let active;
  let restart_btn =  document.querySelector(".btn");

  squares.forEach((sqr)=> {
      
      sqr.onclick = (event)=>{
          if (player_X && sqr.innerHTML == " "){
              sqr.classList.add("X");
              sqr.innerHTML = 'X';
              player_X = false;
              player_O = true;
          }
          else if (player_O && sqr.innerHTML == " ") {
              sqr.classList.add("O");
              sqr.innerHTML = 'O';
              player_O = false;
              player_X = true;
          }
          
          active = checkWinner();

          if (active == 1){
             document.querySelector("div#status").classList.add("you-won");
             document.querySelector("div#status").innerHTML = `Congratulations! ${sqr.innerHTML} is the Winner!`;

             squares.forEach((square)=>{
                 square.onclick = (event) => {
                     event.preventDefault();
                 }
             })

          }
      }

      sqr.onmouseover = (event)=>{
          sqr.style.transition = "all .3s ease-in-out";
          sqr.classList.add("hover");
      }

      sqr.onmouseout = (event)=>{
          sqr.classList.remove("hover");
      }

      let checkWinner =()=> {

          for (item = 0 ; winCondition.length; item++){

              winCondition[item].forEach(element => {
                  if (squares[element].classList.contains("X")){
                      Winner_X++;
                  }
                  else if (squares[element].classList.contains("O")){
                      Winner_O++;
                  }
              });
              if(Winner_X == 3 || Winner_O ==3 ){
                  return 1;
              }
              Winner_X = 0;
              Winner_O = 0;
             if (item < winCondition.length - 1){
                 continue;
             }
             return 0;

          }
       } 
      
  });

  restart_btn.addEventListener('click', (event) => {
      
      squares.forEach((sq) => {
          sq.innerHTML = "";
          location.reload();
      });

  })
});