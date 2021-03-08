import React, {Component} from "react";
import Players from "../components/Players"

class PlayerSelect extends Component {
  state = {
    pawns: ["angular", "js", "react", "vue"],
    currentPlayerSelect: 1,
    players: [],
    readyToStart: false,
  };

  setPlayer = (pawn) => {

    if (this.state.players.find(player => player.pawn === pawn)) {
      alert("No");

    } else {
      this.setState((prevState) => ({
        currentPlayerSelect: prevState.currentPlayerSelect + 1,
        players: [
          ...prevState.players, {
            number: prevState.currentPlayerSelect,
            pawn
          }
        ],
        readyToStart: prevState.currentPlayerSelect === 2 ? true : false
      }));
    }

  }

  startGame = () => {
    // eslint-disable-next-line react/prop-types
    this.props.startGame(this.state.players);
  }

  render() {
    return (
      <div>
        <Players players={this.state.players}/>
        {
          this.state.readyToStart ?
            <React.Fragment>
              <h1>Click start to begin!</h1>
              <button onClick={this.startGame} className="button">Start</button>
            </React.Fragment> :
            <React.Fragment><
              h1>Player {this.state.currentPlayerSelect}, select a pawn:</h1>
              {
                this.state.pawns.map(pawn => (
                  <div className="pawn-container" key={pawn} onClick={() => this.setPlayer(pawn)}>
                    <img
                      className="pawn"
                      alt={pawn}
                      src={`./images/${pawn}-pawn.png`}/>
                    <img
                      className="pawn-logo"
                      alt={pawn}
                      src={`./images/${pawn}.png`}/>
                  </div>
                ))
              }
            </React.Fragment>
        }

      </div>
    );
  }
}

export default PlayerSelect;