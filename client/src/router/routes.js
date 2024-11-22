export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/join',
    name: 'Join',
    component: () => import('@/views/Join.vue'),
  },
  {
    path: '/examples',
    name: 'Examples',
    component: () => import('@/views/Examples.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
]
