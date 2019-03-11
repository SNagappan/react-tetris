import React from 'react';
import PropTypes from 'prop-types';
// import PauseMenu from './pause-menu';
import Gameboard from './gameboard';
import ScoreStore from '../stores/score-store';
import HeldPiece from './held-piece';
import PieceQueue from './piece-queue';
import GameStore from '../stores/game-store';

function getScore() {
  return {
    points: ScoreStore.getPoints(),
    linesCleared: ScoreStore.getLinesCleared()
  };
}

export default class Tetris extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = getScore();
  }

  _updateGameState = () => {
    this.setState({ gameState: GameStore.getCurrentState() })
  }

  componentWillMount() {
    ScoreStore.addChangeListener(this._onChange);
    GameStore.addChangeListener(this._updateGameState);
  }

  componentWillUnmount() {
    ScoreStore.removeChangeListener(this._onChange);
    GameStore.removeChangeListener(this._updateGameState);
  }

  _onChange = () => {
    this.setState(getScore());
  };

  render() {
    const { points, linesCleared, gameState } = this.state;

    return this.props.children({
      HeldPiece,
      Gameboard,
      PieceQueue,
      points,
      linesCleared,
      gameState
    });
  }
}
