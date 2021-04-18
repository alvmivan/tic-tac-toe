:- module(proylcc,
	[  
		put/4,
		gameStatus/2
	]).

:-use_module(library(lists)).


%used like a constant

scisorsOptions([
	[1,2],
	[1,0],
	[3,0],
	[3,6],
	[5,2],
	[5,8],
	[7,6],
	[7,8],
]).

indices([0,1,2,3,4,5,6,7,8]).

emptyBoard(["-","-","-","-","-","-","-","-","-"]).

getWinLines([
    	[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
  	]).

flip("X","O").
flip("O","X").


%count(List,Element,Count)

count([],_,0).
count([Y|L],X,Count):-
    not(X=Y),
    count(L,X,Count).
count([X|L],X,Count):-
    count(L,X,SubCount),
    Count is SubCount+1.


%getAtIndex(List,Index,Element)

getAtIndex([X|_], 0, X).
getAtIndex([_|L], Index, X):-
	Index > 0,
	NewIndex is Index-1,
	getAtIndex(L,NewIndex,X).

%setAtIndex(List,Index,Element,ListOut)

setAtIndex([_|L],0,Element,[Element|L]).

setAtIndex(InputList,Index,Element, OutList):-
    Index > 0,
    InputList = [X|L],
    NewIndex is Index-1,
	setAtIndex(L,NewIndex,Element, OutSubList),
    OutList = [X|OutSubList].

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% replace(?X, +XIndex, +Y, +Xs, -XsY)
%

replace(X, 0, Y, [X|Xs], [Y|Xs]).

replace(X, XIndex, Y, [Xi|Xs], [Xi|XsY]):-
    XIndex > 0,
    XIndexS is XIndex - 1,
    replace(X, XIndexS, Y, Xs, XsY).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% put(+Player, +Position, +Board, -ResBoard)
%

put(Player, Pos, Board, ResBoard):-
	replace("-", Pos, Player, Board, ResBoard).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% gameStatus(+Board, +Status)
%

gameStatus(Board, Winner):-
	getWinLines(Lines),
  	member([C1, C2, C3], Lines),
	nth0(C1, Board, Winner),
	Winner \= "-",
	nth0(C2, Board, Winner),
	nth0(C3, Board, Winner),
	!.  

gameStatus(Board, "?"):-
	member("-", Board),
	!.

gameStatus(_Board, "T").


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% aiMovement(+Board, -BoardOut)
%
aiMovement(Board, Team, BoardOut):-
	caseOneForWin(Board, Team, BoardOut).

aiMovement(Board, Team, BoardOut):-
    caseAvoidLose(Board, Team, BoardOut).
	
aiMovement(Board, Team, BoardOut):-
    caseFirstMovement(Board,Team,BoardOut).	

aiMovement(Board, Team, BoardOut):-
    caseSecondMovement(Board,Team,BoardOut).

    




caseOneForWin(Board, Team, BoardOut):-
	oneForWin(Board, Team, Index),
	setAtIndex(Board, Index, Team, BoardOut).

caseAvoidLose(Board, Team, BoardOut):-
    not(caseOneForWin(Board, Team, _)), % check if there is not a better way to play :)
    flip(Team, EnemyTeam),
	oneForWin(Board, EnemyTeam, Index) ,
	setAtIndex(Board, Index, Team, BoardOut).

caseFirstMovement(Board, Team, BoardOut):-
    emptyBoard(Board), % validate case
    setAtIndex(Board,4,Team,BoardOut).

validateIsSecondMovement(Board, Team):-
    count(Board,"-",8),
    flip(Team, EnemyTeam),
    count(Board,EnemyTeam,1).
   

caseSecondMovement(Board, Team, BoardOut):-
	validateIsSecondMovement(Board, Team),
    %case enemy first moves at center, you need to move to a corner (0,2,6,8)
    %(ai can lose if moves on 1,3,5,7) by a scisor-like movement
	flip(Team, EnemyTeam),
	getAtIndex(Board,4,EnemyTeam),
	member(Index, [0,2,6,8]),
	setAtIndex(Board, Index, Team, BoardOut).
     
caseSecondMovement(Board, Team, BoardOut):-
	validateIsSecondMovement(Board, Team),
    %case enemy start moving somewhere but the center, ai goes to take the center
	getAtIndex(Board,4,"-"),
	setAtIndex(Board, 4, Team, BoardOut).



caseMakeFirstScissor(Board, Team, BoardOut):-
	count(Board,7,"-"), %ai has the third movement 
	getAtIndex(Board, 4, Team),
	flip(Team, EnemyTeam),
	member(EnemyIndex, [1,3,5,7]),
	getAtIndex(Board, EnemyIndex, EnemyTeam).
	scisorsOptions(Options),
	member([EnemyIndex,Index], Options),
	setAtIndex(Board, Index, Team, BoardOut).


     





oneForWin(Board, Team, Index):-
	getWinLines(Lines),
	member([C1, C2, C3], Lines),
	nth0(C1, Board, Team),
	nth0(C2, Board, Team),
	nth0(C3, Board, "-"),
	Index = C3.

oneForWin(Board, Team, Index):-
	getWinLines(Lines),
	member([C1,C2,C3], Lines),
	nth0(C1, Board, Team),
	nth0(C2, Board, "-"),
	nth0(C3, Board, Team),
	Index = C2.

oneForWin(Board, Team, Index):-
	getWinLines(Lines),
	member([C1,C2,C3], Lines),
	nth0(C1, Board, "-"),
	nth0(C2, Board, Team),	
	nth0(C3, Board, Team),
	Index = C1.


	



