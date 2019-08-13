import React from 'react';
import Home from './components/Home';
import NoteList from './components/NotesList';

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
        action: (context) => <h1>Post #{context.params.id}</h1>,
      },
    ],
  },
];

export default routes;
