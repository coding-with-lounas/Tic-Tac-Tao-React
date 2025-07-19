 import { useState } from 'react';

 
 
function Square({value , onSquareClick}) {
  // const [value, setValue] = useState(null);

  // function handleClick() {
  //     setValue('x');
  // }


  return (
  <>
          <button className="square" onClick={onSquareClick}>{value}</button>

  </>
  );
}

export default function board() {
  const [squares, setSquares ] = useState(Array(9).fill(null));
  
  function handleClick(i){ 
     const squaredNext =squares.slice();
     squaredNext[i]='X';
     setSquares(squaredNext);
   }

  return (
 <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick(0)} />
        <Square value={squares[1]}/>
        <Square value={squares[2]}/>

      </div>

      <div className="board-row">
        <Square value={squares[3]}/>
        <Square value={squares[4]}/>
        <Square  value={squares[5]}/>
      </div>

      <div className="board-row">
        <Square  value={squares[6]}/>
        <Square  value={squares[7]}/>
        <Square value={squares[8]}/>
      </div>
    </>
  );
}