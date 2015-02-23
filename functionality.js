function Guess(content){
  this.num = Math.floor(Math.random()*100+1);
  this.count = 0;
  this.message = "";
  this.choices = [];


  this.genNum = function(){
    this.num = Math.floor(Math.random()*100+1);
  };

  this.temps = function(temp){
    if(temp < 10){
      //on fire
      this.message += "but you're on fire.";
    }
    else if(temp <20){
      //very hot
      this.message += "but getting warm";
    }
    else if(temp <35){
      //hot
      this.message += "getting pretty room temperature";
    }
    else if(temp <45){
      //cold
      this.message += "you're cold.";
    }
    else if(temp < 65){
      //very cold
      this.message += "very cold.";
    }
    else if(temp < 99){
      //ice cold
      this.message += "Ice cold.";
    }
  };


  this.checkDiff = function(num){
    var diff = Math.abs(this.num-num);
    var nonAbs = +(this.num - num);

    if(this.choices[this.choices.length-1] === undefined){
      if(nonAbs < 1){
        this.message = "Guess Lower, ";
        this.temps(diff);
      } else{
        this.message = "Guess Higher, ";
        this.temps(diff);
      }
    } else{
      if(num < this.num){
        this.message = "Guess Higher, ";
        this.temps(diff);
      } else{
        this.message = "Guess Lower, ";
        this.temps(diff);
      }
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
        content.text("Attempts " + this.count + "/" + 5);
        alert("Sorry you didn't get it this time, hit new game to try again.");
      } else {
        this.checkDiff(num);
        this.choices.push(num);
        content.text("Tries " + this.count + "/" + 5);
      }
    }
    }
  };

  this.reset = function(){
    this.count = 0;
    this.message = "";
    this.genNum();
    this.choices = [];
    this.color = "neutral";
  };
}


$(document).ready(function(){
  var content = $('#content');
  var game = new Guess(content);


  $('.submit').on('click', function(e){
    e.preventDefault();
    if(game.count < 5){
      game.check($('.guess').val());
      $('.guess').val('');
    }
  });

  $('#new').on('click', function(){
    game.reset();
  });

  $('#hint').on('click', function(){
    if(game.count > 0)
    alert(game.num);
  else{
    alert("You need to guess at least once first!");
  }
  });
});