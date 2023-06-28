import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Button, Checkbox, Form, Input, message } from 'antd';
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
export default function Login() {
    const history = useHistory()
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const notification = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    };

    const handleLogin = async (values) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(values?.email, values?.password);
            // notification("success", "Logged in successfully!")
            // history.push("/")

        } catch (error) {
            notification("error", "Login failed! Please check your Email and Password!")
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    //login với google
    const handleGoogleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithRedirect(provider);
            console.log('Đăng nhập thành công bằng tài khoản Google!');
        } catch (error) {
            console.log(error.message);
        }
    };

    //login với facebook
    const handleFacebookLogin = async () => {
        try {
            const provider = new firebase.auth.FacebookAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            console.log('Đăng nhập thành công bằng tài khoản Facebook!');
        } catch (error) {
            console.log(error.message);
        }
    };

    const firebaseConfig = {
        apiKey: "AIzaSyD0oIT41ohfR7qigkqrAWaAYe3Tz0y5D-A",
        authDomain: "spck-login.firebaseapp.com",
        projectId: "spck-login",
        storageBucket: "spck-login.appspot.com",
        messagingSenderId: "1049609373762",
        appId: "1:1049609373762:web:ff5c79ce147950654745db",
        measurementId: "G-95N7JE8G8W"
    };
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                {contextHolder}
                <Form name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        width: '60%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleLogin}
                    onFinishFailed={onFinishFailed}
                    form={form}
                    autoComplete="off">
                    <Form.Item
                        style={{ width: '100%' }}
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
                        style={{ width: '100%' }}

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
                        style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}

                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }} >
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                            <Button htmlType="button" onClick={onReset} style={{ marginLeft: 10 }}>
                                Reset
                            </Button>
                        </div>
                        <Button type="primary" style={{ marginTop: 10 }} onClick={() => history.push("/register")}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ width: '35%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Or log in with: </span>
                    <Button icon={<GoogleOutlined />} onClick={handleGoogleLogin}>Google</Button>
                    <Button icon={<FacebookOutlined />} onClick={handleFacebookLogin}>Facebook</Button>
                </div>
                {/* <StyledFirebaseAuth
                onClick={handleGoogleLogin}
            /> */}
            </div>
        </div>

    )
}
