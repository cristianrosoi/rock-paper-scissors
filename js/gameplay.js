/*

background music credits:
"Carpe Diem" Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 3.0 License
http://creativecommons.org/licenses/by/3.0/

winning the game credits:
This game uses these sounds from freesound:
Trumpet2 by Harbour11 (https://www.freesound.org/people/Harbour11/);
Remix of 59820__musicmangoldy__Trumpet_09_(Before-After) by Timbre (https://www.freesound.org/people/Timbre)

*/

$(document).ready(function() {
	var playerScore 	= 0;
	var computerScore	= 0;
	var tieScore		= 0;
	var roundScore		= 0;
	var winSound = new Audio('sound/win.wav');
	var backgroundMusic = new Audio('sound/backgroundMusic.mp3');
	var winGame = new Audio('sound/won-the-game.mp3');
	var gameOver = new Audio('sound/game-over.wav');
	var soundOn = '<i class="fa fa-volume-up" aria-hidden="true"></i>'
	var soundOff = '<i class="fa fa-volume-off" aria-hidden="true"></i>'
	var letters = /^[a-zA-Z]*$/;
	
	backgroundMusic.volume = 0.1;
	winSound.volume = 0.1;
	gameOver.volume = 0.1;

	$('.soundOn').hide();

	$('.soundOn').click(function(){
		backgroundMusic.pause();
		$('.soundOn').hide();
		$('.soundOff').show();
	});

	$('.soundOff').click(function(){
		backgroundMusic.play();
		$('.soundOff').hide();
		$('.soundOn').show();
	});		

	$('#login').hide();
	$('#play').hide();
	$('#winGame').hide();
	$('#lostGame').hide();
	$('#map').hide();

	$('#login').fadeIn(500);

	$('#btnPlay').click(function btnPlay(){	
		userName = $('#userName').val();
		console.log(userName);				
		if (!userName.match(letters)) {
			alert('Please use only letters');
		} else {
			$('#login').hide();		
			Play();	
		}

	});		

	function Play() {
		
		$('body').css('background-image', 'url(img/background.png)');
		$('#play').fadeIn(500);
		$('#playerScore').text(" " + userName + ":" + " " + playerScore);
		$('#userNamePannel').text(userName + "'s" + ' ' + 'choice');

		function compare(choice1, choice2) {

			if (choice1 === choice2) {
				$('#result').text('TIE!');
				tieScore++;
				roundScore++;
			} else if (choice1 === "rock") {
				if (choice2 === "scissors") {
					$('#result').text('You Win');
					playerScore++;
					roundScore++;				
					winSound.play();
				} else {
					$('#result').text('Computer Wins');
					computerScore++;
					roundScore++;
				}
			} else if (choice1 === "paper") {
				if (choice2 === "rock") {
					$('#result').text('You Win');
					playerScore++;
					roundScore++;
					winSound.play();
				} else {
					$('#result').text('Computer Wins');
					computerScore++;
					roundScore++;
				}
			} else if (choice1 === "scissors") {
				if (choice2 === "paper") {
					$('#result').text('You Win');
					playerScore++;
					roundScore++;
					winSound.play();
				} else {
					$('#result').text('Computer Wins');
					computerScore++;
					roundScore++;
				}
			}

			console.log(playerScore);
			$('#playerScore').text(" " + userName + ":" + " " + playerScore);
			$('#computerScore').text(computerScore);	
			$('#tieScore').text(tieScore);
			$('#roundScore').text(roundScore);

			
			if (roundScore === 10) {
				if (playerScore > computerScore) {
					backgroundMusic.pause();
					winGame.play();
					$('#play').hide();
					$('#winGame').fadeIn(500);
					$('#winResult').text('Congratulations you are the winner!');
					$('#winScore').text(userName + ": " + playerScore + " " + "CPU: " + " " + computerScore + " " + "TIE: " + tieScore)				
					$('#btnPlayAgainWin').click(function(){
						playerScore = 0;
						computerScore = 0;
						tieScore = 0;
						roundScore = 0;
						$('#playerScore').text(" " + userName + ":" + " " + 0);
						$('#computerScore').text(0);	
						$('#tieScore').text(0);
						$('#roundScore').text(0);
						$('#winGame').hide();
						$('#play').fadeIn(500);						
						
					});
									
				} else {
					backgroundMusic.pause();
					gameOver.play();
					$('#play').hide();
					$('#lostGame').fadeIn(500);
					$('#lostResult').text('You lost the game');
					$('#lostScore').text(userName + ": " + playerScore + " " + "CPU: " + " " + computerScore + " " + "TIE: " + tieScore)				
					$('#btnPlayAgainLost').click(function(){
						playerScore = 0;
						computerScore = 0;
						tieScore = 0;
						roundScore = 0;
						$('#playerScore').text(" " + userName + ":" + " " + 0);
						$('#computerScore').text(0);	
						$('#tieScore').text(0);
						$('#roundScore').text(0);
						$('#lostGame').hide();
						$('#play').fadeIn(500);						
						
					});
				}
			}

		};
			
			var rock = '<i class="fa fa-hand-rock-o" style="font-size: 100px" aria-hidden="true"></i>';
			var paper = '<i class="fa fa-hand-paper-o" style="font-size: 100px" aria-hidden="true"></i>';
			var scissors = '<i class="fa fa-hand-scissors-o" style="font-size: 100px" aria-hidden="true"></i>';			
			
			$('.btnResetGame').click(function(){
				location.reload();
			});

			$("button").click(function() {
				var userChoice;
	    		 userChoice = $(this).val();
	    		 if (userChoice === "rock") {
					$('#userChoicePannel').html(rock);
				} else if (userChoice === "paper") {
					$('#userChoicePannel').html(paper);
				} else if (userChoice === "scissors") {
					$('#userChoicePannel').html(scissors);
				} else {
					alert('Please choose only Rock | Paper | Scissors');
				}

				var cpuChoice = Math.random();
				if (cpuChoice < 0.33) {
					cpuChoice = "rock";
					$('#cpuChoicePannel').html(rock);
				} else if (cpuChoice > 0.34 && cpuChoice < 0.66) {
					cpuChoice = "paper";
					$('#cpuChoicePannel').html(paper);
				} else {
					cpuChoice = "scissors";
					$('#cpuChoicePannel').html(scissors);
				}
				
				compare(userChoice, cpuChoice);	

			});
		
	};
	
});