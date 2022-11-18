import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/welcome',
      name: 'Welcome',
      component: () => import('views/Welcome.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('views/Login.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('views/Home.vue'),

      beforeEnter: (to, form) => {
        const token = localStorage.getItem('token');
        if (token || form.fullPath === '/login') {
          return true;
        } else {
          return '/login';
        }
      },

      children: [
        {
          path: '',
          name: 'empty',
          redirect: '/home/dish',
        },
        {
          path: 'dish',
          name: 'Dish',
          component: () => import('@/views/Dish.vue'),
        },
        {
          path: 'category',
          name: 'Category',
          component: () => import('@/views/Category.vue'),
        },
        {
          path: 'order',
          name: 'Order',
          component: () => import('views/Order.vue'),
        },
        {
          path: 'order',
          name: 'Order',
          component: () => import('views/Order.vue'),
        },
        {
          path: 'staff',
          name: 'Staff',
          component: () => import('views/Staff.vue'),
        },
        {
          path: 'appraise',
          name: 'Appraise',
          component: () => import('views/Appraise.vue'),
        },
        {
          path: 'chat',
          name: 'Chat',
          component: () => import('views/Chat.vue'),
        },
      ],
    },
  ],
});

export default router;
