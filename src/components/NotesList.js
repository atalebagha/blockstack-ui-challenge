import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  DataTable,
  Text,
  Anchor,
} from 'grommet';
import S from 'sanctuary';

import {useStateValue} from '../StoreContext';
import {browserHistory as history} from '../index';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
          .replace(/[xy]/g,
                   (c) => {
                     const r = Math.random() * 16 | 0;
                     const v = c === 'x' ? r : (r && 0x3 | 0x8);
                     return v.toString(16);
                   });
}

const NotesList = props => {
  const [{ notes }, dispatch] = useStateValue();
  const [disabled, disableBtn] = useState (false)

const createNote = async (e) => {
  disableBtn(S.K (true))
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

  try {
    // const username = S.maybe ('') (S.prop ('username')) (props.user);
    const finalNotes = S.append (params) (notes);
    await props.userSession.putFile('notes.json', JSON.stringify(finalNotes), { encrypt: false });
    dispatch ({ type: 'LOAD_NOTES', payload: finalNotes });
    disableBtn(S.K (false))
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
          return final;
        } catch (err) {
          console.error (err);
        }
      }
      getNotes ().then (payload => dispatch ({ type: 'LOAD_NOTES', payload }));
    }
  }); // eslint-disable-line
  return (
    <Box>
      <Button onClick={createNote} disable={disabled} secondary label='Create Note' />
      <DataTable
        columns={[
          {
            property: 'id',
            header: <Text>ID</Text>,
            primary: true,
            render: d => <Anchor onClick={() => history.push ('/notes/' + d.id)}>{d.id}</Anchor>
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

export default NotesList;
