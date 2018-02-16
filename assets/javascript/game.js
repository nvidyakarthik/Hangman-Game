// Let's start by grabbing a reference to the <span> below.
var userText = document.getElementById("user-text");
// var wrongText = document.getElementById("wrong-text");
var computerChoices = ["elephant", "lion", "tiger","giraffe","crocodile","gorilla","hippopotamus","kangaroo"];
var numguessText = document.getElementById("numguess-text");
var correctAnswer = document.getElementById("correctAnswer");
var wrongCharArray = [];
var rightCharArray = [];
var winCount = 0;
var numberOfGuesses = 10;
var complete=0;
var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
createButtons(computerGuess.length);
//document.getElementById("comp-text").textContent = computerGuess;
numguessText.textContent = numberOfGuesses;


//This function creates the alphabet buttons
function createButtons(length) {
  var btn;
  for (var i = 0; i < length; i++) {
    btn = document.createElement("div");
    btn.setAttribute("id", "pos" + i);
    document.getElementById("spaces").appendChild(btn);
  }
}

//This function  checks for guessedcharacter position in the word and highlights the button color with red or green
function characterPosition(guessedChar) {
  // alert("inside");

  for (var i = 0; i < computerGuess.length; i++) {
    if (guessedChar === computerGuess.charAt(i)) {
      //alert("postion is" +i);
      rightCharArray.push(guessedChar);
      document.getElementById(guessedChar).style.backgroundColor = "#afe4c3";
      document.getElementById("pos" + i).innerText = guessedChar;

    }
  }
}

//This function check if the character typed by user is already entered or not
function duplicateCharCheck(dupChar) {

  // document.getElementById(dupChar).style.backgroundColor="#e4afb5";
  if ((wrongCharArray.includes(dupChar) || rightCharArray.includes(dupChar)) && numberOfGuesses >= 1) {
    // numberOfGuesses=numberOfGuesses-1;
    //printToConsole(numguessText, numberOfGuesses)
    return false;
  }
  else
    //numberOfGuesses=numberOfGuesses-1;
    //printToConsole(numguessText, numberOfGuesses)
    return true;


}

//This function deletes the guessing word divs for the player to start again
function deleteElement(length) {
  var parentElement = document.getElementById("spaces");
  var child;
  for (var i = 0; i < length; i++) {
    child = document.getElementById("pos" + i);
    parentElement.removeChild(child);

  }
}

function deleteImage(){
  var parent=document.getElementById("answerImage");
  var child=document.getElementById("animalImg");
  //parent.remove(child);
  child.parentNode.removeChild(child);

}

//This function resets the game for the player to play again
function clear() {
  userText.innerText = "";
  numguessText.innerText = "";
  //document.getElementById("comp-text").innerText = "";
  //wrongText.innerText = "";
  correctAnswer.innerText = "";
  deleteElement(computerGuess.length);
  wrongCharArray = [];
  rightCharArray = [];
  numberOfGuesses = 10;
  computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
  createButtons(computerGuess.length);
  complete=0;

  //remove image
  deleteImage();

  //This code resets the green and red color buttons to its original color
  let line1 = document.getElementById("line1").querySelectorAll('div');
  for (index = 0; index < line1.length; index++) {
    line1[index].style.backgroundColor = "#f2f9fb";
  }

  let line2 = document.getElementById("line2").querySelectorAll('div');
  for (index = 0; index < line2.length; index++) {
    line2[index].style.backgroundColor = "#f2f9fb";
  }

}

//This function prints the output in user screen
function printToConsole(text, value) {
  //wrongText=wrongCharArray.slice(0, -1).join(', ');
  (text).innerText = value;
}

//This function prints the image to the screen
function imageToConsole(location){
  var DOM_img = document.createElement("img");
  var DOM_parent=document.getElementById("answerImage");
  DOM_img.src = "assets/images/"+location+".jpg";
  //DOM_img.src = "assets/images/elephant.jpg";
  DOM_img.setAttribute("class","animal");
  DOM_img.setAttribute("alt","animal");
  DOM_img.setAttribute("id","animalImg");

  DOM_parent.appendChild(DOM_img);
  //document.getElementById("answerImage").innerHTML("<img src='assets/images/'"+location+"'.jpg' class='animal' alt='animal'>");
  complete=1;//This variable checks and stops adding more images 
}

function playAgain(){
  clear();

}




// Next, we give JavaScript a function to execute when onkeyup event fires.
document.onkeyup = function (event) {

  userText.textContent = (event.key).toLowerCase();
  
  var temp = userText.textContent;
 

  //alert(temp);
  //if(rightCharArray.length!==computerGuess.length && duplicateCharCheck(temp)){
  if (duplicateCharCheck(temp) && complete==0) {
    // alert("inside dup");
    if (numberOfGuesses >= 1 && rightCharArray.length <= computerGuess.length) {
      if (computerGuess.includes(temp)) {
        characterPosition(temp);
        if (rightCharArray.length == computerGuess.length) {
        
          printToConsole(correctAnswer, "You win !!! your score is " + ++winCount);
          imageToConsole(computerGuess);
          document.getElementById("yes").disabled=false;
          document.getElementById("no").disabled=false;
          
          //winCount++;
          /*var user = confirm("You win!!!  " + winCount + " Do you want to play again?");
          if (user) {
            clear();

          }*/

        }


        // alert("you have typed correct");
      }
      else {
        //alert("wrong!!");
        wrongCharArray.push(temp);
        document.getElementById(temp).style.backgroundColor = "#e4afb5";
        // printToConsole(wrongText, wrongCharArray);
        --numberOfGuesses;
        printToConsole(numguessText, numberOfGuesses)
      }
    }
    else {
      var tempText="The correct word is " + computerGuess + " you lose";
      printToConsole(correctAnswer, tempText);
      imageToConsole(computerGuess);
      document.getElementById("yes").disabled=false;
      document.getElementById("no").disabled=false;
      /*alert("The correct word is" + computerGuess + "you lose");
      var user = confirm("Do you want to play again?")
      if (user) {
        clear();
 
      }*/


    }
  }
  else if (numberOfGuesses == 0) {
    printToConsole(correctAnswer, computerGuess);
  }







};
