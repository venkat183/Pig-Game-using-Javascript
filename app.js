/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore,activeplayer,isGameActive,lastRollValue;
init();

document.querySelector('.btn-roll').addEventListener('click',function(){
        if(isGameActive){
            var dice1 = Math.floor(Math.random()*6)+1;
            var dice2 = Math.floor(Math.random()*6)+1;
            document.getElementById('dice-1').style.display='block';
            document.getElementById('dice-2').style.display='block';
            
            document.getElementById('dice-1').src='dice-'+dice1+'.png';
            document.getElementById('dice-2').src='dice-'+dice2+'.png';
            
            if(dice1 != 1 && dice2 !=1){
                roundScore += dice1+dice2;
                document.getElementById('current-'+activeplayer).textContent = roundScore;
            }
            else{
                updateScoresAndChangeActiveUser();
            }
        }
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(isGameActive){
        var winningScore;
        scores[activeplayer] += roundScore;
        document.getElementById('score-'+activeplayer).textContent=scores[activeplayer];
        var value = document.getElementById('input-value').value;
        if(value) winningScore = value;
        else winningScore = 25;

        if(scores[activeplayer] >=winningScore){
            hideDice();
            document.getElementById('name-'+activeplayer).textContent = 'WINNER Yay!!';
            document.querySelector('.player-'+activeplayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active');
            isGameActive = false;
        }
        else{
        updateScoresAndChangeActiveUser();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click',init);

function updateScoresAndChangeActiveUser(){
         roundScore = 0;
        (activeplayer===0)?activeplayer=1:activeplayer=0;
        document.getElementById('current-0').textContent = roundScore;
        document.getElementById('current-1').textContent = roundScore;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        hideDice();
}


function init(){
    scores=[0,0];
    roundScore =0;
    activeplayer=0;
    lastRollValue = 0;
    isGameActive = true;
    hideDice();
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('name-0').textContent='PLAYER 1';
    document.getElementById('name-1').textContent='PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function hideDice(){
    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';
}



