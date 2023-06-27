import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Button, Checkbox, Form, Input } from 'antd';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export default function Register() {
    const history = useHistory()

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSignup = async (value) => {
        try {
            const result = await firebase.auth().createUserWithEmailAndPassword(value?.email, value?.password);

            // Cập nhật thông tin người dùng với tên đăng nhập
            await result.user.updateProfile({
                displayName: value?.username
            });

            console.log('Đăng ký thành công!');
            console.log('Thông tin người dùng:', result.user.displayName);
        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <div>
            <Form name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSignup}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="User Name"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your User Name!',
                        },
                    ]} >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]} >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }} >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }} >
                    <Button type="primary" onClick={() => history.push("/login")}>
                        Login
                    </Button>
                    <Button type="primary" style={{ marginLeft: 10 }} htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
