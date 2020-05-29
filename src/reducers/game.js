import AsyncStorage from '@react-native-community/async-storage';
import {ActionConst} from 'react-native-router-flux';
import {knuthShuffle} from 'knuth-shuffle';

import {levels} from '../lib/settings';

const initialState = {
  started: false,
  startedAt: null,
  endedAt: null,
  won: null,
  level: levels[0],
  chips: generatechips(levels[levels.length - 1], false),
  seq: null,
  hiscore: levels.reduce((state, level) => {
    state[level] = [];
    return state;
  }, {}),
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SELECT_LEVEL':
      return {...game.stop(state, action), level: action.payload};

    case 'TOGGLE_GAME':
      return state.started
        ? game.stop(state, action)
        : game.start(state, action);
    case 'LOAD_SCORE':
      return {...state, hiscore: action.payload};
    case 'STOP_GAME':
    case ActionConst.FOCUS:
      return game.stop(state, action);

    case 'PICK_chip':
      let chip = state.chips[action.id];

      if (chip.number !== state.seq) {
        return game.invalidchip(state, action, chip);
      }

      if (chip.number === 1) {
        return game.firstchip(state, action, chip);
      }

      if (chip.number === state.level) {
        return game.win(state, action, chip);
      }

      if (chip.number === state.seq) {
        return game.validchip(state, action, chip);
      }
  }

  return state;
}

function generatechips(n, random = true) {
  let chips = [];
  let i;

  for (i = 0; i < 25; i++) {
    const number = i < n ? i + 1 : null;
    chips.push({id: i, number: number, status: 'disabled'});
  }

  if (random) {
    chips = knuthShuffle(chips);

    // re-index after random sorting
    for (i = 0; i < 25; i++) {
      chips[i].id = i;
    }
  }
  return chips;
}

const game = {
  start: (state, action) => {
    const chips = generatechips(state.level, true);

    chips
      .filter(chip => chip.number !== null)
      .map(chip => {
        chip.status = 'disabled';
        return chip;
      });

    chips
      .filter(chip => chip.number == null)
      .map(chip => {
        chip.status = 'idle';
        return chip;
      });

    chips.find(chip => chip.number === 1).status = 'highlighted';
    return {
      ...state,
      started: true,
      startedAt: action.now,
      endedAt: null,
      won: null,
      chips: chips,
      seq: 1,
    };
  },

  stop: (state, action) => {
    return {
      ...state,
      started: false,
      startedAt: null,
      endedAt: null,
      won: null,
      chips: generatechips(levels[levels.length - 1], false),
      seq: null,
    };
  },

  firstchip: (state, action, chip) => {
    return {
      ...state,
      chips: state.chips.map(chip => {
        if (chip.number === 1) {
          chip.status = 'valid';
        } else if (chip.number !== null) {
          chip.status = 'hidden';
        }
        return chip;
      }),
      seq: state.seq + 1,
    };
  },

  win: (state, action, chip) => {
    chip.status = 'valid';

    const item = {date: action.now, result: action.now - state.startedAt};
    const hiscore = state.hiscore;
    hiscore[state.level] = hiscore[state.level].concat(item).sort((a, b) => {
      return b.date - a.date;
    });
    AsyncStorage.setItem('@Sequent:hiscore', JSON.stringify(hiscore));

    return {
      ...state,
      started: false,
      endedAt: action.now,
      won: true,
      chips: [
        ...state.chips.slice(0, action.id),
        chip,
        ...state.chips.slice(action.id + 1),
      ],
      seq: null,
      hiscore: hiscore,
    };
  },

  validchip: (state, action, chip) => {
    chip.status = 'valid';

    return {
      ...state,
      chips: [
        ...state.chips.slice(0, action.id),
        chip,
        ...state.chips.slice(action.id + 1),
      ],
      seq: state.seq + 1,
    };
  },

  invalidchip: (state, action, chip) => {
    chip.status = 'invalid';
    let chips = [
      ...state.chips.slice(0, action.id),
      chip,
      ...state.chips.slice(action.id + 1),
    ];

    chips = chips.map(chip => {
      if (chip.status === 'hidden') {
        chip.status = 'disabled';
      }
      return chip;
    });

    return {
      ...state,
      started: false,
      endedAt: action.now,
      won: false,
      chips: chips,
      seq: null,
    };
  },
};
