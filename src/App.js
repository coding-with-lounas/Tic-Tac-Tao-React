 import { useState } from 'react';

 
 
function Square({value , onSquareClick}) {
  // const [value, setValue] = useState(null);

  // function handleClick() {
  //     setValue('x');
  // }    status = "Next player: " + (xIsNext ? "X" : "O");
  return (
  <>
          <button className="square" onClick={onSquareClick}>{value}</button>

  </>
  );
}

 function Board({xIsNext,squares,onPlay}) {

  // const [xIsNext,setXIsNext]=useState(true);
  // const [squares, setSquares ] = useState(Array(9).fill(null));
  
  function handleClick(i){  
   
    if (squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares =squares.slice();
     if (xIsNext){
     nextSquares[i]='X';
    }else{
      nextSquares[i]='O';
    }
    //  setSquares(nextsquares);
    //  setXIsNext(!xIsNext);
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status='winner :'+winner;
  } else {
    status='The next player is :'+ (xIsNext ? 'X' : 'O');
  }

  return (
 <>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
         {/* why don't use `onSquareClick={handleClick(0)}` it's run when we renderring the compenent because 
         you're not passing function u're passing result of function */}    
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i= 0; i < lines.length; i++) {
  const [a,b,c] = lines[i];
  if(squares[a] && squares[a]== squares[b] && squares[b]==squares[c]){
    return squares[a];
  }
  }
  return null;

}
export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove,setCurrentMove]=useState(0);
  const [history, setHistory] = useState([Array(9).fill(null)]); // history is array embedded array like [[]]
  const currentSquares = history[currentMove];

  // const currentSquare =history[history.length - 1];
// because the history.length give u length of history array and array in js start with index 0

  function handlePlay(nextSquares){
    //  setHistory([...history,nextSquare]);
    //  setXIsNext(!xIsNext);
    const nextHistory= [...history.slice(0,currentMove+1),nextsquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }
 const moves =history.map((squares,move)=>{
  let description ;
  if(move>0){
    description= 'go to move #'+ move ;
  }else{
    description= 'Go to game start';
  } 
  
  return(
    <li key={move} >
    <button onClick={()=>jumpTo(move)}>{description}</button>
    </li>
  );
});

  return (
    <>
      <div className='game'>
        <div className='game-board'>
          <Board xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay} />
        </div>
        <div className='game-info'>
         <ol> 
          {moves}
          </ol>
        </div>
      </div>
    </>
  );
} 