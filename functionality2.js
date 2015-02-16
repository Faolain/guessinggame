function Guess(content){
  this.num = Math.floor(Math.random()*100+1);
  this.count = 0;
  this.message = "";
  this.choices = [];


  this.genNum = function(){
    this.num = Math.floor(Math.random()*100+1);
  };

  this.checkDiff = function(num){
    var diff = Math.abs(this.num-num);
    var nonAbs = +(this.num - num);

    if(nonAbs < 1){
      this.message = "Guess Lower ";
    } else{
      this.message = "Guess Higher ";
    }

    if(diff < 10){
      //on fire
      this.message += "but you're on fire.";
    }
    else if(diff <20){
      //very hot
      this.message += "but getting warmer.";
    }
    else if(diff <35){
      //hot
      this.message += "but getting warmer.";
    }
    else if(diff <45){
      //cold
      this.message += "you're cold.";
    }
    else if(diff < 65){
      //very cold
      this.message += "very cold.";
    }
    else if(diff < 99){
      //ice cold
      this.message += "Ice cold.";
    }

    $('#temp').text(this.message);
  };

  this.isCorrect = function(num){
    if(+num === this.num){
      return true;
    }
    else{
      return false;
    }
  };

  this.check = function(num){
    if(this.choices.indexOf(num) > -1){
      this.message = "Sorry you already made that choice please select another number.";
      $('#temp').text(this.message);
    } else {
      if(this.isCorrect(num)){
      alert("Congrats on the Win. New Game?");
    } else {
      this.count++;
      if(this.count == 5)
      {
        content.text(this.num + " Attempts " + this.count + "/" + 5);
        alert("Sorry you didn't get it this time, hit new game to try again.");
      } else {
        this.checkDiff(num);
        this.choices.push(num);
        content.text(this.num + " Tries" + this.count + "/" + 5);
      }
    }
    }
  };

  this.reset = function(){
    this.count = 0;
    this.message = "";
    this.genNum();
    this.choices = [];
    content.text(this.num);
    this.color = "neutral";
  };

  content.text(this.num);
}


$(document).ready(function(){
  var content = $('#content');
  var game = new Guess(content);

  content.text(game.num);

  $('.submit').on('click', function(e){
    e.preventDefault();
    if(game.count < 5){
      game.check($('.guess').val());
    }
  });

  $('#new').on('click', function(){
    game.reset();
  });
});