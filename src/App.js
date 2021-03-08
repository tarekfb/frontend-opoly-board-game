import './App.css';
import React, {Component} from "react";
import PlayerSelect from "./containers/PlayerSelect";
import Players from "./components/Players";
import GameBoard from "./containers/GameBoard";

class App extends Component {
  state = {
    players: [],
    gameStarted: false,
    currentPlayer: 1,
  };

  startGame = (players) => {
    this.setState({
      players: players.map(player => ({
        ...player,
        location: 0,
        score: 0
      })),
      gameStarted: true
    });
    console.log(players);
  }

  movePlayer = (number, squares) => {
    this.setState((prevState) => ({
      players: prevState.players.map(player => {
        if (player.number === this.state.currentPlayer) {
          const location = player.location + number;
          const landingSquare = squares[location % squares.length];
          let increaseScore = 0;

          if (landingSquare.type === player.pawn) {
            increaseScore = 2;
          } else {
            increaseScore = -1;
          }

          player = {
            ...player,
            location: player.location + number,
            score: Math.max(0, player.score + increaseScore)
          }
        }
        return player;
      }),
      currentPlayer: prevState.currentPlayer === 1 ? 2 : 1
    }));
  }


  render() {
    return (
      <div className="App">
          <Players players={this.state.players} />
        {
          //logic, game phase 1 started? phase 2 started? phase 3 started? etc. just like below but phase instead of y/n
          this.state.gameStarted ?
            <GameBoard
              movePlayer = {this.movePlayer}
              currentPlayer = {this.state.currentPlayer}
              players = {this.state.players} /> :
            <PlayerSelect startGame={this.startGame} />
        }
      </div>
    )
  }
}

export default App;
