# ROUND

1. Lobby
    1.1 All ready ? Start in START_ROUND_DURATION (3 seconds)
2. StartRound
    2.1 Timer ran out (90 seconds) ? GOTO EndRound
3. EndRound
    3.1 Not all players have drawn 3 times each ? GOTO StartRound
    3.2 All players have drawn 3 times each ? GOTO EndGame
4. EndGame

# SCORING

## On correct guess
- First player, and player drawing gets 10 points
- Consecutive players get 10 - [playersGuessedCorrectCount] points (9, 8, 7, ...), drawing player only gets 1 point for each

## Hints
- Max number of hints avaliable is 3
- First hint reveals length of word
- Second hint reveals the first letter of the word 
- Third hint reveals the second letter of the word 
- Hints reduces points according to table below

let drawScore = firstGuess 
    ? 10 - (3 * state.hintsGiven)
    : 1;

P* = Player X
DP = Drawing Player
DPH* = Drawing Player with Hint X

    P1  P2  P3  P4  P5  DP   |   DPH1    DPH2    DPH3 
1.  10                  10   |      7       4       1    
2.       9               1   |      1       1       1  
3.           8           1   |      1       1       1   
4.               7       1   |      1       1       1  
5.                   6   1   |      1       1       1  
    10   9   8   7   6  14   |     11       8       5  

