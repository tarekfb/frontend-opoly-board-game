import React, { Component } from "react";

class GameBoard extends Component {

  state = {
    squares: [],
    grid_size: 5,
  }

  componentDidMount() {
    const squares = this.createSquares();
    this.setState({
      squares
    });
  }

  createSquares() {

    // eslint-disable-next-line react/prop-types
    const { players: [player_1, player_2] } = this.props;
    const { grid_size } = this.state;

    const squares = [{
      row: 1,
      col: 1,
      type: 'start'
    }];

    let i = 1;
    let row = 1;
    let col = 2;
    const total_squares = (grid_size * 2 + ((grid_size - 2) * 2));
    while (squares.length < total_squares) {
      const square = {
        row, col
      };

      if (i % 2 !== 0) {
        square.type = player_1.pawn;
      } else if (i % 2 === 0) {
        square.type = player_2.pawn;
      }

      // if (i % 3 === 0) {
      //   square.type = "face-off";
      // }

      squares.push(square);
      i++;

      if (i < grid_size) {
        col ++;
      } else if (i < 2 * grid_size - 1) {
        row ++;
      } else if (i < 3 * grid_size - 2) {
        col --;
      } else {
        row --;
      }
    }

    return squares;
  }

  rollDie = () => {
    const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    const index = Math.floor(dice.length * Math.random());
    const rolledNumber = dice[index];
    this.setState({
      rolledNumber: rolledNumber
    });

    // eslint-disable-next-line react/prop-types
    this.props.movePlayer(index + 1, this.state.squares);
  }



  render() {
    const { grid_size } = this.state;

    let playerLocations = [];
    if (this.state.squares.length > 0) {
      // eslint-disable-next-line react/prop-types
      playerLocations = this.props.players.map(player => (
        this.state.squares[player.location % this.state.squares.length]
      ));
    }

    return (
      <div className="game-board"
      style={{
        gridTemplate: `repeat(${grid_size}, 1fr) /repeat(${grid_size}, 1fr)`
      }}>
        {
          this.state.squares.map((square, i) => (
            <div
              style={{
                gridRow: square.row,
                gridColumn: square.col,
              }}
              key={i}
              className="game-square">
              {
                square.type !== 'start' ?
                <img src={`./images/${square.type}.png`} /> :
                'Rest due to JavaScript Fatigue'
              }
            </div>
          ))
        }
        {
          playerLocations.map((location, i) => {
            // eslint-disable-next-line react/prop-types
            const player = this.props.players[i];
            return (
            <div
              // eslint-disable-next-line react/prop-types
              key={player.number}
              style={{
                gridRow: location.row,
                gridColumn: location.col
              }}
              className="player-avatar">
              <img className="pawn" src={`./images/${
                // eslint-disable-next-line react/prop-types
                this.props.players[i].pawn
              }-pawn.png`} />
            </div>
            )
          })
        }
        <div
          className="board-middle">
          <h3>Player {this.state.currentPlayer}, roll the die!</h3>
          <h4 className="rolled-die">{this.state.rolledNumber}</h4>
          <button
            className="button"
            onClick={this.rollDie}>Roll</button>
        </div>
      </div>
    )
  }

}

export default GameBoard;