import React from 'react'
import "../../Css/Header.css";
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

export default function Header() {
    const [current, setCurrent] = useState('mail');
    const history = useHistory();
    const [user, setUser] = useState(null);
    const config = {
        apiKey: 'AIzaSyD0oIT41ohfR7qigkqrAWaAYe3Tz0y5D-A',
        authDomain: 'spck-login.firebaseapp.com',
        // ...
    };
    firebase.initializeApp(config);


    // Login với tài khoản google
    useEffect(() => {

        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                // user logs out, handle something here
                console.log('User is not logged in');
                setUser(null);
                return;
            }
            console.log('Logged in user: ', user.displayName);
            setUser(user);
            const token = await user.getIdToken();
            console.log('Logged in user token: ', token);
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
        console.log('click ', e);
        setCurrent(e.key);
        history.push(e.key)
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<MailOutlined />}>
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
    </Menu>
}
