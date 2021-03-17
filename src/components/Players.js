import React from "react";

// eslint-disable-next-line react/prop-types
const Players = ({ players }) => (
  <div className="players">
    {
      // eslint-disable-next-line react/prop-types
      players.map(player => (
        <div key={player.number} className="player">
          <p>{player.name}</p>
          {
            player.pawn ? (
              <img
              className="player-pawn"
              alt={player.pawn}
              src={`./images/${player.pawn}-pawn.png`}/>
              ) : null
          }

          <p className="player-score">{player.score}</p>
        </div>
      ))
    }
  </div>
);

export default Players;