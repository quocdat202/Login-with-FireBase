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

export default function Header({ notification, user }) {
    console.log("🤔🤔🤔 ~ file: Header.js:14 ~ Header ~ user:", user)
    const [current, setCurrent] = useState('mail');
    const history = useHistory();
    const [top, setTop] = useState(0);

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
            localStorage.removeItem("user");
            history.push("/")
            notification('success', 'Logout success !')
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
                                    user?.avt ? <Avatar src={user?.avt} style={{ marginRight: 10 }} /> : <Avatar style={{ marginRight: 10 }} icon={<UserOutlined />} />
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
