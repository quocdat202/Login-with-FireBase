import React from 'react'
import "../Css/Header.css";
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown, Space, message } from 'antd';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { AntDesignOutlined, UserOutlined, SmileOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Divider, Affix } from 'antd';

export default function Header() {
    const [current, setCurrent] = useState('mail');
    const history = useHistory();
    const [messageApi, contextHolder] = message.useMessage();
    const [top, setTop] = useState(0);

    const [user, setUser] = useState({
        userName: '',
        avt: ''
    });
    const config = {
        apiKey: 'AIzaSyD0oIT41ohfR7qigkqrAWaAYe3Tz0y5D-A',
        authDomain: 'spck-login.firebaseapp.com',
        // ...
    };
    firebase.initializeApp(config);

    const notification = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    };

    // Login với tài khoản google
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (userLogin) => {
            if (!userLogin) {
                // user logs out, handle something here
                console.log('User is not logged in');
                setUser(null);
                return;
            }
            console.log('Logged in user: ', userLogin);
            setUser({ ...user, userName: userLogin.displayName, avt: userLogin.photoURL });
            history.push("/")
            notification("success", "Logged in successfully!")
            // const token = await userLogin.getIdToken();
            // console.log('Logged in user token: ', token);
        });

        return () => unregisterAuthObserver();
    }, []);

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
            history.push("/")
            console.log('Đăng xuất thành công!');
        } catch (error) {
            console.log(error.message);
        }
    };

    const onClick = (e) => {
        // console.log('click ', e);
        setCurrent(e.key);
        history.push(`/${e.key}`);
    };
    const items = [
        {
            label: '1st menu item',
            key: '1',
        },
        {
            label: '2nd menu item',
            key: '2',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];

    return (
        <>
            {contextHolder}
            <Affix offsetTop={top}>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="" icon={<MailOutlined />}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="news" icon={<MailOutlined />}>
                        News
                    </Menu.Item>
                    <Menu.Item key="about" icon={<AppstoreOutlined />}>
                        About
                    </Menu.Item>
                    {!user ? (
                        <Menu.Item key="login" icon={<SettingOutlined />}>
                            Login
                        </Menu.Item>
                    ) : (
                        <Menu.Item key="logout">
                            <Button onClick={handleLogout}>Log Out</Button>
                        </Menu.Item>
                    )}
                    {
                        user ? (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    user.avt ? <Avatar src={user.avt} style={{ marginRight: 10 }} /> : <Avatar style={{ marginRight: 10 }} icon={<UserOutlined />} />
                                }
                                <Dropdown menu={{ items }}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            {user?.userName}
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </div>

                        ) : ''}

                </Menu>
            </Affix>

        </>
    )

}
