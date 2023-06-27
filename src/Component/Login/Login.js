import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Button, Checkbox, Form, Input } from 'antd';
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
export default function Login() {
    const history = useHistory()

    const handleLogin = async (values) => {

        try {
            await firebase.auth().signInWithEmailAndPassword(values?.email, values?.password);
            console.log('Đăng nhập thành công!');
        } catch (error) {
            alert(error.message);
        }
    };


    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const uiConfig = {
        signInFlow: 'redirect',
        signInSuccessUrl: '/home',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
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
                onFinish={handleLogin}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
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
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={() => history.push("/register")}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    )
}
