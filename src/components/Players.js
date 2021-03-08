import React from "react";

// eslint-disable-next-line react/prop-types
const Players = ({ players }) => (
  <div className="players">
    {
      // eslint-disable-next-line react/prop-types
      players.map(player => (
        <div key={player.number} className="player">
          <p>{player.name}</p>
          <img
            className="player-pawn"
            alt={player.pawn}
            src={`./images/${player.pawn}-pawn.png`}/>
          <p className="player-score">{player.score}</p>
        </div>
      ))
    }
  </div>
);

export default Players;