import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormField,
  TextInput,
  TextArea,
} from 'grommet';
import S from 'sanctuary';
import * as R from 'ramda';

import {useStateValue} from '../StoreContext';
import {browserHistory as history} from '../index';

const useDebounce = value => delay => {
  const [debouncedValue, setDebouncedValue] = useState (value); // eslint-disable-line
  useEffect ( // eslint-disable-line
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value] // eslint-disable-line
  );

  return debouncedValue;
}


const NoteDetails = props => {
  const [{ notes }, dispatch] = useStateValue ();
  const [note, setNote] = useState (S.Nothing);
  const debouncedNote= useDebounce (note) (1000);

  // on-mount set note to state
  useEffect (() => {
    if (notes) {
      const thisNote = S.find (n => n.id === props.id) (notes);
      setNote (thisNote);
      const payload =
        S.map (n => n.id === props.id ? S.fromMaybe ({}) (thisNote): n) (notes);
      dispatch ({ type: 'LOAD_NOTES', payload })
    }
  }, []); // eslint-disable-line

  const edit = async (note) => {
    if (S.isJust (note)) {
      const isJustNote = n => S.map (ns => n.id === ns.id ? n : ns) (notes);
      
      const updatedNotes = S.maybe (notes) (isJustNote) (note);
      await props.userSession.putFile ('notes.json', JSON.stringify (updatedNotes), { encrypt: false });
      return updatedNotes;
    } else {
      return notes;
    }
  }
  // on change update data in realtime
  useEffect (() => {
    edit (debouncedNote).then (payload => dispatch ({ type: 'LOAD_NOTES', payload }))
  }, [debouncedNote]) // eslint-disable-line
  
  const onChange = evt => {
    evt.persist ();
    const name = evt.target.name;
    const value = evt.target.value;
    const newNote = S.map (R.evolve ({ [name]: S.K (value) })) (note);
    setNote (newNote);
  }
  
  return (
    <Box>
      {S.isJust (note) ?
        <React.Fragment>
          <FormField label="title">
            <TextInput
              name='title'
              placeholder="Enter Title..."
              value={S.maybe ('') (S.prop ('title')) (note)}
              onChange={onChange}
            />
          </FormField>
          <FormField label="title">
            <TextArea
              name='note'
              placeholder="Enter Note..." 
              value={S.maybe ('') (S.prop ('note')) (note)}
              onChange={onChange}
            />
          </FormField>
        </React.Fragment> :
        <React.Fragment />}
      <Button onClick={() => history.push ('/notes')} secondary label='Back' />
    </Box>
  )
};

export default NoteDetails;
