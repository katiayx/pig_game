/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying //state varible;

init();

//add eventlisten to rolldice button
//eventlisten takes action, and callback function
//anon function doesn't have a name, and can't only be used in one place
document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		//1. generage random number
		var dice = Math.floor(Math.random() * 6) + 1;
		//2. display result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';
		//3. update round score only IF rolled number 
		if (dice !== 1) {
			//add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
	}	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//add current score to global score
		scores[activePlayer] += roundScore;

		//update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//check if player won the game
		if (scores[activePlayer] >= 20) {
			//display you win!
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!'

			//better to manuipluate cls - made in css, rather than direct css 
			document.querySelector('.player-' + activePlayer+ '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer+ '-panel').classList.remove('active');
			document.querySelector('.dice').style.display = 'none';
			gamePlaying = false;
		} else {
			//change player
			nextPlayer();
		}
	}
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

	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0; //0 is 1st player, 1 is 2nd player, same as in HTM
	gamePlaying = true;
	
	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
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












