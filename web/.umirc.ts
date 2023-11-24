import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  proxy: {
    '/api': {
      'target': 'http://localhost:3000',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
    '/graphql': {
      'target': 'http://localhost:3000',
      'changeOrigin': true,
      'pathRewrite': { '^/graphql' : '' },
    },
  },
  layout: {
    title: '@umijs/max',
  },
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
    },
    {
      name: '预约 CURD',
      path: '/reservation',
      component: './Reservation',
    },
  ],
  npmClient: 'npm'
});

