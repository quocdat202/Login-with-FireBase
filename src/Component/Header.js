import { AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Affix, Avatar, Button, Dropdown, Menu, Space } from 'antd';
import 'firebase/auth';
import firebase from 'firebase/compat/app';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import "../Css/Header.css";

export default function Header({ notification, user }) {
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
            label: <Button onClick={handleLogout}>Log Out</Button>,
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
                    <Menu.Item key="cart" icon={<MailOutlined />}>
                        Cart
                    </Menu.Item>
                    <Menu.Item key="about" icon={<AppstoreOutlined />}>
                        About
                    </Menu.Item>
                    {!user ? (
                        <Menu.Item key="login" icon={<SettingOutlined />}>
                            Login
                        </Menu.Item>
                    ) : ''}
                    {
                        user ? (
                            <Menu.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                            </Menu.Item>

                        ) : ''}

                </Menu>
            </Affix>

        </>
    )

}
