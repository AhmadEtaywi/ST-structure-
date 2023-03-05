import { lazy } from 'react';

const Albums = lazy(() => import('../views/albums/albums.router'));
const Posts = lazy(() => import('../views/posts/posts.router'))
export const MainRouter = [
  {
    path: '/albums/*',
    name: 'albums',
    component: Albums,
  },
  {
    path : '/posts/*',
    name : 'posts',
    component : Posts,
  },
];
