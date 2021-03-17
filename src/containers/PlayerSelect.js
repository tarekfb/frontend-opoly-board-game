import React, {Component} from "react";
import Players from "../components/Players"

class PlayerSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numberInputValue: '',
      pawns: ["angular", "js", "react", "vue"],
      currentPlayerSelect: 1,
      players: [],
      showNumberOfPlayers: true,
      showSetPlayerNames: false,
      showPlayerSelection: false,
      readyToStart: false,

    };
  }

  setNumberOfPlayers = () => {
    // Create array, add whatever is currently held in state.players
    // For every player, create the name property and assign value player_i
    let players = [...this.state.players];

    let input = this.state.numberInputValue;

    // default = 2
    if (this.state.numberingSystem <= 0)
      input = 2
    else {
      for (let i = 0; i < input; i++) {
        let playerProps = {
          name: `player_${i + 1}`,
          number: i + 1,
          nameInputValue: `player_${i + 1}`
        };
        players.splice(i, 0, playerProps);
      }
    }

    // Set nbr of players, array and show next react component
    this.setState({
      numberOfPlayers: parseInt(this.state.numberInputValue),
      players: players,
      showNumberOfPlayers: false,
      showSetPlayerNames: true
    });
  }

  setPlayerNames = () => {
    this.setState({
      showSetPlayerNames: false,
      showPlayerSelection: true
    });
  }

  setPlayer = (pawn) => {
    if (this.state.players.find(player => player.pawn === pawn))
      alert("No");
    else {
      this.setState((prevState) => ({
        currentPlayerSelect: prevState.currentPlayerSelect + 1,
        players: [
          ...prevState.players, {
            number: prevState.currentPlayerSelect,
            pawn,
          }
        ],
        showSetPlayerNames: false,
        readyToStart: prevState.currentPlayerSelect === 2 ? true : false,
      }));
    }

  }

  startGame = () => {
    // eslint-disable-next-line react/prop-types
    this.props.startGame(this.state.players);
  }

  updateNumberInputValue(evt) {
    this.setState({
      numberInputValue: evt.target.value
    });
  }

  updateNameInputValue(evt, playerNumber) {
    let players = [...this.state.players];
    let player = {...players[playerNumber - 1]};
    player.name = evt.target.value;
    player.nameInputValue = evt.target.value;
    players[playerNumber - 1] = player;
    this.setState({players: players});
  }

  render() {
    return (
      <div>
        <Players players={this.state.players}/>
        {
          this.state.showNumberOfPlayers ?
          <React.Fragment>
            <h1>How many players?</h1>
            <input
              value={this.state.numberInputValue}
              onChange={evt => this.updateNumberInputValue(evt)}
              type="text"/>
            <button
              className="button"
              onClick={this.setNumberOfPlayers}>Next</button>
          </React.Fragment> :
          null
        }
        {
          this.state.showSetPlayerNames ?
            <React.Fragment>
              <h1>Player names?</h1>
              <form>
                {
                  this.state.players.map(player => (
                    <div
                      className="name-selection-row"
                      key={player.number}>
                      <label>Name: </label>
                      <input
                        value={this.state.players[player.number - 1].nameInputValue}
                        onChange={evt => this.updateNameInputValue(evt, player.number)}
                        type="text"/>
                    </div>
                  ))
                }
              </form>
              <button
                className="button"
                onClick={this.setPlayerNames}>Next</button>
            </React.Fragment> :
            null
        }
        {
          this.state.showPlayerSelection ?
            <React.Fragment>
              {
                this.state.players.map(player => (
                  player.number === this.state.currentPlayerSelect ? <h1 key={player.number}>{player.name}, select a pawn:</h1> : null
                ))
              }
              {
                this.state.pawns.map(pawn => (
                  <div
                    className="pawn-container"
                    key={pawn}
                    onClick={() => this.setPlayer(pawn)}>
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
            </React.Fragment> :
            null
        }
        {
          this.state.readyToStart ?
            <React.Fragment>
              <h1>Click start to begin!</h1>
              <button onClick={this.startGame} className="button">Start</button>
            </React.Fragment> :
            null
        }

      </div>
    );
  }
}

export default PlayerSelect;