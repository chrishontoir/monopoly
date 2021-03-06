import React from 'react';

const Winner = ({winner}) => {

  // Displays the name of the winner.
  if (winner !== null){
    var winnerBox = <div className="winner-name">Winner: {winner}</div>
  }
  return(
    <div className = "winner">
      {winnerBox}
    </div>
  )
}

export default Winner;
