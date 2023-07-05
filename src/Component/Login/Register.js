import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Button, Checkbox, Form, Input, Space, notification, Col, Row } from 'antd';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
export default function Register() {
    const history = useHistory()
    const [api, contextHolder] = notification.useNotification();

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSignup = async (value) => {
        console.log("🤔🤔🤔 ~ file: Register.js:18 ~ handleSignup ~ value:", value)
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        // const phoneRegex = /^\d{9}$/;
        openNotification('top')
        if (!emailRegex.test(value?.email)) {
            alert("Please enter a valid email address")
            // return false;
            // openNotification('top')
        }
        // else if (!phoneRegex.test(value?.phoneNumber)) {
        //     alert("Please enter a valid phone number")
        //     return false;
        // } 
        else if (value?.password.length < 6) {
            alert("Please enter a password of 6 characters or more")
            return false;
        }
        else if (value?.confirmPassword !== value?.password) {
            alert("Passwords do not match")
            return false;
        } else {
            try {
                const result = await firebase.auth().createUserWithEmailAndPassword(value?.email, value?.password);

                // Cập nhật thông tin người dùng với tên đăng nhập
                await result.user.updateProfile({
                    displayName: value?.username,
                    // photoURL
                });
                history.push('/');
                console.log('Đăng ký thành công!');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const openNotification = (placement) => {
        notification.info({
            message: `Notification ${placement}`,
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            placement,
        });
    };

    return (
        <>
            {contextHolder}
            <Row style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap', padding: 20 }}>
                    <Form name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 'none',
                            width: '100%'
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
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[
                                {
                                    message: 'Please input your Phone Number!',
                                },
                            ]}>
                            <Space style={{ width: '100%' }} direction="vertical" size="middle">
                                <Space.Compact style={{ width: '100%' }}>
                                    <Input disabled style={{ width: '20%' }} defaultValue="+84" />
                                    <Input type="number" pattern="[0-9]*" style={{ width: '100%' }} />
                                </Space.Compact>
                            </Space>
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
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Confirm your password!',
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
                                offset: 6,
                            }} >
                            <Button type="primary" onClick={() => history.push("/login")}>
                                Login
                            </Button>
                            <Button type="primary" style={{ marginLeft: 10 }} htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}
