import React from 'react';
import Home from './components/Home';
import NoteList from './components/NotesList';
import NoteDetails from './components/NoteDetails';

const routes = [
  {
    path: '', // optional
    action: () => <Home />,
  },
  {
    path: '/notes',
    action: () => console.log('checking child routes for /posts'),
    children: [
      {
        path: '', // optional, matches both "/posts" and "/posts/"
        action: () => <NoteList />,
      },
      {
        path: '/:id',
        action: (context) => <NoteDetails {...context.params} />,
      },
    ],
  },
];

export default routes;
