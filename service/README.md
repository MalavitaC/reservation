## 项目简介

本项目使用workspace结构，分为service和web两部分。由于时间关系，目前只完成了service的开发，web部分还在开发中。

### service介绍

#### 技术栈

- Nest.js
- Prisma.js
- Graphql
- MongoDB

API设计分别有 Restful 和 Graphql 两种方式。用户模块采用 Restful，预约模块采用 Graphql。

#### 用户模块

- 用户登录
- 获取用户信息
- 权限控制

用户登录态采用 JWT 方案实现。权限控制采用RBAC模型，默认有Gest、Employees两种角色。

#### 预约模块

- 预约的增删改查
- 增删改查操作的权限控制

Employees用户可以查看/修改系统中所有预约记录，修改所有预约记录状态。

Gest用户只能查看/修改自己的预约记录。

#### 链路追踪

使用ALS方案实现，可以在`controller`层、`service`层和其他模块中获取到trackID，避免参数传递污染。

#### 自定义日志

使用winston封装了自定义的日志模块。日志结构为Json，包含了trackID

#### 接口访问日志

使用Nest的异常拦截器实现，打印请求开始与结束日志，包含trackID，响应时间

#### 全局错误捕获

使用Nest的异常过滤器实现。打印错误日志，统一报错响应结构

## 启动步骤

### 启动service

#### 安装依赖

`cd service && npm install`

#### 添加环境配置

复制`.env.example`文件，新增`.env`文件

配置运行环境、数据库连接、JWT秘钥等

#### 启动

`npm run start`

