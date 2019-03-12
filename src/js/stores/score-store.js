import _ from 'lodash';
import AppConstants from '../constants/app-constants';
import BoardStore from './board-store';
import EventEmitter from '../modules/event-emitter';

const { events } = AppConstants;

let points = 0;
let linesCleared = 0;

const ScoreStore = _.extend(
  {
    getPoints() {
      return points;
    },

    getLinesCleared() {
      return linesCleared;
    },

    addPoints(additional) {
      points += additional;
      this.emitChange();
    }
  },
  EventEmitter
);

BoardStore.on(events.LINE_CLEARED, additionalLines => {
  linesCleared += additionalLines;

  var points
  switch(additionalLines) {
    case 4:
      points = 1200
      break;
    case 3:
      points = 300
      break;
    case 2:
      points = 100
      break;
    default:
      points = 40
  }
  ScoreStore.addPoints(points)

});

export default ScoreStore;
