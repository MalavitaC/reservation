// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/","redirect":"/login","parentId":"@@/global-layout","id":"1"},"2":{"name":"登录","path":"/login","parentId":"@@/global-layout","id":"2"},"3":{"name":"预约 CURD","path":"/reservation","parentId":"@@/global-layout","id":"3"},"@@/global-layout":{"id":"@@/global-layout","path":"/","parentId":"ant-design-pro-layout","isLayout":true},"ant-design-pro-layout":{"id":"ant-design-pro-layout","path":"/","isLayout":true}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import( './EmptyRoute')),
'2': React.lazy(() => import(/* webpackChunkName: "p__Login__index" */'@/pages/Login/index.tsx')),
'3': React.lazy(() => import(/* webpackChunkName: "p__Reservation__index" */'@/pages/Reservation/index.tsx')),
'@@/global-layout': React.lazy(() => import(/* webpackChunkName: "layouts__index" */'/Users/caim014/Documents/restaurants/web/src/layouts/index.tsx')),
'ant-design-pro-layout': React.lazy(() => import(/* webpackChunkName: "umi__plugin-layout__Layout" */'/Users/caim014/Documents/restaurants/web/src/.umi/plugin-layout/Layout.tsx')),
},
  };
}
