import * as R from 'ramda';

const notesLens = R.lensProp ('notes');
const updateNotes = R.set (notesLens);

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_NOTES':
      return updateNotes (action.payload) (state)  
    default:
      return state;
  }
}

export default reducer;