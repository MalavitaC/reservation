import React from 'react';
import { Button, Form, Input } from 'antd';
import AuthController from '@/services/auth/AuthController';
import { useNavigate } from '@umijs/max';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function LoginPage (){

  const navigate = useNavigate();

  const onFinish = async (values: any) => {
  
    const { access_token } = await AuthController.login({
      account: values.username,
      password: values.password
    });
    if(access_token) localStorage.setItem('token', access_token)
  
    console.log('Success:', access_token);
    navigate("/reservation", { replace: true });
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <GetList /> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
 
};

export default LoginPage;