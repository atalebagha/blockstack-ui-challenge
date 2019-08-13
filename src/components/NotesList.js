import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  DataTable,
  Text
} from 'grommet';
import S from 'sanctuary';

import {useStateValue} from '../StoreContext';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
          .replace(/[xy]/g,
                   (c) => {
                     const r = Math.random() * 16 | 0;
                     const v = c === 'x' ? r : (r & 0x3 | 0x8);
                     return v.toString(16);
                   });
}

const NoteList = props => {
  const [{ notes }, dispatch] = useStateValue();

const createNote = async (e) => {
  e.preventDefault();
  const id = generateUUID();
  const createdAt = new Date ().toISOString ();

  // for posts.json
  const params = {
    id,
    createdAt,
    title: '',
    note: '',
  }

  console.log ([params]);

  try {
    const username = S.maybe ('') (S.prop ('username')) (props.user);
    const finalNotes = notes ? notes : [];
    const updatedNotes = await props.userSession.putFile('notes.json', JSON.stringify([...finalNotes, params]), { username });
    console.log (updatedNotes);
    dispatch ({ type: 'LOAD_NOTES', payload: [...finalNotes, params] });
  } catch (e) {
    console.error(e)
  }
}
  useEffect(() => {
    if (!notes) {
      async function getNotes() {
        try {
          const username = S.maybe ('') (S.prop ('username')) (props.user);
          const notesJson = await props.userSession.getFile ('notes.json', { username });
          const final = JSON.parse (notesJson);
          dispatch ({ type: 'LOAD_NOTES', payload: final });
        } catch (err) {
          console.error (err);
        }
      }
      getNotes ();
    }
  }, [notes]); // eslint-disable-line
  console.log (notes);
  return (
    <Box>
      <Button onClick={createNote} secondary label='Create Note' />
      <DataTable
        columns={[
          {
            property: 'id',
            header: <Text>ID</Text>,
            primary: true,
          },
          {
            property: 'title',
            header: <Text>Title</Text>, 
          },
          {
            property: 'createdAt',
            header: <Text>Date</Text>,
            render: d => new Date (d.createdAt).toLocaleDateString ()
          }
        ]}
        data={notes}
      />
    </Box>
  )
};

export default NoteList;
