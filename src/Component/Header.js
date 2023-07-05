import { AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Affix, Avatar, Input, Dropdown, Menu, Space } from 'antd';
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
            label: <div onClick={() => (setCurrent('information-user'), history.push('information-user'))}>User information</div>,
            key: 'information-user'
        },
        {
            label: <div onClick={handleLogout}>Log Out</div>,
            key: '3',
        },
    ];
    return (
        <>
            <Affix offsetTop={top}>
                <Menu selectedKeys={[current]} mode="horizontal">
                    <Menu.Item onClick={onClick} key="" icon={<MailOutlined />}>
                        Home
                    </Menu.Item>
                    <Menu.Item onClick={onClick} key="cart" icon={<MailOutlined />}>
                        Cart
                    </Menu.Item>
                    <Menu.Item onClick={onClick} key="about" icon={<AppstoreOutlined />}>
                        About
                    </Menu.Item>
                    {!user ? (
                        <Menu.Item onClick={onClick} key="login" icon={<SettingOutlined />}>
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
