/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


- looses his Entire score when he rolls two 6 in a row, after that, it's the next player's turn (need to save previous dice roll in a separate variable)

done - Add an input field to the HTML where players can set the winning score. Read value with .value 

done - Add another dice to the game, if one dice is 1, player looses his current score

*/
"use strict;"


var scores, roundScores, activePlayer, winningScore, gamePlaying; //state varible;

init();

var lastDice1, lastDice2;


//add eventlisten to roll-dice button
//eventlisten takes action, and callback function
//anon function doesn't have a name, and can't only be used in one place
document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
	
		//generage 2 random number -- working!!!
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		console.log("dice1: " + dice1);
		console.log("dice2: " + dice2);
		
		//display result -- working!!!
		var diceDOM1 = document.querySelector('.dice1');
		var diceDOM2 = document.querySelector('.dice2');
		diceDOM1.style.display = 'block';
		diceDOM2.style.display = 'block';
		diceDOM1.src = 'dice-' + dice1 + '.png';
		diceDOM2.src = 'dice-' + dice2 + '.png';
		
		//update round score only IF both dice rolled number > 1 -- working!!!
		if (dice1 !== 1 && dice2 !== 1) {
			//add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else if ((dice1 === 6 && lastDice1 === 6) || (dice1 == 6 && lastDice2 == 6)) {
			alert('You just rolled two 6\'s in a roll, now it\'s the other player\'s turn.');
			nextPlayer();
		} else if ((dice2 === 6 && lastDice2 === 6) || (dice2 == 6 && lastDice1 == 6)) {
			alert('You just rolled two 6\'s in a roll, now it\'s the other player\'s turn.');
			nextPlayer();
		} else {
			nextPlayer();
		}
	}
	lastDice1 = dice1;
	lastDice2 = dice2;
});

document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) { 
		//add current score to global score
		scores[activePlayer] += roundScore;

		//update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//check if player won the game
		if (scores[activePlayer] >= winningScore) {
			console.log(winningScore);
			//display you win!
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!'

			//better to manuipluate cls - made in css, rather than direct css 
			document.querySelector('.player-' + activePlayer+ '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer+ '-panel').classList.remove('active');
			document.querySelector('.dice1').style.display = 'none';
			document.querySelector('.dice2').style.display = 'none';
			//reset input field to nothing/clear cache-only can set to equal null, which only displays placeholder
			document.getElementById('set-score').value = null;
			gamePlaying = false;
		} else {
			//change player
			nextPlayer();
		}
	}
})

document.querySelector('.btn-new').addEventListener('click', function () {
	document.getElementById('set-score').value = null;
	init();
})

function nextPlayer() {
	
	//change player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	//same as
	// if (activePlayer === 0) {
	// 		activePlayer = 1;
	// } else {
	// 		activePlayer = 0;
	// }
	
	//reset roundSore
	roundScore = 0;
	
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
		
	//toggle HTML element
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0; //0 is 1st player, 1 is 2nd player, same as in HTM
	gamePlaying = true;
	winningScore = 0;

	//initiate set-score modal
	document.querySelector('.modal').style.display = 'block';
	
	
	//start game, and grab input value - grabbing value should be part of evenlistener function, so there is an action that precedes it
	document.querySelector('.btn-start').addEventListener('click', function () {
		winningScore = document.getElementById('set-score').value;
		console.log(winningScore);
		document.querySelector('.modal').style.display = 'none';
	});
		
	//reset dice display to non
	document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
	
	//reset score board: both global and current
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	
	//reset play 1 and 2
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	
	//remove winner class, and active 
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	
	//assign active to player 1 panel
	document.querySelector('.player-0-panel').classList.add('active');
	
	
	
}




/*
//change content of HMTL element
//textContent can only set plain text, no HTML
document.querySelector('#current-' + activePlayer).textContent = dice;
//type coersion converts activePlayer to string, and when added to current prefix, becomes actual #id.


//html content change, use innerHTML
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
*/












