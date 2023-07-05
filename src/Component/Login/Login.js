import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { Button, Radio, Form, Input, message, Col, Row } from 'antd';
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebaseui/dist/firebaseui.css'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import gamecenter from '../../asset/image/gamecenter.png'
import search from '../../asset/image/search.png'
export default function Login({ notification, user }) {

    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const history = useHistory()
    const [form] = Form.useForm();
    const [loadings, setLoadings] = useState([]);


    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 3000);
    };


    const handleLogin = async (values) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(values?.email, values?.password);
            history.push("/")
        } catch (error) {
            console.log(error)
            notification("error", "Login failed! Please check your Email and Password!")
        }
    };

    const handleGameCenterLogin = async () => {
        try {
            const provider = new firebase.auth.GameCenterAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            history.push("/")
        } catch (error) {
            console.log(error.message);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    //login với google
    const handleGoogleLogin = async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            history.push("/")
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Row style={{ height: screenHeight - 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ paddingRight: 10 }}>Sign in with: </span>
                    <Button
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
                        onClick={handleGoogleLogin}> <img style={{ width: '15px', marginRight: 5 }} src={search} />
                        Google
                    </Button>
                    <Button
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        onClick={handleGameCenterLogin}>
                        <img style={{ width: '15px', marginRight: 5 }} src={gamecenter} />
                        Game Center
                    </Button>
                </div>
                <Form
                    onFinish={handleLogin}
                    autoComplete="off"
                    layout='vertical'
                    form={form}
                    initialValues={{
                        layout: 'vertical',
                    }}
                    style={{
                        maxWidth: 'none',
                        width: '100%'
                    }}
                >
                    <Form.Item label="Email" name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}>
                        <Input placeholder="Please input your email!" />
                    </Form.Item>
                    <Form.Item label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]} >
                        <Input.Password placeholder="Please input your password!" />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 10 }}>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loadings[0]} onClick={() => enterLoading(0)}>
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" style={{ width: '100%' }} onClick={() => history.push("/register")} ghost>
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
